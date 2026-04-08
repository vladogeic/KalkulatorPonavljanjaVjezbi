import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import VjezbaService from "../../services/vjezbe/VjezbaService";

export default function VjezbaNovi() {

    const navigate = useNavigate()

    async function dodaj(vjezba) {
        // console.table(smjer) //ovo je za kontrolu je li sve ok
        await VjezbaService.dodaj(vjezba).then(() => {
            navigate(RouteNames.VJEZBE)
        })

    }

    function odradiSubmit(e) { // e je event
        e.preventDefault(); //nemoj odraditi submit
        const podaci = new FormData(e.target)

        
        // --- KONTROLA 1: Naziv (Postojanje) ---
        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!")
            return // Prekid
        }

        // --- KONTROLA 2: Naziv (Minimalna duljina) ---
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv vježbe mora imati najmanje 3 znaka!")
            return // Prekid
        }

      

      


        dodaj({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),

        }

        )

    }



    return (
        <>
<h3>Unos nove vjezbe</h3>
            <Form onSubmit={odradiSubmit}>


                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o vjezbi</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima */}
                            <Row>
                                <Col>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv vježbe"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="opis" className="mb-3">
                                        <Form.Label className="fw-bold">Opis</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="opis"
                                            placeholder="Upišite opis vježbe"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            

                            <hr />

                            {/* Gumbi za akciju - RWD pozicioniranje */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.SMJEROVI} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Dodaj novu vjezbu
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

            </Form>







        </>
    )

}
