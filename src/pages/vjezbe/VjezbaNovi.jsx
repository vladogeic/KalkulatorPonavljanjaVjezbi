import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import VjezbaService from "../../services/smjerovi/VjezbaService";

export default function VjezbaNovi (){

const navigate = useNavigate()

    async function dodaj(smjer) {
       // console.table(smjer) //ovo je za kontrolu je li sve ok
       await SmjerService.dodaj(smjer).then(()=>{
        navigate (RouteNames.SMJEROVI)
       })
        
    }

function odradiSubmit(e){ // e je event
e.preventDefault(); //nemoj odraditi submit
const podaci= new FormData( e.target)
dodaj({
    naziv: podaci.get('naziv'),
    opis : parseInt(podaci.get('opis')),
    
}

)

}


return(
<>
<h3>,
Unos novog smjera

</h3>
<Form onSubmit={odradiSubmit}>
    <Form.Group controlId="naziv">
<Form.Label>Naziv</Form.Label>
<Form.Control type="text" name="naziv" required/>

    </Form.Group>
<Form.Group controlId="opis">
    <Form.Label>Opis</Form.Label>
    <Form.Control type="number" name="opis" step={1}/>

</Form.Group >


    

<hr style={ {marginTop: '50 px',border: '0' }}/>


<Row>

   <Col>

        <Link to={RouteNames.SMJEROVI} className="btn btn-danger" >
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
         