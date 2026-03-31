import { useEffect, useState } from "react"
import VjezbaService from "../../services/vjezbe/VjezbaService";
import { RouteNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

export default function VjezbaPregled() {

    const navigate = useNavigate()
    const [vjezbe, setVjezbe] = useState([])

    useEffect(() => {
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
    async function obrisi(sifra) {
        if(!confirm('Sigurno obrisati')){
            return
        }
        await VjezbaService.obrisi(sifra)
        ucitajVjezbe()
    }








    return (
        <>

            <Link to={RouteNames.VJEZBE_NOVI} className="btn btn-success  w-100 mb-3 mt-3">
                Dodavanje nove vježbe
            </Link>




            <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Opis</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {vjezbe && vjezbe.map((vjezba) => (
                        <tr key={vjezba.sifra}>

                            <td>{vjezba.naziv} </td>
                            <td>{vjezba.opis}</td>
                            <td>
                               <Button onClick={()=>{navigate(`/vjezbe/${vjezba.sifra}`)}}>
                                    Promjena
                                </Button> 
                                  &nbsp;&nbsp;
                                 <Button variant="danger" onClick={()=>{obrisi(vjezba.sifra)}}>
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