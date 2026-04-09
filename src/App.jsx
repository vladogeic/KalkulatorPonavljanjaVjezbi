
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
import KorisnikPregled from './pages/korisnici/KorisnikPregled'
import KorisnikNovi from './pages/korisnici/KorisnikNovi'
import KorisnikPromjena from './pages/korisnici/KorisnikPromjena'

import TreningPregled from './pages/treninzi/TreningPregled'
import TreningNovi from './pages/treninzi/TreningNovi'
import TreningPromjena from './pages/treninzi/TreningPromjena'




function App() {
  

  return (
    <Container>
      <Izbornik/>

      <Routes>
        
        <Route  path= {RouteNames.HOME} element ={<Home/>}/>
        <Route  path= {RouteNames.VJEZBE} element ={<VjezbaPregled/>}/>
        <Route  path= {RouteNames.VJEZBE_NOVI} element ={<VjezbaNovi/>}/>
        <Route  path= {RouteNames.VJEZBE_PROMJENA} element ={<VjezbaPromjena/>}/>

        <Route  path= {RouteNames.KORISNICI} element ={<KorisnikPregled />}/>
        <Route  path= {RouteNames.KORISNICI_NOVI} element ={<KorisnikNovi/>}/>
        <Route  path= {RouteNames.KORISNICI_PROMJENA} element ={<KorisnikPromjena/>}/>


        <Route path={RouteNames.TRENINZI} element={<TreningPregled />} />
        <Route path={RouteNames.TRENINZI_NOVI} element={<TreningNovi />} />
        <Route path={RouteNames.TRENINZI_PROMJENA} element={<TreningPromjena />} />




      </Routes>
      <hr />
      &copy; Kalkulator ponavljanja 
    </Container>
    
  )
}

export default App
