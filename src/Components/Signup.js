import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import  './Signup.css'
import insta from '../Assets/Instagram.JPG'
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { useState,useContext } from 'react';



import { alignProperty } from '@mui/material/styles/cssUtils';
import { CloudUploadSharp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { database, storage } from '../Firebase';


export default function Signup() {
  const useStyles=makeStyles({
    text1:{
      color:"grey",
      fontSize: "0.9rem",
      textAlign: 'center',
      padding: "1rem",
      display:"flex"
    },
    card2:{
      marginTop:"1%",
      height: "8vh",    }
  })
  const classes=useStyles();

  // const store = React.useContext(AuthContext)
  
  // console.log(store)

  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [name,setName] = useState('');
  const [file,setFile] = useState(null);
  const navigate= useNavigate();
  const {signup} = useContext(AuthContext)



  const handleClick = async()=>{
    if(file==null){
      setError("Please upload Profile Image first")

      setTimeout(()=>{
        setError("")
      },2000)
      return;
    }

    try{
      setError('');
      setLoading(true)

      let userObj= await signup(email,password)
      console.log(userObj)
      let uid=userObj.user.uid;
      console.log(uid);
      const uploadFile=storage.ref(`/users/${uid}/ProfileImage`).put(file);
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

              database.users.doc(uid).set({
                email:email,
                userId: uid,
                fullName: name,
                profileUrl : url,
                time : database.getTimeStamp
              })
            } )

            console.log(database)
            setLoading(false)
            navigate('/feed')
           return;

        }
      

    }catch(error){
      setError(error)
      setTimeout(()=>{
        setError("")
      },2000)
    }

  }
  return (
    <div className='signupWrapper'>
      <div className='signupCard'>
          <Card variant='outlined'>
                <div className='insta-logo'>
                    <img src={insta}></img>
                </div>
              <CardContent>
                  <Typography className={classes.text1} variant='subtitle' margin="dense">
                    Sign up to see photos and videos 
                    from your friends
                  </Typography>
                  <div style={{margin:"normal"}}>
                  {error && <Alert severity="error" >{error}</Alert>}
                  </div>
                  <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin='dense' size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size="small" value={name} onChange={(e)=>setName(e.target.value)}/>

                  <Button size="medium" color="secondary" variant='outlined' fullWidth={true} margin="dense" startIcon={<CloudUploadSharp/>} component="label">
                    Upload Profile Image
                    <input type='file' accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])}/>
                  </Button>
              </CardContent>

              <CardActions>
              <Button size="medium" color="primary" variant="contained" fullWidth={true} disable={loading} onClick={handleClick}>
                  Sign Up
                
                  </Button>
              </CardActions>

              <CardContent>
                  <Typography className={classes.text1} variant='subtitle' margin="dense">
                      By signing up, you agree to our terms, Data Policy and Cookies Policy
                  </Typography>
              
              </CardContent>  
              </Card>
          <Card className={classes.card2} variant="outlined" >
                  <CardContent  >
                      <div style={{ textAlign: 'center' }}>
                          <Typography className={classes.text1} variant='subtitle'margin="dense" style={{display:"flex",justifyContent:"center"}} >
                            Already Have an account? <Link to="/login" state={{textDecoration:"none"}}>LogIn</Link>
                          </Typography>
                      </div>
                  </CardContent>
            </Card>

    
    </div>
    </div>
  );
}
