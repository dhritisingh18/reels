import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import  './Login.css'
import insta from '../Assets/Instagram.JPG'
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';



import { alignProperty } from '@mui/material/styles/cssUtils';
import { CloudUploadSharp } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../Assets/insta.png';
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';


import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { AuthContext } from '../Context/AuthContext';
import { useState } from 'react';


export default function Login() {

  const store= React.useContext(AuthContext)
  console.log(store)

  const useStyles=makeStyles({
    text1:{
      color:"grey",
      fontSize: "0.9rem",
      textAlign: 'center'
    },
    card2:{
      marginTop: "1%",
      height: "6vh",
      justifyContent: "center",
      alignItems: "center"
    }
  })
  const [email,setEmail] = useState('')
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const navigate=useNavigate();

  const {login}=React.useContext(AuthContext);


  const classes=useStyles();

  const handleClick= async()=>{
    try{
        setError('');
        setLoading(true)
        
        let userObj= await login(email,password);
        console.log(userObj)
        setLoading(false)
        navigate('/feed')


    }
    catch(error){
      setError(error);
      setTimeout(()=>(
        setError('')
      ),2000)
      return;
    }
  }

  const handleClickForgotPassword= ()=>{
   navigate("/forgot-password");
  }
  return (
    <div className='loginWrapper'>
        <div className='loginCard'>
           <div className='imgcar' style={{backgroundImage:'url('+bg+')',backgroundSize:"cover"}}>
            <div className='car'>
                

                    <CarouselProvider
                        naturalSlideWidth={238}
                        naturalSlideHeight={423}
                        totalSlides={5}
                        visibleSlides={1}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}

                    >
                        <Slider>
                        <Slide index={0}><Image src={img1}/></Slide>
                        <Slide index={1}><Image src={img2}/></Slide>
                        <Slide index={2}><Image src={img3}/></Slide>
                        <Slide index={3}><Image src={img4}/></Slide>
                        <Slide index={4}><Image src={img5}/></Slide>
                        </Slider>
                    </CarouselProvider>
    
            </div>
           </div>
        </div>

        <div className='loginCard2'>
            <Card variant='outlined'>
                <div className='insta-logo'>
                    <img src={insta}></img>
                </div>
                <CardContent>
                  
                    <div style={{margin:"normal"}}>
                    {error && <Alert severity="error" >{error}</Alert>}
                    </div>
                    <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin='dense' size="small" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    
                    <div style={{textAlign:"center"}}>
                    <Typography variant='subtitle' color="primary" onClick={handleClickForgotPassword}  >
                     Forgot Password?
                    </Typography>

                    </div>
                </CardContent>

                <CardActions>
                <Button size="medium" color="primary" variant="contained" fullWidth={true}disabled={loading} onClick={handleClick} >
                   Login
                
                    </Button>
                </CardActions>

        

            </Card>
            <Card className={classes.card2} variant="outlined" id="sign-in-button">
                        <CardContent  >
                            <div style={{ textAlign: 'center' }} id="sign-in-frame">
                                <Typography className={classes.text1} variant='subtitle' id="sign-in-button">
                                Don't have an account? <Link to="/signup" state={{textDecoration:"none"}}>Sign Up</Link>
                                </Typography>
                            </div>
                        </CardContent>
                </Card>
        </div>
    </div>
  );
}
