
import 'bootstrap/dist/css/bootstrapmin.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from'./components/Izbornik'
import { Route,Routes } from 'react-router-dom'
import Home from  './pages/Home'
import SmjerPregled from'./pages/smjerovi/SmjerPregled
import {RouteNames} from '/constants'

function App() {
  

  return (
    <Container>
      <Izbornik/>

      <Routes>
        
        <Route  path= {RouteNames.HOME} element ={<Home/>}/>
        <Route  path= {RouteNames.VJEŽBE} element ={<SmjerPregled/>}/>


      </Routes>
      <hr />
      & copy; Kalkulator ponavljanja 
    </Container>
    
  )
}

export default App
