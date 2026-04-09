import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/edunova.svg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import KorisnikService from "../services/korisnici/KorisnikService";
import TreningService from "../services/treninzi/TreningService";


export default function Home() {
    const [brojTreninga, setBrojTrening] = useState(0);
    const [animatedTreninga, setAnimatedTreninga] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const treninzi = await TreningService.get();
                
                setBrojTrening(treninzi.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

   

    useEffect(() => {
        if (animatedTreninga < brojTreninga) {
            const timer = setTimeout(() => {
                setAnimatedTreninga(prev => Math.min(prev + 1, brojTreninga));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedTreninga, brojTreninga]);
   
    
   
   
   
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
                            <p className="text-white">Treninzi</p>
                            <div className="statistikaTekst">
                                {animatedTreninga}
                            </div>
                        </Card.Body>
                    </Card>
                   
                </div>
            </Col>
        </Row>
        </>
    )





            
        
}