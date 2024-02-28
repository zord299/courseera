import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import  Typography  from '@mui/material/Typography';
import React, { useState } from 'react';

function Signup(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSignup = () => {
        fetch('http://localhost:3000/admin/signup', {
            method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
        }).then(response => {
            if(response.ok){
                return response.json()
            }else{
                throw new error("Auth failed")
            }
        }).then(data => {
           console.log("us{er-signed up successfully:", data)
        }).catch(error =>{
            console.error('sign up failed', error)
        })
    }

    return (
   
    <div style={{
        width: '100vw',
        height: '100vh',
     }}>
        
            <div style={{
                paddingTop:150,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Typography>Welcome to Coursera Sign-up below</Typography>
            </div><br />
        
        <div style={{ display: "flex", justifyContent: 'center'}}>
            <Card variant="outlined" style={{
                width: '400px',
                padding: '40px',             
            }}>
                <TextField fullWidth ={true}  id="outlined-basic" label="Username" variant="outlined" value={username} onChange={handleUsernameChange}/> <br /><br />
                <TextField fullWidth ={true}  id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange}/> <br /><br />
                <Button variant="contained" onClick={handleSignup}>Sign-up</Button>
            </Card>
        </div>
    </div>
    )
}

export default Signup