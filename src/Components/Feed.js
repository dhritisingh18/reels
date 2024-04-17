import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { UploadFile } from './UploadFile';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../Firebase';
import { Posts } from './Posts';
import Navbar from './Navbar';
import './Feed.css';


export function Feed(){
    const {user,logout}=useContext(AuthContext)
    const [error,setError]=useState('')
    const [userDataFromDb,setUserDataFromDb]=useState('');

    useEffect(()=>{
        const unsub=database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserDataFromDb(snapshot.data());
        })
        return ()=> { unsub()}
    },[user])


    console.log(user)
    console.log(userDataFromDb)
    const navigate=useNavigate();

    const handleClick= async()=>{
        try{
           const res= await logout;
            navigate("/login")
        }
        catch(error){
            setError(error)
            setTimeout(()=>(
                setError('')
            ),2000)
        }
    }

    console.log(userDataFromDb)
    return(
        <>
        <Navbar user ={userDataFromDb}/>
        <div className ="feed-container" style={{display:"flex",justifyContent:"center"}}>
            <div className="comp" >
                <UploadFile user={userDataFromDb} className="upload-file"/>
                <Posts user={userDataFromDb} className="post-feed"/>
             </div>
        </div>

        </>
       
    )
}