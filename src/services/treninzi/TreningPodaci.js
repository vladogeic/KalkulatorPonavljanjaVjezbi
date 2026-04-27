

export const treninzi = [
    {
        sifra: 1,
        naziv: 'Trenig elitne razine',
        korisnik: 1,
        vjezbe: [
            {
                vjezba: 1,
                tezina: 75,
                ponavljanja: 10
            },
            {
                vjezba: 6,
                tezina: null, // ako je null uzima se težina korisnika
                ponavljanja: 50
            }]
    },
    {
        sifra: 2,
        naziv: 'Napredni trening',
        korisnik: 1,
        vjezbe: [
            {
                vjezba: 2,
                tezina: 20,
                ponavljanja: 30
            },
            {
                vjezba: 3,
                tezina: 60,
                ponavljanja: 10
            }]
    },
    {
        sifra: 3,
        naziv: 'Trening srednjeg intenziteta',
        korisnik: 2,
        vjezbe: [
            {
                vjezba: 1,
                tezina: 20,
                ponavljanja: 30
            },
            {
                vjezba: 4,
                tezina: 60,
                ponavljanja: 10
            }
        ]
    },
    {
        sifra: 4,
        naziv: 'Jači početnički trening',
        korisnik: 3,
        vjezbe: [{
                vjezba: 2,
                tezina: 30,
                ponavljanja: 30
            },
            {
                vjezba: 3,
                tezina: 60,
                ponavljanja: 20
            },
            {
                vjezba: 4,
                tezina: 20,
                ponavljanja: 30
            }]
    },
    {
        sifra: 5,
        naziv: 'Početnički trening',
        korisnik: 4,
        vjezbe: [{
                vjezba: 2,
                tezina: 20,
                ponavljanja: 30
            }]
    }
]