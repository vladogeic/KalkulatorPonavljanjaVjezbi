
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TreningService from "../../services/treninzi/TreningService"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Col, Form, Row, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function TreningPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [trening, setTrening] = useState({})
    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajTrening()
        ucitajKorisnici()
    },[])

    async function ucitajTrening() {
        await TreningService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setTrening(odgovor.data)
        })
    }

    async function ucitajKorisnici() {
        await KorisnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function promjeni(trening) {
        await TreningService.promjeni(params.sifra,trening).then(()=>{
            navigate(RouteNames.TRENINZI)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Naziv (Postojanje) ---
        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
            return;
        }

        // --- KONTROLA 2: Naziv (Minimalna duljina) ---
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv grupe mora imati najmanje 3 znaka!");
            return;
        }

        // --- KONTROLA 3: Smjer (Postojanje) ---
        if (!podaci.get('korisnik') || podaci.get('korisnik') === "") {
            alert("Morate odabrati korisnika!");
            return;
        }

        // --- KONTROLA 4: Smjer (Validna vrijednost) ---
        const odabraniKorisnik = parseInt(podaci.get('korisnik'));
        if (isNaN(odabraniKorisnik) || odabraniKorisnik <= 0) {
            alert("Odabrani korisnik nije valjan!");
            return;
        }

        promjeni({
            naziv: podaci.get('naziv'),
            smjer: odabraniSmjer
        })
    }

    return(
         <>
            <h3>Promjena treninga</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o treningu</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv treninga"
                                            required
                                            defaultValue={trening.naziv}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Smjer - Select dropdown */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required value={trening.smjer || ''} onChange={(e) => setTrening({...trening, korisnik: parseInt(e.target.value)})}>
                                            <option value="">Odaberite korisnik</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.naziv}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            {/* Gumbi za akciju */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.TRENINZI} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Promjeni trening
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Form>
        </>
    )
}