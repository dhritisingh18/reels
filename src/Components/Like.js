import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from "../Firebase";
import { Padding } from "@mui/icons-material";


export function Like({user,post}){

    const [like,setLike]= useState(null);
    console.log(user)
    useEffect(()=>{
        let check = post.likes.includes(user.userId)?true:false;
        console.log(check,post)
        setLike(check);
    },[post,user])
    console.log(post)

    const handleUnlike= ()=>{
        console.log("CLIcked UnLike")
        
            console.log(post.likes)
            let postLikeArr = post.likes.filter((el) => {
                return checkEl(el); // Add a return statement here
            });
            let narr =[];
            console.log(postLikeArr)
            if(postLikeArr.length==0){
                narr=[user.userId];
            }
            else{
                narr = [...postLikeArr,user.userId]
            }
            
            
          console.log(narr)
            database.posts.doc(post.postId).update({
                likes:narr
            })
            setLike(true);
            console.log(database.posts.doc());
       
    }
    const checkEl= (el)=>(
        console.log(el),
        el!=user.userId
    )

    const handleLike= ()=>{
        console.log("CLIcked like")
       
            console.log(post.likes)
           

            let postLikeArr = post.likes.filter((el) => {
                return checkEl(el); // Add a return statement here
            });
            
            console.log(postLikeArr)
            database.posts.doc(post.postId).update({
                likes: postLikeArr
            });
            
      
            setLike(false);
            console.log(database.posts.doc(post.postId));
      
    }





    return(
        <div>
            {
                like!=null?
                <>
                {
                    like==true?<FavoriteIcon className={`icon-styling liking`} onClick={handleLike} style={{paddingLeft:'2%'}}/> :<FavoriteIcon className={`icon-styling unliking`} onClick={handleUnlike} style={{paddingLeft:'2%'}} />
                    
                    }
                </>:
                <></>
                
            }
        </div>
    )
}