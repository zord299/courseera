import React from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Appbar from './components/Appbar';
import Courses from './components/Courses';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addcourse from './components/AddCourse';
import Course from './components/Course';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function App() {
  
  return (
    <div style={{width: '100vw', height: '100vh', backgroundColor: '#eeeeee'}}>
      
      <RecoilRoot>
        <BrowserRouter>
        <Appbar></Appbar>
          <Routes>
            
            <Route path='Addc' element={<Addcourse />}/>
            <Route path='Signin' element={<Signin />}/>
            <Route path='Signup' element={<Signup />}/> 
            <Route path='Courses' element={<Courses />}/> 
            <Route path='course/:courseId' element={<Course />}/> 

          </Routes>
        </BrowserRouter>
      </RecoilRoot>
     
    </div>
  )
}

export default App