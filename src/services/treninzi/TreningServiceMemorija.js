
import { treninzi } from "./TreningPodaci";


// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...treninzi]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: treninzi.find(g => g.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(trening){
    if(treninzi.length===0){
        trening.sifra=1
    }else{
        trening.sifra = treninzi[treninzi.length - 1].sifra + 1
    }
    
    treninzi.push(trening)
}

// 3/4 Update od CRUD
async function promjeni(sifra,trening) {
    const index = nadiIndex(sifra)
    treninzi[index] = {...treninzi[index], ...trening}
}

function nadiIndex(sifra){
    return treninzi.findIndex(g=>g.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        treninzi.splice(index, 1);
    }
    return;
}


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}