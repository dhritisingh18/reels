import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from "../Firebase";


export function Like2 ({user,post}){

    const [like,setLike]= useState(null);

    useEffect(()=>{
        let check = post.likes.includes(user.userId)?true:false;
        console.log(check,post)
        setLike(check);
    },[post])
    console.log(post)

    const handleUnlike= ()=>{
        console.log("CLIcked UnLike")
        
            console.log(post.likes)

            let narr = [...post.likes,user.userId]
            database.posts.doc(post.postId).update({
                likes:narr
            })
            setLike(true);
       
    }
    const checkEl= (el)=>(
        console.log(el),
        el!=user.userId
    )

    const handleLike= ()=>{
        console.log("CLIcked like")
       
            console.log(post.likes)
            let postLikeArr = post.likes.filter((el)=>{
               checkEl(el);
            }
            )
            database.posts.doc(post.postId).update({
                likes: postLikeArr
            })
      
            setLike(false);
      
    }





    return(
        <div>
            {
                like!=null?
                <>
                {
                    like==true?<FavoriteIcon className={`liking`} onClick={handleLike} style={{padding:'1rem',paddingTop:'0.5rem'}} /> :<FavoriteIcon className={`unliking2`} onClick={handleUnlike} style={{padding:'1rem',paddingTop:'0.5rem'}} />
                    
                    }
                </>:
                <></>
                
            }
        </div>
    )
}