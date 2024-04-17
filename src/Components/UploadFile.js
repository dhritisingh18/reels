import React, { useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import Alert from '@mui/material/Alert';
import { Button } from "@mui/material";
import  MovieIcon from '@material-ui/icons/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { database, storage } from "../Firebase";
import './UploadFile.css'

export function UploadFile(props){

  console.log(props.user);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false)

    const handleFileUpload= async(file)=>{
      console.log("clicked")
      if(file==null){
        setError("Please upload a file")

        setTimeout(()=>(
            setError('')
        ),2000)
        return;
      }

      if(file.size/(1024*1024)>100){
        setError("File size is greater than 100 MB")

        setTimeout(()=>(
            setError('')
        ),2000)
        return;
      }
      console.log(file)
      setLoading(true);
      
      let uid=uuidv4();
      const uploadFile=storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadFile.on("state_changed",fn1,fn2,fn3)

        function fn1(snapshot){
            let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(`The image is uploaded with ${progress} rate`);

        }
        function fn2(error){
            setError(error)

            setTimeout(()=>(
              setError('')
            ),2000)
            return;
        }
        function fn3(){
            uploadFile.snapshot.ref.getDownloadURL().then((url)=>{
              console.log(url)

            
              let obj={
                  likes:[],
                  comments:[],
                  pId: uid,
                  pUrl: url,
                  userId: props.user.userId,
                  userName: props.user.fullName,
                  userProfileUrl: props.user.profileUrl,
                  createdAt: database.getTimeStamp

              }
              console.log(obj);

              database.posts.add(obj).then(async (ref)=>{
                console.log(ref);
                await database.users.doc(props.user.userId).update({
                    postIds: props.user.postIds!=null? [...props.user.postIds,ref.id] : [ref.id]
                })
              }).then(()=>(
                setLoading(false)
              )).catch((error)=>{
                setError(error);
                
                setTimeout(()=>(
                  setError('')
                ),2000)
              })


            } )

           
            setLoading(false)
           return;

        }



    }
    return(
        <div className="upload-video-container">
          {
             error!="" ? <Alert severity="error" >{error}</Alert>:
             <>
             <input type="file" accept="video/*" onChange={(e)=>handleFileUpload(e.target.files[0])} id="upload-video-id"  style={{display:"none"} }/>
            <label htmlFor="upload-video-id">
                <Button variant="outlined"
                        color="secondary"
                        component="span"
                        disabled={loading}>
                  <MovieIcon style={{marginRight:"5px"}}/>  Upload Video
                </Button>
            </label>

            {loading && <LinearProgress color="secondary" style={{width:"22%",marginTop:"2px"}}/>}

            
             </>
          }
        </div>
    )
}


