import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import KorisnikService from "../../services/korisnik/KorisnikService"

export default function KorisnikNovi(){

    const navigate = useNavigate()

    async function dodaj(korisnik){
        await KorisnikService.dodaj(korisnik).then(()=>{
            navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Ime (Postojanje) ---
        if (!podaci.get('ime') || podaci.get('ime').trim().length === 0) {
            alert("Ime je obavezno i ne smije sadržavati samo razmake!");
            return;
        }

        // --- KONTROLA 2: Ime (Minimalna duljina) ---
        if (podaci.get('spol').trim().length < 1) {
            alert("Spol mora imati najmanje 1 znak!");
            return;
        }

        // --- KONTROLA 3: Prezime (Postojanje) ---
        if (!podaci.get('tezina') || podaci.get('tezina').trim().length === 0) {
            alert("Težina je obavezno ");
            return;
        }

        // --- KONTROLA 4: Prezime (Minimalna duljina) ---
        // if (podaci.get('prezime').trim().length < 2) {
        //     alert("Prezime mora imati najmanje 2 znaka!");
        //     return;
        // }

        // --- KONTROLA 5: Email (Postojanje) ---
        // if (!podaci.get('email') || podaci.get('email').trim().length === 0) {
        //     alert("Email je obavezan!");
        //     return;
        // }

        // --- KONTROLA 6: Email (Format) ---
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(podaci.get('email'))) {
        //     alert("Email nije u ispravnom formatu!");
        //     return;
        // }

        // --- KONTROLA 7: OIB (Postojanje) ---
        if (!podaci.get('oib') || podaci.get('oib').trim().length === 0) {
            alert("OIB je obavezan!");
            return;
        }

        // --- KONTROLA 8: OIB (Duljina) ---
        if (podaci.get('oib').trim().length !== 11) {
            alert("OIB mora imati točno 11 znamenki!");
            return;
        }

        // --- KONTROLA 9: OIB (Samo brojevi) ---
        if (!/^\d+$/.test(podaci.get('oib'))) {
            alert("OIB smije sadržavati samo brojeve!");
            return;
        }

        dodaj({
            ime: podaci.get('ime'),
            spol: podaci.get('spol'),
            tezina: parseInt(podaci.get('tezina')),
            oib: podaci.get('oib')
        })
    }

    return (
        <>
            <h3>Unos novog polaznika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Spol</Form.Label>
                    <Form.Control type="text" name="spol" required />
                </Form.Group>

                <Form.Group controlId="tezina">
                    <Form.Label>Težina</Form.Label>
                    <Form.Control type="number" name="tezina" required />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="text" name="oib" required maxLength={11} />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KORISNICI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novog korisnika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}