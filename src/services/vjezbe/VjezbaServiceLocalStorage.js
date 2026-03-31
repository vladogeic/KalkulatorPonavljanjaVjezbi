const STORAGE_KEY = 'vjezbe';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const vjezbe = dohvatiSveIzStorage();
    return {success: true,  data: [...vjezbe] };
}

async function getBySifra(sifra) {
    const vjezbe = dohvatiSveIzStorage();
    const vjezba = vjezbe.find(s => s.sifra === parseInt(sifra));
    return {success: true,  data: smjer };
}

async function dodaj(vjezba) {
    const vjezbe = dohvatiSveIzStorage();
    
    if (vjezbe.length === 0) {
        vjezba.sifra = 1;
    } else {
        const maxSifra = Math.max(...vjezbe.map(s => s.sifra));
        vjezba.sifra = maxSifra + 1;
    }
    
    vjezbe.push(vjezba);
    spremiUStorage(vjezbe);
    return { data: vjezba };
}

async function promjeni(sifra, vjezba) {
    const vjezbe = dohvatiSveIzStorage();
    const index = vjezbe.findIndex(s => s.sifra === parseInt(sifra));
    
    if (index !== -1) {
        vjezbe[index] = { ...vjezbe[index], ...vjezba};
        spremiUStorage(vjezbe);
    }
    return { data: vjezbe[index] };
}

async function obrisi(sifra) {
    let vjezbe = dohvatiSveIzStorage();
    vjezbe = vjezbe.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(vjezbe);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};