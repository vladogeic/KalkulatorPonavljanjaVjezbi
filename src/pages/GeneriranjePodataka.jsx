
import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, hr } from '@faker-js/faker';
import KorisnikService from '../services/korisnici/KorisnikService';
import VjezbaService from '../services/vjezbe/VjezbaService';
import TreningService from '../services/treninzi/TreningService';


export default function GeneriranjePodataka() {
    const [brojKorisnika, setBrojKorisnika] = useState(5);
    const [brojVjezbi, setBrojVjezbe] = useState(20);
    const [brojTreninga, setBrojTreninga] = useState(10);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    // Postavi faker na hrvatski jezik
    const faker = new Faker({
        locale: [hr]
    });

    const generirajKorisnike = async (broj) => {
        const naziviKorisnika = [
            'Web programiranje',
            'Java programiranje',
            'Python programiranje',
            'Frontend razvoj',
            'Backend razvoj',
            'Full Stack razvoj',
            'Mobile razvoj',
            'DevOps',
            'Data Science',
            'Cyber Security',
            'UI/UX dizajn',
            'Digital Marketing',
            'Grafički dizajn',
            'Video produkcija',
            'Fotografija'
        ];

        for (let i = 0; i < broj; i++) {
            await KorisnikService.dodaj({
                naziv: naziviKorisnika[i % naziviKorisnika.length] + (i >= naziviKorisnika.length ? ` ${Math.floor(i / naziviKorisnika.length) + 1}` : ''),
                trajanje: faker.number.int({ min: 130, max: 350 }),
                cijena: faker.number.float({ min: 1100, max: 5000, precision: 0.01 }).toFixed(2),
                datumPokretanja: faker.date.soon().toISOString().split('T')[0],
                aktivan: faker.datatype.boolean()
            });
        }
    };

    const generirajVjezbe = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const polaznik = {
                ime: i%2===0? faker.person.firstName('male') : faker.person.firstName('female'),
                prezime: faker.person.lastName(),
                email: faker.internet.email(),
                oib: faker.string.numeric(11)
            };
            await VjezbaService.dodaj(vjezba);
        }
    };

    const generirajGrupe = async (broj) => {

        // Dohvati sve korisnike
        const rezultatKorisnici = await KorisnikService.get();
        const korisnici = rezultatKorisnici.data;

        
        if (korisnici.length === 0) {
            throw new Error('Nema dostupnih korisnika. Prvo generirajte korisnike.');
        }
        
        for (let i = 0; i < broj; i++) {
            // Odaberi nasumičnog korisnika
            const randomKorisnik = korisnici[faker.number.int({ min: 0, max: korisnici.length - 1 })];
  
            const grupa = {
                naziv: randomKorisnik.naziv.trim().split(/\s+/).slice(0, 2).map(rijec => rijec[0]).join('').toUpperCase(),   
                smjer: randomKorisnik.sifra
            };
            
            await VjezbaService.dodaj(grupa);
        }
    };

    const handleGenerirajKorisnike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajKorisnike(brojKorisnika);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojKorisnika} korisnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajPolaznike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            
            await generirajVjezbi(brojVjezbi);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojVjezbi} vježbi!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju vježbi: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiPolaznike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve vježbe?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await VjezbaService.get();
            const vjezbe = rezultat.data;
            
            for (const vjezba of vjezba) {
                await VjezbaService.obrisi(polaznik.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${polaznici.length} vjezbi!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju vježbi: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiKorisnike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve korisnike?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await KorisnikService.get();
            const korisnici = rezultat.data;
            
            for (const korisnik of korisnici) {
                await KorisnikService.obrisi(korisnik.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${korisnici.length} korisnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajVjezbe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajVjezba(brojVjezbi);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojVjezbi} vjezbi!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju vježbi: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiGrupe = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve vježbe?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await VjezbaService.get();
            const vjezbe = rezultat.data;
            
            for (const grupa of vjezbe) {
                await VjezbaService.obrisi(vjezbe.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${vjezbe.length} vježbi!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju vježbi: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajKorisnike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj korisnika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojKorisnika}
                                onChange={(e) => setBrojKorisnika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj korisnika (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj korisnike'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajVjezbe}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj vjezbi</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojVjezbi}
                                onChange={(e) => setBrojVjezbe(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj polaznika (1-200)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj vjezbe'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajKorisnike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj treninga</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="100"
                                value={brojTreninga}
                                onChange={(e) => setBrojTreninga(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj grupa (1-100)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj treninge'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće. 
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiKorisnike}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve korisnike'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiVjezbe}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve vjezbe'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiTreninge}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve treninge'}
                    </Button>
                </Col>
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}