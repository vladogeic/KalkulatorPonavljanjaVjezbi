import { vjezbe } from "./VjezbaPodaci";

// 1/4 Read od CRUD
async function get() {
    return {data: vjezbe}
}

async function dodaj(vjezba) {
    if(vjezbe.length>0){
        vjezba.sifra = vjezbe[vjezbe.length-1].sifra+1
    }else{
        vjezba.sifra=1
    }

    vjezbe.push(vjezba)
}


export default{
    get,
    dodaj
}