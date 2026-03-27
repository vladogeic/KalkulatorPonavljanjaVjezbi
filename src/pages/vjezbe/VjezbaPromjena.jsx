import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import VjezbaService from "../../services/vjezbe/VjezbaService";
import { useEffect, useState } from "react";


export default function VjezbaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [vjezba, setVjezba] = useState({})

    async function ucitajVjezba() {
        await VjezbaService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data//po potrebi prilagođavam podatke

            setVjezba(s)
        })

    }


    useEffect(() => {
        ucitajVjezba()

    }, [])

    async function promjeni(vjezba) {
        // console.table(vjezba) //ovo je za kontrolu je li sve ok
        await VjezbaService.promjeni(params.sifra, vjezba).then(() => {
            navigate(RouteNames.VJEZBE)
        })

    }

    function odradiSubmit(e) { // e je event
        e.preventDefault(); //nemoj odraditi submit
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            opis: parseInt(podaci.get('opis'))
        }

        )

    }


    return (
        <>
            <h3>Promjena vježbe

            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue = {vjezba.naziv} />

                </Form.Group>
                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" name="opis" 
                    defaultValue={vjezba.opis} />

                </Form.Group >



                <hr style={{ marginTop: '50 px', border: '0' }} />


                <Row>

                    <Col>

                        <Link to={RouteNames.VJEZBE} className="btn btn-danger" >
                            Odustani
                        </Link>
                    </Col>



                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni vježbu
                        </Button>
                    </Col>

                </Row>


            </Form>

        </>
    )

}