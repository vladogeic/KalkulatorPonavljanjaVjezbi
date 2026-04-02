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

        // --- KONTROLA 3: Trajanje (Logički raspon) ---
        // Provjera je li broj i je li unutar zadanih granica (npr. 1 - 500 sati)
        if (isNaN(podaci.get('opis')) || podaci.get('opis') < 1 || podaci.get('opis') > 500) {
            alert("Opis mora biti broj između 1 i 500 sati!")
            return // Prekid
        }

       // if (!podaci.get('cijena') || podaci.get('cijena') === "") {
         //   alert("Obavezno cijena smjera!")
           // return
       // }

        // --- KONTROLA 4: Upisnina (Negativne vrijednosti) ---
        //if (podaci.get('cijena') < 0) {
          //  alert("Cijena ne može biti negativan broj!")
           // return // Prekid
       // }

        if (!podaci.get('datumPokretanja') || podaci.get('datumPokretanja') === "") {
            alert("Morate odabrati datum pokretanja!")
            return
        }

        // B) Logička provjera: Datum ne smije biti u prošlosti
        const odabraniDatum = new Date(podaci.get('datumPokretanja'))
        const danas = new Date()
        danas.setHours(0, 0, 0, 0) // Resetiramo vrijeme na ponoć radi točne usporedbe datuma

        if (odabraniDatum < danas) {
            alert("Datum pokretanja ne može biti u prošlosti!")
            return
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
                                <Col xs={12}>
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
                            </Row>

                            {/* Trajanje i Cijena - Jedno pored drugog na md+, jedno ispod drugog na mobitelu */}
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="opis" className="mb-3">
                                        <Form.Label className="fw-bold">Opis</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="opis"
                                            step={1}
                                            placeholder="0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="cijena" className="mb-3">
                                        <Form.Label className="fw-bold">Cijena (€)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="cijena"
                                            step={0.01}
                                            placeholder="0,00"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                {/* Datum pokretanja */}
                                <Col md={6}>
                                    <Form.Group controlId="datumPokretanja" className="mb-3">
                                        <Form.Label className="fw-bold">Datum pokretanja</Form.Label>
                                        <Form.Control type="date" name="datumPokretanja" 
                                        // Dodajemo onClick i onFocus za bolju pristupačnost
                                        onClick={(e) => e.target.showPicker()} 
                                        onFocus={(e) => e.target.showPicker()}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Aktivan - Switch umjesto checkboxa za moderniji izgled */}
                                <Col md={6}>
                                    <Form.Group controlId="aktivan" className="mb-3 mt-md-3">
                                        <Form.Check
                                            type="switch"
                                            label="Smjer je aktivan"
                                            name="aktivan"
                                            className="fs-5"
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
