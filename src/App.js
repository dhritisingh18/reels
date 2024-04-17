import { BrowserRouter, Switch,Routes } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup.js';
import Login from './Components/Login'
import { Route ,Navigate} from 'react-router-dom';
import {AuthContext, AuthProvider} from './Context/AuthContext'
import { Feed } from './Components/Feed';
import { Fragment, useContext } from 'react';
import { EmailForgetPassword } from './Components/EmailForgetPassword';
import { Profile } from './Components/Profile.js';

function App() {
  // useEffect(() => {
  //   // Initialize Firebase
  //   // This code should be moved to a separate initialization module
  //   // Make sure Firebase is only initialized once
  //   // You can use Firebase's initializeApp method or any other initialization method
  //   // For simplicity, I'll assume initializeApp here
  //   initializeFirebase().then(() => {
  //     setFirebaseInitialized(true);
  //   });
  // }, []);

  
  // const {user}= useContext(AuthContext)

  return (
    <BrowserRouter>
     <AuthProvider>
  
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/forgot-password" element={<EmailForgetPassword/>} />
        <Route path="/profile/:id" element={<Profile/>} />

        <Route
          path="/"
          element={
           <Navigate to="/login" replace />
          }
        />
       
       
        </Routes>
    </AuthProvider>
    
    </BrowserRouter>
  );
}

export default App;
