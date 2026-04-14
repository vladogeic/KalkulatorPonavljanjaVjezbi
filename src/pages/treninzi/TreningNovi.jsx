import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import TreningService from "../../services/treninzi/TreningService"
import KorisnikService from "../../services/korisnici/KorisnikService"
import VjezbaService from "../../services/vjezbe/VjezbaService"

export default function TreningNovi() {

    const navigate = useNavigate()
    const [korisnici, setKorisnici] = useState([])

    const [vjezbe, setVjezbe] = useState([])
    const [odabraneVjezbe, setOdabraneVjezbe] = useState([])
    const [pretragaVjezbe, setPretragaVjezbe] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)

    useEffect(() => {
        ucitajKorisnike()
        ucitajVjezbe();
    }, [])

    async function ucitajVjezbe() {
            await VjezbaService.get().then((odgovor) => {
    
                            if(!odgovor.success){
                    alert('Nije implementiran servis')
                    return
                }
    
    
                setVjezbe(odgovor.data)
            })
        }

    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }


    function dodajVjezbu(vjezba) {
        if (!odabraniVjezbe.find(p => p.sifra === vjezba.sifra)) {
            setOdabraneVjezbe([...odabraneVjezbe, vjezba])
        }
        setPretragaVjezbe('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniVjezbu(sifra) {
        setOdabraneVjezbe(odabraneVjezbe.filter(p => p.sifra !== sifra))
    }

    function filtrirajVjezbe() {
        if (!pretragaVjezbe) return []
        return polaznici.filter(p =>
            !odabraneVjezbe.find(op => op.sifra === p.sifra) &&
            (p.ime.toLowerCase().includes(pretragaVjezbi.toLowerCase()) ||
                p.prezime.toLowerCase().includes(pretragaVjezbi.toLowerCase()))
        )
    }

    function handleKeyDown(e) {
        const filtriraneVjezbe = filtrirajVjezbe()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev =>
                prev < filtriraneVjezbe.length - 1 ? prev + 1 : prev
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => prev > 0 ? prev - 1 : 0)
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraneVjezbe.length > 0) {
            e.preventDefault()
            dodajVjezbu(filtriraneVjezbe[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
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
            alert("Naziv treninga mora imati najmanje 3 znaka!");
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
            korisnik: odabraniKorisnik,
            vjezbe: odabraneVjezbe.map(p => p.sifra)

        })
    }

    return (
        <>
            <h3>Unos novog treninga</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    
         <Row>
                        {/* Lijeva strana - Podaci o grupi */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Podaci o treningu</Card.Title>




                            {/* Naziv */}
                            
                            
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv treninga"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required>

                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.ime}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Desna strana - Vjezbe */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Vjezbe</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj vjezbu</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži vježbu..."
                                            value={pretragaVjezbe}
                                            onChange={(e) => {
                                                setPretragaVjezbe(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaVjezbe.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajVjezbe().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajVjezbe().map((polaznik, index) => (
                                                    <div
                                                        key={vjezba.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajVjezbu(vjezba)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        {vjezba.ime} 
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih vježbi */}
                                    {odabraneVjezbe.length > 0 && (
                                        <div style={{overflow: 'auto', maxHeight: '300px'}}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Ime</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraneVjezbe.map(vjezba => (
                                                        <tr key={vjezba.sifra}>
                                                            <td>{vjezba.ime} </td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniVjezbu(vjezba.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>

                                    )}
                                    {odabraneVjezbe.length === 0 && (
                                        <p className="text-muted">Nema odabranih vjezbi</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <hr className="my-4" />

                    {/* Gumbi za akciju */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={RouteNames.GRUPE} className="btn btn-danger px-4">
                            Odustani
                        </Link>
                        <Button type="submit" variant="success">
                            Dodaj novu grupu
                        </Button>
                    </div>










                </Container>
            </Form>
        </>
    )
}