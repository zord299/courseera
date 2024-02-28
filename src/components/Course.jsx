import Card from '@mui/material/Card';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  Typography  from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';


function Course() {
    
    

    const setCourses = useSetRecoilState(coursesState);

    let { courseId } = useParams();
    

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then(resp => {
            if (resp.ok){
                return resp.json()
            } else {
                throw new Error ("Auth failed")
            }
        }).then(data => {
            setCourses(data.courses)
        }).catch( error => {
            console.log(error)
        })
    }, [])
      
    return (
        <div>
            <CourseCard courseId = {courseId}/>
            <UpdateCard courseId = {courseId}/>
        </div>        
    )
}

function UpdateCard(props){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImage] = useState('');
    const [courses, setCourses] = useRecoilState(coursesState);
    const course = props.course
    

    const setT = (e) => {
        setTitle(e.target.value)
    }
    const setD = (e) => {
        setDescription(e.target.value)
    }
    const setI = (e) => {
        setImage(e.target.value)
    }

    return(
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
                            
                            let updatedCourses = []
                            for (let i = 0; i < courses.length; i++){
                                if(courses[i].id == props.courseId){
                                    updatedCourses.push({
                                        id: props.courseId,
                                        title: title,
                                        description: description,
                                        imageLink: imageLink
                                    })
                                } else {
                                    updatedCourses.push(courses[i]);
                                }
                            }
                            props.setCourses(updatedCourses);
                        }
                        function callback1(res) {
                            res.json().then(callback2)
                        }
                        fetch("http://localhost:3000/admin/courses/" + course.id, {
                            method: "PUT",
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
                >update Course</Button>     
                
            </Card>
        </div>
    )
}

function CourseCard(props) {
    
    const courses = useRecoilValue(coursesState)
    let course = null
    for (let i = 0; i < courses.length; i++){
        if (courses[i].id == props.courseId){
            course = courses[i]
        }
    }

    if (!course) {
        return <Typography variant="body1">Course not found</Typography>;
    }

    return(
        <div style={{
            display:'flex',
            justifyContent: 'center'
        }}>
        <Card style={{width: 300}}>
            
            <Typography textAlign={"center"}>{course.title}</Typography>
            <Typography textAlign={"center"}>{course.description}</Typography>
            <img src={course.imageLink} alt="image" />
        </Card>
        </div>
    )
}

export default Course;

const coursesState = atom({
    key: 'coursesState', 
    default: '',
  });