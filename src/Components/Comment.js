import React, { useEffect, useState } from "react";
import { database } from "../Firebase";
import { CircularProgress } from "@mui/material";
import Avatar from '@mui/material/Avatar';

export function Comment({post}){

    const [comments,setComments]= useState(null);

    useEffect( ()=>{
        async function fetchData(){
            let arr=[];

            for(let i=0;i<post.comments.length;i++){
                let data = await database.comments.doc(post.comments[i]).get()
                arr.push(data.data());
            }
            setComments(arr);
        }
        fetchData();
       

        },[post])

    return(
        <div>
            {
                comments==null? <CircularProgress /> :
                <>
                {
                    comments.map((comment,index)=>(
                        <div key={index}  style={{display:"flex"}}>
                          <Avatar  src={comment.userProfileUrl}/>
                            <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.userName}</span>&nbsp;&nbsp; {comment.text}</p>
                        </div>
                    ))
                    
                }
                </>
            }
        </div>
    )

}