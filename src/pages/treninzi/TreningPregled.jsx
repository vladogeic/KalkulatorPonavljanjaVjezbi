
import { useEffect, useState } from "react"
import TreningService from "../../services/treninzi/TreningService"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function TreningPregled(){

    const navigate = useNavigate()

    const [treninzi, setTreninzi] = useState([])
    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajTreninzi()
        ucitajKorisnike()
    },[])

    async function ucitajTreninzi() {
        await TreningService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setTreninzi(odgovor.data)
        })
    }

    async function ucitajVjezbe() {
        await KorisnikService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await TreningService.obrisi(sifra);
        await TreningService.get().then((odgovor)=>{
            setTreninzi(odgovor.data)
        })
    }

    function dohvatiNazivVjezbe(sifraVjezbe) {
        const korisnik = korisnici.find(s => s.sifra === sifraKorisnici)
        return korisnik ? korisnik.naziv : 'Nepoznat korisnik'
    }

    return(
        <>
        <Link to={RouteNames.TRENINZI_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novi treninzi
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Vjezba</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {treninzi && treninzi.map((grupa)=>(
                    <tr key={trening.sifra}>
                        <td className="lead">{trening.naziv}</td>
                        <td>{dohvatiNazivSmjera(trening.smjer)}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/treninzi/${trening.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(trening.sifra)}>
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