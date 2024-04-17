import React, { useEffect, useState } from "react";
import { database } from "../Firebase";
import CircularProgress from '@mui/material/CircularProgress';
import { Video } from "./Video";
import  './Posts.css'
import { Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import {Like} from './Like'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Like2 } from "./Like2";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
export function Posts(props){

    console.log(props);
    const [error,setError]=useState('');
    const [loading,setLoading]= useState(false);
    const [posts,setPosts] = useState(null);
    const [updatePosts,setUpdatePosts] = useState(false);
    console.log(posts)


    const [open, setOpen] = React.useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = (id) => {
      setOpen(id);
    };
  
    const handleClose = () => {
      setOpen(null);
    };

    useEffect(()=>{
        console.log("CALLED ME")
        
        const unsub = database.posts.orderBy("createdAt","desc").onSnapshot((querySnapshot)=>{
            let postsArr=[];
            querySnapshot.forEach((doc)=>{
                let data= {...doc.data(),postId:doc.id}
        
                console.log(data);
           
                postsArr.filter((el)=>{
                    return el.postId!==doc.id;
                })
                console.log(postsArr);
                postsArr.push(data);
                console.log(postsArr);
            })
            console.log(postsArr);
            setPosts(postsArr)
        })

        return unsub
    },[])

    console.log(posts)

    // const onDoubleClickFromVideo= (post)=>{
    //    setUpdatePosts(true);
    // }
    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0]
            console.log(ele)
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, {threshold:0.6});
    useEffect(()=>{
        const elements = document.querySelectorAll(".video")
        elements.forEach((element)=>{
            observer.observe(element)
        })
        return ()=>{
            observer.disconnect();
        }
    },[posts])

    return(
        <div>
        {
            posts==null || props.user == null ?       <CircularProgress /> :
                <div className="video-container">
                    {
                        posts.map((post,index)=>(
                          
                            <React.Fragment key={index}>
                                <div className="video">
                                <Video src={post.pUrl} />
                                <div className="fa">
                                    <Avatar src={post.userProfileUrl} />
                                    <h4 >{post.userName}</h4>
                                    <Like user={props.user} post={post} className="like" />
                                    <ChatBubbleIcon className="chat-bubble" onClick={()=>handleClickOpen(post.pId)}/>
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={open==post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                        fullWidth ={true}
                                        maxWidth='md'
                                       
                                    >
                                       <div className="modal-container">
                                        <div className="video-modal">
                                          <video autoPlay={true} muted="muted" controls>
                                            <source src={post.pUrl} />
                                          </video>
                                        </div>
                                        <div className="comments-modal">
                                        <Card className="card1">
                                                 <Comment post={post}/>
                                        </Card>
                                        <Card variant="outlined" style={{textAlign:"center"}} className="card2">
                                            <Typography>{post.likes.length==0?'':`Liked by ${post.likes.length} users`}</Typography>
                                                <div style={{display:'flex'}}>
                                                    <Like2 user={props.user} post={post} style={{display:'flex',alignItems:'center',justifyContent:'center'}}  />
                                                    <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} post={post} user={props.user} />
                                                </div>
                                        </Card>
                                        </div>
                                       </div>
                                    </Dialog>
                                </div>
                                </div>
                            </React.Fragment>
                        ))
                    }


                </div>
        }
        </div>
    )

}