import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import TreningService from "../../services/treninzi/TreningService"
import KorisnikService from "../../services/korisnici/KorisnikService"

export default function TreningNovi() {

    const navigate = useNavigate()
    const [korisnici, setKorisnici] = useState([])

    useEffect(() => {
        ucitajKorisnike()
    }, [])

    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function dodaj(trening) {
        await TreningService.dodaj(trening).then(() => {
            navigate(RouteNames.TRENINZI)
        })
    }

    function odradiSubmit(e) {
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

        dodaj({
            naziv: podaci.get('naziv'),
            korisnik: odabraniKorisnik
        })
    }

    return (
        <>
            <h3>Unos novog treninga</h3>
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
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Smjer - Select dropdown */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required>
                                            <option value="">Odaberite korisnika</option>
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
                                    Dodaj novi trening
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Form>
        </>
    )
}