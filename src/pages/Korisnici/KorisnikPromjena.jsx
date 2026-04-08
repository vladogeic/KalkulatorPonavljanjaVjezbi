import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import KorisnikService from "../../services/korisnici/KorisnikService"

export default function KorisnikPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [korisnik, setKorisnik] = useState({})

    useEffect(()=>{
        ucitajKorisnika()
    },[])

    async function ucitajKorisnika() {
        await KorisnikService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setKorisnik(odgovor.data)
        })
    }

    async function promjeni(korisnik) {
        await KorisnikService.promjeni(params.sifra,korisnik).then(()=>{
            navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Ime (Postojanje) ---
        if (!podaci.get('ime') || podaci.get('ime').trim().length === 0) {
            alert("Ime je obavezno i ne smije sadržavati samo razmake!");
            return;
        }

        // --- KONTROLA 2: Ime (Minimalna duljina) ---
        if (podaci.get('ime').trim().length < 2) {
            alert("Ime mora imati najmanje 2 znaka!");
            return;
        }

        // --- KONTROLA 3: Spol (Postojanje) ---
        if (!podaci.get('spol') || podaci.get('spol').trim().length === 0) {
            alert("Spol je obavezan !");
            return;
        }

        // --- KONTROLA 4: Spol (Minimalna duljina) ---
        if (podaci.get('spol').trim().length < 1) {
            alert("Spol mora imati najmanje 1 znak!");
            return;
        }

        // --- KONTROLA 5: Težina (Postojanje) ---
        if (!podaci.get('težina') || podaci.get('težina').trim().length === 0) {
            alert("Težina je obavezna!");
            return;
        }

        // --- KONTROLA 6: Email (Format) ---
        //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //if (!emailRegex.test(podaci.get('email'))) {
          //  alert("Email nije u ispravnom formatu!");
           // return;
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

        promjeni({
            ime: podaci.get('ime'),
            spol: podaci.get('spol'),
            težina: podaci.get('težina'),
            oib: podaci.get('oib')
        })
    }

    return(
         <>
            <h3>Promjena polaznika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required 
                    defaultValue={korisnik.ime}/>
                </Form.Group>

                <Form.Group controlId="spol">
                    <Form.Label>Spol</Form.Label>
                    <Form.Control type="text" name="spol" required 
                    defaultValue={korisnik.spol}/>
                </Form.Group>

                <Form.Group controlId="težina">
                    <Form.Label>Težina</Form.Label>
                    <Form.Control type="težina" name="težina" required 
                    defaultValue={korisnik.težina}/>
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="text" name="oib" required maxLength={11}
                    defaultValue={korisnik.oib}/>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KORISNICI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni korisnika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}