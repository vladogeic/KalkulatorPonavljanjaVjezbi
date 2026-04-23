import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/david.jpg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import KorisnikService from "../services/korisnici/KorisnikService";
import TreningService from "../services/treninzi/TreningService";
import VjezbaService from "../services/vjezbe/VjezbaService";


export default function Home() {
    const [brojTreninga, setBrojTrening] = useState(0);
    const [animatedTreninga, setAnimatedTreninga] = useState(0);
    const [brojKorisnika,setBrojKorisnik] = useState(0);
    const [animatedKorisnika, setAnimatedKorisnika] = useState(0);
    const [brojVjezbi, setBrojVjezbe] = useState(0);
    const [animatedVježbi, setAnimatedKorisnika] = useState(0)

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



    useEffect(() => {
        const fetchData = async () => {
            try {
                const korisnici = await KorisnikService.get();
                
                setBrojKorisnik(korisnici.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

   
    useEffect(() => {
        if (animatedKorisnika < brojKorisnika) {
            const timer = setTimeout(() => {
                setAnimatedTreninga(prev => Math.min(prev + 1, brojKorisnika));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedKorisnika, brojKorisnika]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const vjezbe = await VjezbaService.get();
                
                setBrojVjezba(vjezbe.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

   
    useEffect(() => {
        if (animatedVjezbi < brojVjezbi) {
            const timer = setTimeout(() => {
                setAnimatedVjezbi(prev => Math.min(prev + 1, brojVjezbi));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedVjezbi, brojVjezbi]);


      
           
   
   
   
   
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
           <Row
            <Col className="d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Treninzi</p>
                            <div className="statistikaTekst">
                                {animatedTreninga}

                                <Col className="d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Korisnici</p>
                            <div className="statistikaTekst">
                                {animatedKorisnika}


                                <Col className="d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Vježbe</p>
                            <div className="statistikaTekst">
                                {animatedVježbi}
            
            
                           </div>
                        </Card.Body>
                    </Card>
                   
                </div>
            </Col>
        </Row>
        </>
    )





            
        
}