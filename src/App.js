import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = ()=> {
  const pageSize = 11;
  const [progress, setProgress ]= useState(0)
  
    return (
      <>
      <Router>

      <Navbar/> 
      <LoadingBar
      height={3}
      color='#ff1a1a'
      progress={progress}
      
      />
      <Routes>
        <Route exact path='/general' element={<News setProgress ={setProgress}  key="general" pageSize={pageSize} country="in" category='general' />}></Route>
        <Route exact path='/general' element={<News setProgress ={setProgress}  key="general" pageSize={pageSize} country="in" category='home' />}></Route>
        <Route exact path='/business'  element={<News setProgress ={setProgress}  key="business" pageSize={pageSize} country="in" category='business' />}></Route>
        <Route exact path='/entertainment' element={<News setProgress ={setProgress}  key="entertainment" pageSize={pageSize} country="in" category='entertainment' />}></Route>
        <Route exact path='/health' element={<News setProgress ={setProgress}  key="health" pageSize={pageSize} country="in" category='health' />}></Route>
        <Route exact path='/science' element={<News setProgress ={setProgress}  key="science" pageSize={pageSize} country="in" category='science' />}></Route>
        <Route exact path='/sports' element={<News setProgress ={setProgress}  key="sports" pageSize={pageSize} country="in" category='sports' />}></Route>
        <Route exact path='/technology' element={<News setProgress ={setProgress}  key="technology" pageSize={pageSize} country="in" category='technology' />}></Route>
      </Routes>
      </Router>
       
      </>
    )
    }



  export default App;
