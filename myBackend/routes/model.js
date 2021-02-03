const Pool = require('pg').Pool
const pool = new Pool({
    host: 'pg.eqxnutra.com',
    database: 'equinox',
    password: 'Nutra20!P@nd4',
    port: 5432,
});

const getAll = async () => {
    return await new Promise((res, rej) => {
        pool.query('SELECT * FROM equivoice.users ORDER BY user_id ASC', (e, results) => {
            if (e) {
                rej(e);
            } else {
                res(results.rows);
            }
        });
    });
}