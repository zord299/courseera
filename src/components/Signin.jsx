import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import  Typography  from '@mui/material/Typography';
import { useState } from 'react';
import React from 'react';

function Signin(){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSignIn = () => {
        fetch('http://localhost:3000/admin/login', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
        }).then(response => {
            if (response.ok){
                return response.json()
            } else {
                throw new Error("Auth failed")
            }
        }).then(data => {
            localStorage.setItem('token', data.token);
            console.log('Successfully signed in:', data);
        }).catch(e => {
            console.error("sign-in failed", error.message);
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
                <Typography>Welcome to Back</Typography>
            </div><br />
        
        <div style={{ display: "flex", justifyContent: 'center'}}>
            <Card variant="outlined" style={{
                width: '400px',
                padding: '40px',             
            }}>
                <TextField fullWidth ={true}  id="outlined-basic" label="Username" variant="outlined" value={username} onChange={handleUsernameChange}/> <br /><br />
                <TextField fullWidth ={true}  id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange}/> <br /><br />
                <Button variant="contained" onClick={handleSignIn}>Sign-in</Button>
            </Card>
        </div>
    </div>
    )
}

export default Signin