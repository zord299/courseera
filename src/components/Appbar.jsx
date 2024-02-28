import Button from '@mui/material/Button'
import  Typography  from '@mui/material/Typography'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Appbar(){
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState(null)

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        fetch("http://localhost:3000/admin/me", {
            headers : {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("failed to fetch user data")
            }
        }).then(data => {

            if (data.username) {
                setUserEmail(data.username)
            }
            console.log(data)
        }).catch(error => {console.error(error)})
    }

    if (userEmail) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}> 
                <Typography variant={'h6'} style={{margin: '20px'}}>Coursera</Typography>
                <div>
                    <div>{userEmail}</div>
                    <Button variant="contained"
                    onClick = {() => {
                        localStorage.setItem("token", null) 
                        navigate('/Signup')
                    }}>Logout</Button>
                </div>
                
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}> 
            <Typography style={{margin: '20px'}}>Coursera</Typography>
            <div>
                <Button variant="contained" onClick = {() => {
                    navigate('/Signin')
                }} 
                style={{margin: '20px'}}>Sign-in</Button>
                <Button variant="contained"
                onClick = {() => { 
                    navigate('/Signup')
                }}>Sign-up</Button>
            </div>
            
        </div>
    )
}

export default Appbar