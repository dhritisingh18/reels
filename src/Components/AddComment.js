import React, { useState } from "react";
import { Button, TextField } from '@mui/material';
import { database } from "../Firebase";



export function AddComment({post,user}){

    const [text,setText]= useState('');
    console.log(post,user);
    const handleClick = ()=>{
        let obj={
            "text":text,
            "userName":user.fullName,
            "userProfileUrl": user.profileUrl
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(post.postId).update({
                comments: [...post.comments,doc.id]
            })
        })

        setText('');
    }

    return(
           
             <div style={{width:'100%'}}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{width:'70%'}} value={text} onChange={(e)=>setText(e.target.value)}/>
            <Button variant="contained" onClick={handleClick}>Post</Button>
              </div>
            
    )
}