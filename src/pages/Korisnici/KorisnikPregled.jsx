import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import KorisnikService from "../../services/korisnik/KorisnikService"

export default function KorisnikPregled(){

    const navigate = useNavigate()

    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajKorisnike()
    },[])

    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await KorisnikService.obrisi(sifra);
        await KorisnikService.get().then((odgovor)=>{
            setKorisnici(odgovor.data)
        })
    }

    return(
        <>
        <Link to={RouteNames.KORISNICI_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog Korisnika
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Spol</th>
                    <th>Ime</th>
                    <th>Težina</th>
                    <th>OIB</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {korisnici && korisnici.map((korisnik)=>(
                    <tr key={korisnik.sifra}>
                        <td className="lead">{korisnik.spol}</td>
                        <td className="lead">{korisnik.ime}</td>
                        <td>{korisnik.tezina}</td>
                        <td>{korisnik.oib}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/korisnici/${korisnik.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(korisnik.sifra)}>
                                Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}