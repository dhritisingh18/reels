import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../Firebase";
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from "./Navbar";
import { Like2 } from "./Like2";
import { Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import {Card,CardContent} from '@mui/material/';
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import './Profile.css';
import Alert from '@mui/material/Alert';
import { Link,useNavigate } from 'react-router-dom';
import   ArrowBackIosIcon from '@material-ui/icons/ArrowBack'; 
import {  Button} from "@mui/material";
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';







export function Profile(){
    const {id} = useParams();

    const [user,setUser] =useState(null);
    const [posts,setPosts] =  useState(null);

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    const useStyles=makeStyles({
        card2:{
          marginTop: "1%",
          height: "50vh",
          width: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }
      })
    const classes=useStyles();

   


 
    //use effect for user
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snapshot)=>{
            setUser(snapshot.data());
        })
    },[id],[user])

    useEffect( ()=>{
          const setPostsForThisUser =  async ()=>{
            if(user!=null && user.postIds!=null && user.postIds.length>0){

                let postArr=[];
                for(let i=0;i<user.postIds.length;i++){
                    let data= await database.posts.doc(user.postIds[i]).get();
                    postArr.push({...data.data(),postId:data.id})
                }
                setPosts(postArr)
            }
         }
       
         setPostsForThisUser();
       
    },[user],[])


    return(
            <>
            {
                posts==null || user== null ?
                <div>
                <Button size="small" variant='outlined' style={{margin:"2%"}}>
                    
                    <Link to="/feed" state={{textDecoration:"none"}} >  <ArrowBackIosIcon style={{marginRight:"5px"}}/> Go Back to Feed? </Link>
                </Button> 
                <div className="no-post">    
                
                    <Card className={classes.card2} variant="outlined" >
                            <CardContent  >
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress size={150} style={{marginLeft:"25%",marginTop:"10%"}} />
                                </Box>
                                <Typography variant="h6" style={{color:"grey",textAlign:"center",margin:"2%",marginTop:"10%"}}>
                                    No posts to show
                                </Typography>
                            </CardContent>
                    </Card>

                </ div>
              
                  </div>
                :
                <>
                <Navbar user={user}/>
                <div className="spacer"></div>
                <div className="container">
                    <div className="upper-part">
                        <div className="profile-img">
                            <img src={user.profileUrl}/>
                        </div>
                        <div className="info">
                            <Typography variant="h5">
                                Email : {user.email}
                            </Typography>
                            <Typography variant="h6">
                                Posts : {user?.postIds?.length}
                            </Typography>
                        </div>
                    </div>
                    <hr style={{marginTop:'3rem',marginBottom:'3rem'}}/>
                    <div className="profile-videos">
                    {
                        posts.map((post,index)=>(
                            <React.Fragment key={index}>
                                <div className="videos">
                                    <video muted="muted" onClick={()=>handleClickOpen(post.pId)}>
                                        <source src={post.pUrl}/>
                                    </video>
                                    <Dialog
                                        open={open==post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth ={true}
                                        maxWidth = 'md'
                                    >
                                        <div className="modal-container">
                                            <div className="video-modal">
                                                <video autoPlay={true} muted="muted" controls>
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>
                                            <div className="comment-modal">
                                            <Card className="card1" style={{padding:'1rem'}}>
                                                <Comment post={post}/>
                                            </Card>
                                                <Card variant="outlined" className="card2">
                                                    <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                    <div style={{display:'flex'}}>
                                                        <Like2 post={post} user={user} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                        <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} user={user} post={post}/>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
                </div>
                </>
            }

            </>
    )
}