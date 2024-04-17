import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Alert } from "@mui/material";
import TextField from '@mui/material/TextField';
import {CardActions , Button,Typography} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link,useNavigate } from 'react-router-dom';
import   ArrowBackIosIcon from '@material-ui/icons/ArrowBack'; 



export function EmailForgetPassword(){

    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [email,setEmail]=useState('');

    const {forgetPassword} = useContext(AuthContext);
    const navigate=useNavigate();

    const handleClick = async()=>{
        try{
            setError('');
            setLoading(true);
            console.log(email)
            let result = await forgetPassword(email);
            setTimeout(()=>{
                setLoading(false)
                console.log(result)
                navigate("/login")
        },10000)
           
            return;
        }
        catch(error){
            setError(error);
            setTimeout(()=>(
              setError('') 
            ),2000)
        }
    }

    return(
        <>
        <Card style={{width:"50%",justifyContent:"center",marginTop:"25vh",marginLeft:"25vw"}} variant="subtitle1">
        <CardActions>
               
               <Button size="small" variant='outlined' disabled={loading}>
              
                            <Link to="/login" state={{textDecoration:"none"}} >  <ArrowBackIosIcon style={{marginRight:"5px"}}/> </Link>
                         </Button>
           </CardActions>
            <div style={{display:"flex",justifyContent:"center",fontWeight:"bold",fontSize:"2rem",fontFamily:"sans-serif"}}>
            <Typography  variant='subtitle'  >
                   Forgot Password?
                  </Typography>
            </div>
      
          <CardContent style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  
                  <div style={{margin:"normal"}}>
                  {error && <Alert severity="error" >{error}</Alert>}
                  </div>
            
                  <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin='dense' size="small" value={email} onChange={(e)=> setEmail(e.target.value)}/>      
            
           </CardContent>
           <CardActions>
                <Button size="medium" color="primary" variant="contained" fullWidth={true} disabled={loading} onClick={handleClick} >
                   Submit
                </Button>
            </CardActions>

           
            </Card>

          


        </>
    )
} 