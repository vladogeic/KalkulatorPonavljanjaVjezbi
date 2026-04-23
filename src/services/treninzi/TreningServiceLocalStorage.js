
const STORAGE_KEY = 'treninzi';

// Pomoćna funkcija za dohvaćanje podataka iz local storage-a
function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

// Pomoćna funkcija za spremanje podataka
function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

// 1/4 Read - dohvati sve
async function get() {
    const treninzi = dohvatiSveIzStorage();
    return {success: true,  data: [...treninzi] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const treninzi = dohvatiSveIzStorage();
    const trening = treninzi.find(g => g.sifra === parseInt(sifra));
    return {success: true,  data: trening };
}

// 2/4 Create - dodaj novi
async function dodaj(trening) {
    const treninzi = dohvatiSveIzStorage();
    
    if (treninzi.length === 0) {
        trening.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...treninzi.map(g => g.sifra));
        trening.sifra = maxSifra + 1;
    }
    
    treninzi.push(trening);
    spremiUStorage(treninzi);
    return { data: trening };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, trening) {
    const treninzi = dohvatiSveIzStorage();
    const index = treninzi.findIndex(g => g.sifra === parseInt(sifra));
    
    if (index !== -1) {
        treninzi[index] = { ...treninzi[index], ...trening, sifra: parseInt(sifra) };
        spremiUStorage(treninzi);
    }
    return { data: treninzi[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let treninzi = dohvatiSveIzStorage();
    treninzi = treninzi.filter(g => g.sifra !== parseInt(sifra));
    spremiUStorage(treninzi);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};