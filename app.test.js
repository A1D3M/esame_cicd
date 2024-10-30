const request = require('supertest');
const { app, server } = require('./app');

beforeAll((done) => {
    done();
});

afterAll((done) => {
    server.close(() => {
        console.log("Server chiuso dopo i test");
        done();
    });
});

describe('Test degli endpoint dell\'API libri', () => {
    it('La GET /api/libri dovrebbe restituire tutti i libri', async () => {
        const response = await request(app).get('/api/libri');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); 
    });

    it('La POST /api/libri dovrebbe aggiungere un nuovo libro', async () => {
        const nuovoLibro = {
            nome: 'La Metamorfosi',
            descrizione: 'Racconto di trasformazione',
            quantita: 5,
            prezzo: 15.99,
            autore: 'Franz Kafka'
        };
        const response = await request(app).post('/api/libri').send(nuovoLibro);
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(nuovoLibro);
    });

    it('La GET /api/libri/:codice dovrebbe restituire un libro specifico', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'I Promessi Sposi',
            descrizione: 'Romanzo storico italiano',
            quantita: 10,
            prezzo: 12.50,
            autore: 'Alessandro Manzoni'
        });
        const codice = responsePost.body.codice;

        const response = await request(app).get(`/api/libri/${codice}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            nome: 'I Promessi Sposi',
            descrizione: 'Romanzo storico italiano',
            quantita: 10,
            prezzo: 12.50,
            autore: 'Alessandro Manzoni'
        });
    });

    it('La DELETE /api/libri/:codice dovrebbe eliminare un libro specifico', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Il Gattopardo',
            descrizione: 'Declino dell\'aristocrazia siciliana',
            quantita: 3,
            prezzo: 18.75,
            autore: 'Giuseppe Tomasi di Lampedusa'
        });
        const codice = responsePost.body.codice;

        const deleteResponse = await request(app).delete(`/api/libri/${codice}`);
        expect(deleteResponse.statusCode).toBe(204);

        const getResponse = await request(app).get(`/api/libri/${codice}`);
        expect(getResponse.statusCode).toBe(404);
    });

    it('La GET /api/libri/:codice/incrementa dovrebbe incrementare la quantità del libro', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Il Deserto dei Tartari',
            descrizione: 'Attesa del nemico',
            quantita: 4,
            prezzo: 14.20,
            autore: 'Dino Buzzati'
        });
        const codice = responsePost.body.codice;

        const incrementResponse = await request(app).get(`/api/libri/${codice}/incrementa`);
        expect(incrementResponse.statusCode).toBe(200);
        expect(incrementResponse.body.quantita).toBe(5);
    });

    it('La GET /api/libri/:codice/decrementa dovrebbe decrementare la quantità del libro', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Il Piccolo Principe',
            descrizione: 'Favola filosofica',
            quantita: 6,
            prezzo: 9.99,
            autore: 'Antoine de Saint-Exupéry'
        });
        const codice = responsePost.body.codice;

        const decrementResponse = await request(app).get(`/api/libri/${codice}/decrementa`);
        expect(decrementResponse.statusCode).toBe(200);
        expect(decrementResponse.body.quantita).toBe(5); 
    });
});
