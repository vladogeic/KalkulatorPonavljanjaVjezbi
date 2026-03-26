import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate,useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SmjerService from "../../services/vjezbe/VjezbaService";
import { useEffect,useState } from "react";
import VjezbaNovi from "./VjezbaNovi";

export default function VjezbaPromjena (){

const navigate = useNavigate()
const params =useParams()
const [vjezba,setVjezba] = useState({})
const[aktivan,setAktivan]= useState(false)

async function ucitajSmjer(){
    await VjezbaService.getBySifra(params.sifra).then ( (odgovor)=> {
       const s = odgovor.data//po potrebi prilagođavam podatke
      
      
       setAktivan(s.aktivan)
       
       
       
        setVjezba(s)
    })

}    
}

useEffect(()=>{
    ucitajVjezba()

},[])

    async function promjeni(vjezba) {
       // console.table(smjer) //ovo je za kontrolu je li sve ok
       await VjezbaService.promjeni(params.sifra,vjezba).then(()=>{
        navigate (RouteNames.VJEZBE)
       })
        
    }

function odradiSubmit(e){ // e je event
e.preventDefault(); //nemoj odraditi submit
const podaci= new FormData( e.target)
promjeni({
    naziv: podaci.get('naziv'),
    opis : parseInt(podaci.get('opis')),
    aktivan : podaci.get('aktivan') === 'on'
}

)

}


return(
<>
<h3>,
Unos nove vjezbe

</h3>
<Form onSubmit={odradiSubmit}>
    <Form.Group controlId="naziv">
<Form.Label>Naziv</Form.Label>
<Form.Control type="text" name="naziv" required/>
defaultValue = {vjezba.naziv}

    </Form.Group>
<Form.Group controlId="opis">
    <Form.Label>Opis</Form.Label>
    <Form.Control type="number" name="opis" step={1}/>
    defaultValue ={vjezba.trajanje}/>

</Form.Group >







<Form.Group controlId="aktivan">
<Form.Check label="Aktivan"  name="aktivan"/>

</Form.Group>

<hr style={ {marginTop: '50 px',border: '0' }}/>


<Row>

   <Col>

        <Link to={RouteNames.VJEZBE} className="btn btn-danger" >
         Odustani
        </Link>
   </Col>



   <Col>
       <Button type="submit" variant="success">
           Dodaj novi smjer
       </Button>
   </Col>

</Row>


</Form>

</>
)

}