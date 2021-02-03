// let express = require('express');
// let router = express.Router();
// let bodyParser = require('body-parser');
// let app = express();


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded());
// app.use(express.json());
// app.get('/', (req, res, next) => res.send({ body: 'Hello, world!' }));
// app.get('/newEndpoint', (req, res) => res.send({ data: 'This is my new endpoint' }));
// app.get('/getWeatherAmericanFork', (req, res, next) => {
//     req.send('http://api.weatherstack.com/current?access_key=d7b8c15d0487d8af9e38ff3ab26a9095&query=American%20Fork', (err, res, body) => {
//         if (!e && res.statusCode === 200) {
//             let parsedBody = JSON.parse(body);
//             let temperature = parsedBody['current']['temperature'];
//             res.send({ temperature });
//         }
//     });
// });
// app.listen(port, () => console.log(`Example app listening on port ${port}`));

// router.get('/', (req, res, next) => {
//     res.send('API is working properly');
// });

// module.exports = router;

// /*====================================================================
//  |                        Flashcard Endpoints                        |
//  ==================================================================*/
// /* GET */
// app.get('/getCardsByDeckID', (req, res) => {
//     let data = req.query;

//     const Pool = require('pg').Pool;
//     const pool = new Pool({
//         user: 'postgres',
//         host: '10.0.0.180',
//         database: 'postgres',
//         password: '',
//         port: 5432,
//     });

//     new Promise((results, rej) => {
//         pool.query(`SELECT  id,
//                           deck_id,
//                           card_num,
//                           english,
//                           chinese,
//                           pinyin
//                    FROM   capstone.cards
//                    WHERE  deck_id = '${data.deckID}'`, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 rej(err);
//             }
//             res.send(results.rows);
//         });
//     });
// });

// app.get('/getCardsByUser', (req, res) => {
//     let data = req.query;
//     const Pool = require('pg').Pool;
//     const pool = new Pool({
//         user: 'postgres',
//         host: '10.0.0.180',
//         database: 'postgres',
//         password: '',
//         port: 5432,
//     });

//     new Promise((results, rej) => {
//         pool.query(`SELECT  id,
//                           deck_id,
//                           card_num,
//                           english,
//                           chinese,
//                           pinyin
//                    FROM   capstone.cards
//                    WHERE  creator = '${data.creator}'`, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 rej(err);
//             }

//             let rows = results.rows;
//             res.send(rows);
//         });
//     });
// });

// app.get('/getDecksByUser', (req, res) => {
//     let data = req.query;

//     const Pool = require('pg').Pool;
//     const pool = new Pool({
//         user: 'postgres',
//         host: '10.0.0.180',
//         database: 'postgres',
//         password: '',
//         port: 5432,
//     });

//     new Promise((results, rej) => {
//         pool.query(`SELECT  deck_id,
//                           deck_name
//                   FROM    capstone.decks
//                   WHERE   creator = '${data.creator}'`,
//             (err, results) => {
//                 if (err) {
//                     console.log(err);
//                     rej(err);
//                 }

//                 let rows = results.rows;
//                 res.send(rows);
//             });
//     });
// });

// app.get('/getLatestDeckID', (req, res) => {
//     let data = req.query;

//     const Pool = require('pg').Pool;
//     const pool = new Pool({
//         user: 'postgres',
//         host: '10.0.0.180',
//         database: 'postgres',
//         password: '',
//         port: 5432,
//     });

//     new Promise((results, rej) => {
//         pool.query(`SELECT      deck_id
//                   FROM        capstone.decks
//                   WHERE       creator = '${data.creator}'
//                   ORDER BY    deck_id DESC
//                   LIMIT       1`, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 rej(err);
//             }
//             let data = results.rows;
//             console.log(results);
//             res.send(data[0]);
//         });
//     });
// });

// app.get('/getReviewDeck', (req, res) => {
//     let data = req.query;
//     const Pool = require('pg').Pool;
//     const pool = new Pool({
//         user: 'postgres',
//         host: '10.0.0.180',
//         database: 'postgres',
//         password: '',
//         port: 5432,
//     });

//     new Promise((results, rej) => {
//         pool.query(`SELECT  deck_id,
//                           creator,
//                           deck_name
//                   FROM    capstone.decks
//                   WHERE   deck_id = ${data.deck_id}`, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 rej(err);
//             }
//             let data = results.rows;
//             res.send(data[0]);
//         });
//     });
// });

// /* POST */
// app.post('/addCard', (req, res) => {
//     let data = req.body;
//     const Pool = require('pg').Pool;
//     const pool = new Pool({
//         user: 'postgres',
//         host: '10.0.0.180',
//         database: 'postgres',
//         password: '',
//         port: 5432,
//     });

//     new Promise((results, rej) => {
//         pool.query(`INSERT INTO capstone.cards
//                               (creator,
//                                deck_id,
//                                card_num,
//                                english,
//                                chinese,
//                                pinyin)
//                     VALUES    ('${data.creator}',
//                                 ${data.deckID},
//                                 ${data.cardNum},
//                                '${data.english}',
//                                '${data.chinese}',
//                                '${data.pinyin}')`, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 rej(err);
//             }
//         });
//     });
// });

// app.post('/createDeck', (req, res) => {
//     let data = req.body;

//     const Pool = require('pg').Pool;
//     const pool = new Pool({
//         user: 'postgres',
//         host: '10.0.0.180',
//         database: 'postgres',
//         password: '',
//         port: 5432,
//     });

//     new Promise((results, rej) => {
//         pool.query(`INSERT INTO capstone.decks
//                               (creator,
//                               deck_name)
//                   VALUES      ('${data.creator}',
//                                '${data.deckName}')`, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 rej(err);
//             }
//         });
//     });
// });