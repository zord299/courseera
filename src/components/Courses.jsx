import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import  Typography  from '@mui/material/Typography'


function Courses() {
    
    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') 
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new error ("Auth failed")
            }
        }).then(data => {
            console.log(data)
            setCourses(data.courses)
        }).catch( error => {
            console.error(error)
        })
    }, [])

    return (

        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            
            {courses.map(course => {
                return <Course corse={course}/>
            })}
        </div>
    )
}

export function Course(props){
    return (
        <Card variant="outlined" style={{

            margin: 10,
            width: 300,
            minHeight: 200
        }}>
            <Typography>Title: {props.corse.title}</Typography>
            <Typography>Description: {props.corse.description}</Typography>
            <img src={props.corse.imageLink} alt="" style={{width: 200 }}/>
        
        </Card>
    )
}

export default Courses 