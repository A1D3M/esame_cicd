const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let libri = [
    {
        codice: uuidv4(),
        nome: 'Odissea',
        descrizione: 'Epica avventura',
        quantita: 12,
        prezzo: 22.00,
        autore: 'Omero'
    },
    {
        codice: uuidv4(),
        nome: 'Divina Commedia',
        descrizione: 'Viaggio nell\'aldilà',
        quantita: 5,
        prezzo: 35.50,
        autore: 'Dante Alighieri'
    },
    {
        codice: uuidv4(),
        nome: 'Il Principe',
        descrizione: 'Manuale politico',
        quantita: 8,
        prezzo: 18.99,
        autore: 'Niccolò Machiavelli'
    },
    {
        codice: uuidv4(),
        nome: 'Guerra e Pace',
        descrizione: 'Romanzo storico',
        quantita: 3,
        prezzo: 45.00,
        autore: 'Lev Tolstoj'
    },
    {
        codice: uuidv4(),
        nome: '1984',
        descrizione: 'Distopia orwelliana',
        quantita: 10,
        prezzo: 14.99,
        autore: 'George Orwell'
    },
    {
        codice: uuidv4(),
        nome: 'Il Vecchio e il Mare',
        descrizione: 'Racconto di perseveranza',
        quantita: 7,
        prezzo: 10.50,
        autore: 'Ernest Hemingway'
    },
    {
        codice: uuidv4(),
        nome: 'Orgoglio e Pregiudizio',
        descrizione: 'Classico romantico',
        quantita: 6,
        prezzo: 13.50,
        autore: 'Jane Austen'
    },
    {
        codice: uuidv4(),
        nome: 'Moby Dick',
        descrizione: 'La caccia alla balena bianca',
        quantita: 4,
        prezzo: 25.00,
        autore: 'Herman Melville'
    },
    {
        codice: uuidv4(),
        nome: 'Il Nome della Rosa',
        descrizione: 'Mistero medievale',
        quantita: 9,
        prezzo: 19.90,
        autore: 'Umberto Eco'
    },
];


app.get('/api/libri', (req, res) => res.json(libri));

app.get('/api/libri/:codice', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    libro ? res.json(libro) : res.status(404).json({ error : "Libro non trovato" });
});

app.post('/api/libri', (req, res) => {
    const { nome, descrizione, quantita, prezzo, autore } = req.body;
    const nuovoLibro = { codice : uuidv4(), nome, descrizione, quantita, prezzo, autore };
    libri.push(nuovoLibro);
    res.status(201).json(nuovoLibro);
});

app.delete('/api/libri/:codice', (req, res) => {
    const index = libri.findIndex(l => l.codice === req.params.codice);
    if (index !== -1) {
      libri.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(404).json({ error : "Libro non trovato" });
    }
});

app.get('/api/libri/:codice/incrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
      libro.quantita += 1;
      res.json(libro);
    } else {
      res.status(404).json({ error : "Libro non trovato" });
    }
});

app.get('/api/libri/:codice/decrementa', (req, res) => {
   const libro = libri.find(l => l.codice === req.params.codice);
   if (libro) {
      libro.quantita = Math.max(libro.quantita - 1, 0);
      res.json(libro);
   } else {
      res.status(404).json({ error : "Libro non trovato" });
   }
});

const server = app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));

module.exports = { app, server };