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
            <ul>
                {vjezbe && vjezbe.map((vjezba)=>(
                    <li>{vjezba.naziv} </li>
                ))}
            </ul>

        </>
    )
}