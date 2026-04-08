
import KorisnikServiceLocalStorage from "./KorisnikServiceLocalStorage";
import KorisnikServiceMemorija from "./KorisnikServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

// 1. Odabir servisa
switch (DATA_SOURCE) {
    case 'memorija':
        Servis = KorisnikServiceMemorija;
        break;
    case 'localStorage':
        Servis = KorisnikServiceLocalStorage;
        break;
    default:
        Servis = null;
}

// 2. Definiranje defaultnog (praznog) ponašanja ako Servis nije pronađen
const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (korisnik) => { console.error("Servis nije učitan"); },
    promjeni: async (sifra, korisnik) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije učitan"); }
};

// 3. Jedan jedini export na kraju
// Ako Servis postoji, koristi njega, inače koristi PrazanServis
const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (korisnik) => AktivniServis.dodaj(korisnik),
    promjeni: (sifra, korisnik) => AktivniServis.promjeni(sifra, korisnik),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};