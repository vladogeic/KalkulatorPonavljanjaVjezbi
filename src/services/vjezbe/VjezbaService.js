import { vjezbe } from "./VjezbaPodaci";

// 1/4 Read od CRUD
async function get() {
    return {data: [... vjezbe]} //[...vjezbe] je kopija vjezbi
}
async function getBySifraname(sifra) {
    return { data: vjezbe.find (s => s.sifra === parseInt (sifra))}
    
}
//2/4 Create od CDUD

async function dodaj(vjezba) {
    if(vjezbe.length>0){
        vjezba.sifra = vjezbe[vjezbe.length-1].sifra+1
    }else{
        vjezba.sifra=1
    }

    vjezbe.push(vjezba)
}
// 3/4 Update od CRUD

async function promjeni(sifra,VjezbaPodaci) {
    const index =nadiIndex(sifra)
    vjezbe[index]= {...vjezbe[index], ...smjer}
function nadiIndex(sifra){
    return vjezbe.findIndex(s => s.sifra== parseInt(sifra))
}



export default{
    get,
    dodaj,
    getBySifra,
    promjeni
}