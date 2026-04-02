
const STORAGE_KEY = 'korisnici';

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
    const korisnici = dohvatiSveIzStorage();
    return {success: true,  data: [...korisnici] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const korisnici = dohvatiSveIzStorage();
    const korisnik = korisnici.find(p => p.sifra === parseInt(sifra));
    return {success: true,  data: korisnik };
}

// 2/4 Create - dodaj novi
async function dodaj(korisnik) {
    const korisnici = dohvatiSveIzStorage();
    
    if (korisnici.length === 0) {
        korisnik.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...korisnici.map(p => p.sifra));
        korisnik.sifra = maxSifra + 1;
    }
    
    korisnici.push(korisnik);
    spremiUStorage(korisnici);
    return { data: korisnik };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, korisnik) {
    const korisnici = dohvatiSveIzStorage();
    const index = korisnici.findIndex(p => p.sifra === parseInt(sifra));
    
    if (index !== -1) {
        korisnici[index] = { ...korisnici[index], ...korisnik};
        spremiUStorage(korisnici);
    }
    return { data: korisnici[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let korisnici = dohvatiSveIzStorage();
    korisnici = korisnici.filter(p => p.sifra !== parseInt(sifra));
    spremiUStorage(korisnici);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};