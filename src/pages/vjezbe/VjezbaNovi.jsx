import { Button, Col, Form, Row } from "react-bootstrap";
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
        dodaj({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),

        }

        )

    }


    return (
        <>
            <h3>
                Unos nove vježbe

            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />

                </Form.Group>
                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" name="opis" />

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
                            Dodaj novu vježbu
                        </Button>
                    </Col>

                </Row>


            </Form>

        </>
    )

}
