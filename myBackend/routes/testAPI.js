// Hosts: 10.0.0.180, postgres
// databases: postgres, equinox
// schemas: capstone, sandbox
// const host = '10.0.0.180';
const host = 'pg.eqxnutra.com';
// const database = 'postgres';
const database = 'equinox';
// const schema = 'capstone';
const schema = 'sandbox';
let express = require('express');
let router = express.Router();
let app = express();
// const port = 5001;
const port = 5001;

app.use(express.json());
app.get('/', (request, response, next) => response.send({ body: 'Hello, world!' }));
app.get('/newEndpoint', (request, response) => response.send({ data: 'This is my new endpoint' }));
app.get('/getWeatherAmericanFork', (request, response, next) => {
    request.send('http://api.weatherstack.com/current?access_key=d7b8c15d0487d8af9e38ff3ab26a9095&query=American%20Fork', (err, res, body) => {
        if (!e && res.statusCode === 200) {
            let parsedBody = JSON.parse(body);
            let temperature = parsedBody['current']['temperature'];
            response.send({ temperature });
        }
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));

router.get('/', (request, response, next) => {
    response.send('API is working properly');
});

module.exports = router;

function setUpPool() {
    const Pool = require('pg').Pool;
    const pool = new Pool({
        user: 'postgres',
        host: host,
        database: database,
        password: '',
        port: 5432,
    });

    return pool;
}

/*====================================================================
 |                        Flashcard Endpoints                        |
 ==================================================================*/
/* GET */
app.get('/getCardsByUser', function (request, response) {
    let data = request.headers;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                SELECT    id,
                          deck_id,
                          card_num,
                          english,
                          chinese,
                          pinyin
                 FROM     ${schema}.cards
                 WHERE    creator = '${data.creator}'
                 ORDER BY id ASC`,
            function (error, results) {

                if (error) {
                    console.log(error);
                    reject(err);
                }

                response.send(results.rows);
            });
    });
});

app.get('/getDecksByUser', function (request, response) {
    let data = request.headers;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                SELECT    deck_id,
                          deck_name
                FROM      ${schema}.decks
                WHERE     creator = '${data.creator}'
                ORDER BY  deck_id ASC`,
            function (error, results) {

                if (error) {
                    reject(error);
                }
                console.log('Hitting testAPI');
                response.send(results.rows);
            });
    });
});

app.get('/getLatestDeckID', function (request, response) {
    new Promise(function (resolve, reject) {
        setUpPool().query(`
                SELECT      deck_id
                FROM        ${schema}.decks
                ORDER BY    deck_id DESC
                LIMIT       1`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send(results.rows[0]);
            });
    });
});

/* POST */
app.post('/addCard', function (request, response) {
    let data = request.body;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                  INSERT INTO ${schema}.cards
                            (creator,
                             deck_id,
                             card_num,
                             english,
                             chinese,
                             pinyin)
                  VALUES    ('${data.creator}',
                              ${data.deckID},
                              ${data.cardNum},
                             '${data.english}',
                             '${data.chinese}',
                             '${data.pinyin}')`,
            function (error, results) {
                if (error) {
                    reject(error);
                }

                response.send(results);
            });
    });
});

app.post('/createDeck', function (request, response) {
    let data = request.body;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                INSERT INTO ${schema}.decks
                            (creator,
                            deck_name)
                VALUES      ('${data.creator}',
                             '${data.deckName}')`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send(results);
            });
    });
});

app.post('/deleteDeck', function (request, response) {
    let data = request.body;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                DELETE FROM ${schema}.decks
                WHERE       deck_id = ${data.deck_id}`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send();
            });
    });

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                DELETE FROM ${schema}.cards
                WHERE       deck_id = ${data.deck_id}`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send();
            });
    });
});

app.post('/editCard', function (request, response) {
    let data = request.body;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                UPDATE  ${schema}.cards
                SET     english = '${data.english}',
                        chinese = '${data.chinese}',
                        pinyin = '${data.pinyin}'
                WHERE   id = ${data.card_id}`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
            });
    });
});

app.post('/updateDeckName', function (request, response) {
    let data = request.body;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                UPDATE  ${schema}.decks
                SET     deck_name = '${data.deck_name}'            
                WHERE   deck_id = ${data.deck_id}`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send();
            });
    });
});

/*===============================================================
 |                        User Endpoints                        |
 =============================================================*/
/* GET */
app.get('/getEmails', function (request, response) {
    new Promise(function (resolve, reject) {
        setUpPool().query(`
                SELECT   email
                FROM     ${schema}.users
                ORDER BY username ASC`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send(results.rows);
            });
    });
});

app.get('/getUserInfo', function (request, response) {
    let data = request.headers;

    new Promise(function (resolve, reject) {
        setUpPool().query(`
                SELECT  id,
                        first_name,
                        last_name,
                        email,
                        username,
                        password
                FROM    ${schema}.users
                WHERE   username = '${data.username}'`, function (error, results) {
            if (error) {
                console.log(error);
                reject(error);
            }

            response.send(results.rows[0]);
        });
    });
});

app.get('/getUsers', function (request, response) {
    new Promise(function (resolve, reject) {
        setUpPool().query(`
                SELECT      username,
                            email
                FROM        ${schema}.users
                ORDER BY    username ASC`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send(results.rows);
            });
    });
});

app.get('/getUsernames', function (request, response) {
    new Promise(function (resolve, reject) {
        setUpPool().query(`
                SELECT      username
                FROM        ${schema}.users
                ORDER BY    username ASC`,
            function (error, results) {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                response.send(results.rows);
            });
    });
});

/* POST */
app.post('/signup', function (request, response) {
    let data = request.body;
    console.log(data);
    new Promise(function (resolve, reject) {
        setUpPool().query(`
                INSERT INTO ${schema}.users
                            (first_name,
                             last_name,
                             email,
                             username,
                             password)
                VALUES      ('${data.firstName}',
                             '${data.lastName}',
                             '${data.email}',
                             '${data.username}',
                             '${data.password}')`,
            function (error, results) {
                if (error) {
                    reject(error);
                }

                response.send('ok');
            });
    });
});


/*****************************************************************************************************************************************/

// /*====================================*
//  *             Tutorial #2             *
//  *====================================*/
// let request = require('request');

app.get('/getWeatherAmericanFork', (request, response, next) => {
    req('http://api.weatherstack.com/current?access_key=d7b8c15d0487d8af9e38ff3ab26a9095&query=American%20Fork', (err, res, body) => {
        if (!e && res.statusCode === 200) {
            let parsedBody = JSON.parse(body);
            let temperature = parsedBody['current']['temperature'];
            response.send({ temperature });
        }
    });
});
