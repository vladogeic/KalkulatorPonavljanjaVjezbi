import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/edunova.svg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import SmjerService from "../services/smjerovi/SmjerService";
import KorisnikService from "../services/korisnici/KorisnikService";
import TreningService from "../services/treninzi/TreningService";


export default function Home() {
       const [brojSmjerova, setBrojSmjerova] = useState(0);
    const [brojPolaznika, setBrojPolaznika] = useState(0);
    const [brojTreninga, setBrojTrening] = useState(0);
    const [animatedSmjerovi, setAnimatedSmjerovi] = useState(0);
    const [animatedKorisnici, setAnimatedKorisnici] = useState(0);
    const [animatedTreninzi, setAnimatedTreninzi] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const smjeroviRezultat = await SmjerService.get();
                const korisnici = await KorisnikService.get();
                const treninzi = await TreningService.get();
                
                setBrojSmjerova(smjeroviRezultat.data.length);
                setBrojKorisnika(korisnici.data.length);
                setBrojTrening(treninzi.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (animatedSmjerovi < brojSmjerova) {
            const timer = setTimeout(() => {
                setAnimatedSmjerovi(prev => Math.min(prev + 1, brojSmjerova));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [animatedSmjerovi, brojSmjerova]);

    useEffect(() => {
        if (animatedKorisnnici < brojKorisnika) {
            const timer = setTimeout(() => {
                setAnimatedKorisnici(prev => Math.min(prev + 1, brojKorisnika));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [animatedKorisnici, brojKorisnika]);

    useEffect(() => {
        if (animatedGrupe < brojGrupa) {
            const timer = setTimeout(() => {
                setAnimatedTreninzi(prev => Math.min(prev + 1, brojTreninga));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedGrupe, brojTreninga]);
   
    
   
   
   
    return (
        <>

           <Row>
            <Col md={6}>
            <div style={{ textAlign: 'center' }}>
                <img src={slika} />

            </div>
            <p className="lead m-5 text-center">Dobrodošli na {IME_APLIKACIJE}</p>
             <div style={{maxWidth: '500px', margin: 'auto'}}>
                <DotLottieReact
                    src="/AISpark_InteractiveAssistant.lottie"
                     loop
                    autoplay
                />
            </div>
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Smjerovi</p>
                            <div className="statistikaTekst">
                                {animatedSmjerovi}
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Polaznici</p>
                            <div className="statistikaTekst">
                                {animatedPolaznici}
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Grupe</p>
                            <div className="statistikaTekst">
                                {animatedGrupe}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </Row>
        </>
    )





            
        
}