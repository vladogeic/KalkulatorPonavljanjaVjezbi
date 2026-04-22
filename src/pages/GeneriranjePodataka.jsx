
import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, hr } from '@faker-js/faker';
import KorisnikService from '../services/korisnici/KorisnikService';
import VjezbaService from '../services/vjezbe/VjezbaService';
import TreningService from '../services/treninzi/TreningService';


export default function GeneriranjePodataka() {
    const [brojVjezbi, setBrojVjezbe] = useState(20);
    const [brojKorisnika, setBrojKorisnika] = useState(5);
    const [brojTreninga, setBrojTreninga] = useState(10);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    // Postavi faker na hrvatski jezik
    const faker = new Faker({
        locale: [hr]
    });

    

    const generirajVjezbe = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const vjezba = {
                naziv: i%2===0? faker.person.firstName('male') : faker.person.firstName('female'),
                opis: '',
            };
            await VjezbaService.dodaj(vjezba);
        }
    };

    const generirajKorisnike = async (broj) => {
        const naziviKorisnika = [
            'Ana',
            'Marija',
            'Marko',
            'Zvonko',
            'Khan',
            'Vladimir',
            'Tomislav'
        ];

        for (let i = 0; i < broj; i++) {
            await KorisnikService.dodaj({
                ime: naziviKorisnika[i % naziviKorisnika.length] + (i >= naziviKorisnika.length ? ` ${Math.floor(i / naziviKorisnika.length) + 1}` : ''),
                spol: i % 2 === 0 ? 'M' : 'Ž',
                tezina: faker.number.int({ min: 45, max: 150})
            });
        }
    };

     

    const generirajTreninge = async (broj) => {

        // Dohvati sve korisnike
        const rezultatKorisnici = await KorisnikService.get();
        const korisnici = rezultatKorisnici.data;

        
        if (korisnici.length === 0) {
            throw new Error('Nema dostupnih korisnika. Prvo generirajte korisnike.');
        }
        
        for (let i = 0; i < broj; i++) {
            // Odaberi nasumičnog korisnika
            const randomKorisnik = korisnici[faker.number.int({ min: 0, max: korisnici.length - 1 })];
  
            const trening = {
                naziv: 'Trening ' + i,   
                korisnik: randomKorisnik.sifra,
                vjezbe: [1,2]
            };
            
            await TreningService.dodaj(trening);
        }
    };


     const handleGenerirajVjezbe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajVjezbe(brojVjezbi);

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

   

    const handleGenerirajTreninge = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            
            await generirajTreninge(brojTreninga);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojTreninga} treninga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju treninga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiVjezbe = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve vježbe?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await VjezbaService.get();
            const vjezbe = rezultat.data;
            
            for (const vjezba of vjezbe) {
                await VjezbaService.obrisi(vjezba.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${vjezbe.length} vjezbi!`
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

   

    const handleObrisiTreninge = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve treninge?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await TreningService.get();
            const treninzi = rezultat.data;
            
            for (const t of treninzi) {
                await TreningService.obrisi(t.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${treninzi.length} treninga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju treninga: ' + error.message
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
                                Unesite broj vjezbi (1-200)
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
                    <Form onSubmit={handleGenerirajTreninge}>
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