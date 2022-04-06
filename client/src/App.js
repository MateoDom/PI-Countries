import Home from './components/Home/Home';
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import React from 'react'
import Countries from './components/Country/Countries';
import CountryDetail from './components/Country/CountryDetail';
import Activity from './components/Activity/Activity';
import Error from './components/Error/Error';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route  path='/' element={<Home />} >

        </Route>
        <Route  path='/paises' element={
        <>
          <NavBar />
          <Countries />
         

        </>
          }>
        
        </Route>
          <Route  path='/paises/:id' element={
            <CountryDetail />
          }>
          </Route>
         <Route exact path='/actividades' element={ <Activity />} > </Route>
        <Route path="*" element={<Error />}>
           
        </Route> 
      </Routes>

    </div>
  );
}

export default App;
