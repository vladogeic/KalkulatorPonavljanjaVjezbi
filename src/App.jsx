
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from'./components/Izbornik'
import { Route,Routes } from 'react-router-dom'
import Home from  './pages/Home'
import {RouteNames} from './constants'
import VjezbaPregled from './pages/vjezbe/VjezbaPregled'
import VjezbaNovi from './pages/vjezbe/VjezbaNovi'
import VjezbaPromjena from './pages/vjezbe/VjezbaPromjena'

function App() {
  

  return (
    <Container>
      <Izbornik/>

      <Routes>
        
        <Route  path= {RouteNames.HOME} element ={<Home/>}/>
        <Route  path= {RouteNames.VJEZBE} element ={<VjezbaPregled/>}/>
        <Route  path= {RouteNames.VJEZBE_NOVI} element ={<VjezbaNovi/>}/>
        <Route  path= {RouteNames.VJEZBE_PROMJENA} element ={<VjezbaPromjena/>}/>

      </Routes>
      <hr />
      &copy; Kalkulator ponavljanja 
    </Container>
    
  )
}

export default App
