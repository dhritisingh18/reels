import React from "react";
import './Video.css'
import  ReactDOM from "react-dom";

export function Video(props){

    const handleClick= (e)=>{
       e.preventDefault();
       e.target.muted=!e.target.muted;
    }

    const handleEnded = (e) =>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling

        if(next){
            next.scrollIntoView();
            e.target.muted=true
        }
    }

    // const handleDoubleClick = (e) =>{
    //     props.onDoubleClickFromVideo();
    // }

    
    return(
        <>
        <video src={props.src} controls onEnded={handleEnded} className="video-styling" muted="muted" onClick={handleClick}  >

        </video>
        </>
    )

}