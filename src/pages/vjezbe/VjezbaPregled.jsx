import { useEffect, useState } from "react"
import VjezbaService from "../../services/vjezbe/VjezbaService";
import { RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function VjezbaPregled() {

    const [vjezbe, setVjezbe] = useState([])

    useEffect(() => {
        ucitajVjezbe();
    }, [])


    async function ucitajVjezbe() {
        await VjezbaService.get().then((odgovor) => {
            setVjezbe(odgovor.data)
        })
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
                                
                            </td>
                        </tr>

                    ))}
                </tbody>


            </Table>

        </>
    )
}