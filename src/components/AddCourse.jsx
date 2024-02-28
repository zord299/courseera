import React, { useState } from "react";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

function Addcourse (){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageLink, setImage] = useState('')

    const setT = (e) => {
        setTitle(e.target.value)
    }
    const setD = (e) => {
        setDescription(e.target.value)
    }
    const setI = (e) => {
        setImage(e.target.value)
    }
    
    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
               
                <TextField onChange = {setT} fullWidth = {true} label = "title" style={{margin: 10}}/>
                <TextField onChange = {setD} fullWidth = {true} label = "description" style={{margin: 10}}/>
                <TextField onChange = {setI} fullWidth = {true} label = "image-link" style={{margin: 10}}/>
                <Button
                    size = {'large'}
                    variant = 'contained'
                    onClick = {() => {
                        function callback2(data) {
                            alert('course added sucessfully')
                        }
                        function callback1(res) {
                            res.json().then(callback2)
                        }
                        fetch("http://localhost:3000/admin/courses", {
                            method: "POST",
                            body: JSON.stringify({
                                title: title,
                                description: description,
                                imageLink: imageLink,
                                published: true
                            }),
                            headers: {
                                "Content-type": 'application/json',
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        }).then(callback1)
                    }}
                >Add Course</Button>     
                
            </Card>
        </div>
    )
}

export default Addcourse;