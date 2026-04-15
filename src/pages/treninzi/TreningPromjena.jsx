import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import TreningService from "../../services/treninzi/TreningService"
import KorisnikService from "../../services/korisnici/KorisnikService"
import VjezbaService from "../../services/vjezbe/VjezbaService"
import { Button, Col, Form, Row, Container, Card, Table } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function TreningPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [trening, setTrening] = useState({})
    const [korisnici, setKorisnici] = useState([])
    const [vjezbe, setVjezbe] = useState([])
    const [odabraneVjezbe, setOdabraneVjezbe] = useState([])
    const [pretragaVjezbi, setPretragaVjezbe] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)

    useEffect(()=>{
        ucitajTrening()
        ucitajKorisnici()
        ucitajVjezbe()
    },[])

       useEffect(() => {
        if (trening.vjezbe && vjezbe.length > 0) {
            const odabrani = vjezbe.filter(p => grupa.vjezbe.includes(p.sifra))
            setOdabraneVjezbe(odabrani)
        }
    }, [trening, vjezbe])


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
        await VjezbaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za vjezbe')
                return
            }
            setVjezbe(odgovor.data)
        })
    }
        async function ucitajVjezbe() {
        await VjezbaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za vjezbe')
                return
            }
            setVjezbe(odgovor.data)
        })
    }

    function dodajVjezba(vjezba) {
        if (!odabraneVjezbe.find(p => p.sifra === vjezba.sifra)) {
            setOdabraneVjezbe([...odabraneVjezbe, vjezba])
        }
        setPretragaVjezbi('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniVjezbu(sifra) {
        setOdabraneVjezbe(odabraneVjezbe.filter(p => p.sifra !== sifra))
    }

    function filtrirajVjezbe() {
        if (!pretragaVjezbe) return []
        return vjezbe.filter(p => 
            !odabraneVjezbe.find(op => op.sifra === p.sifra) &&
            (p.ime.toLowerCase().includes(pretragaVjezbe.toLowerCase()) ||
             p.naziv.toLowerCase().includes(pretragaVjezbe.toLowerCase()))
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
            korisnik: odabraniKorisnik,
            vjezbe: odabraneVjezbe.map(p => p.sifra)
        })
    }
    return(
         <>
            <h3>Promjena treninga</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">                    
                     <Row>
                        {/* Lijeva strana - Podaci o treningu */}
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
                                            defaultValue={trening.naziv}
                                        />
                                    </Form.Group>                                                         

                            {/* Korisnik  */}                            
                            
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required value={trening.korisnik || ''} onChange={(e) => setTrening({...trening, korisnik: parseInt(e.target.value)})}>
                                            <option value="">Odaberite korisnik</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.ime}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                            </Card.Body>                            </Card>
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
                                            placeholder="Pretraži vjezbu..."
                                            value={pretragaVjezbi}
                                            onChange={(e) => {
                                                setPretragaVjezbi(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaVjezbi.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajVjezbe().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{zIndex: 1000, maxHeight: '200px', overflowY: 'auto'}}>
                                                {filtrirajVjezbe().map((vjezbaService, index) => (
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
                                                        {vjezba.ime} {vjezba.naziv}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih vjezbi */}
                                    {odabraneVjezbe.length > 0 && (
                                        <div style={{overflow: 'auto', maxHeight: '300px'}}>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Ime</th>
                                                    <th style={{width: '80px'}}>Akcija</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {odabraneVjezbe.map(vjezbe => (
                                                    <tr key={vjezba.sifra}>
                                                        <td>{vjezba.ime} {vjezba.naziv}</td>
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
                        <Link to={RouteNames.TRENINZI} className="btn btn-danger px-4">
                            Odustani
                        </Link>
                        <Button type="submit" variant="success">
                            Promjeni trening
                        </Button>
                    </div>

                                

                </Container>
            </Form>
        </>
    )
}