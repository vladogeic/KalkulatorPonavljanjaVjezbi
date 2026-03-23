import { useEffect, useState } from "react"
import VjezbaService from "../../services/vjezbe/VjezbaService";

export default function VjezbaPregled() {

    const [vjezbe, setVjezbe] = useState([])

    useEffect(()=>{
        ucitajVjezbe();
    },[])


    async function ucitajVjezbe() {
        await VjezbaService.get().then((odgovor)=>{
            setVjezbe(odgovor.data)
        })
    }


    return (
        <>
        <Table>
            <thead>
                <tr>
<th>A</th>
<th>B</th>
<th>C</th>
<th>D</th>
<th>E</th>
</tr>
</thead>
<tbody>
{vjezbe && vjezbe.map((vjezba)=>(
                    <tr>
                        
                     <td>{vjezba.naziv} </td>
                     <td>{opis}</td>
                     <td>
                        <NumericFormat
                        displayType={'text'}
                        />
                </td>
                </tr>

                ))}
                </tbody>

                               
              </Table>              

        </>
    )
}