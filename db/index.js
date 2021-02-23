const mysql = require('mysql');
require('dotenv').config();


const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

let notesDB = {};

//GET - Get ALL NOTES
//?limit=20&start=0&order=desc
notesDB.all = (limit, start, order) => {

    let limitBy = limit ? parseInt(limit) : 184467440737
    let startWith = start ? parseInt(start) : 0
    let orderBy = order === 'asc' ? 'SELECT * FROM notes ORDER BY updated_at ASC' : 'SELECT * FROM notes ORDER BY updated_at DESC'

    return new Promise((resolve, reject) => {

        pool.query(orderBy + ' LIMIT ?,?', [startWith, limitBy], (err, results) => {
            if (err) {
                reject(err, { message: 'Unable to retrieve all notes!' })
            }
            return resolve(results, { message: 'Successfully retrieved all notes!' })
        });
    })
};

//GET - Get Note by Id
notesDB.one = (id) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM notes WHERE ID=?', [id], (err, results) => {
            if (err) {
                return reject(err, { message: 'Unable to retrieve all notes!' })
            }
            return resolve(results, { message: 'Successfully retrieved all notes!' })
        });
    });
};

//POST - Create a new Note
//body 
// {
//     "text": 'A Note'
// }
notesDB.create = (body) => {

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO notes(text) VALUES (?);', [body.text], (err, results) => {
            if (err) {
                return reject(err, { message: 'Unable to add a new note!' })
            }
            return resolve({ message: 'Successfully added a new note!' })
        });
    });
};

//PUT - Update Exisiting Note
//body
// {
//     "text": 'A Note'
// }
notesDB.update = (id, body) => {
    let noteId = parseInt(id)
    return new Promise((resolve, reject) => {
        pool.query('UPDATE notes SET text=? WHERE id=?;', [body.text, noteId], (err, results) => {
            if (err) {
                return reject(err, { message: 'Unable to update note!' })
            }
            return resolve(results, { message: 'Successfully updated note!' })
        });
    });
};

//DELETE - Delete Exisiting Note
notesDB.delete = (id) => {
    let noteId = parseInt(id)
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM notes WHERE id=?;', [noteId], (err, results) => {
            if (err) {
                return reject(err, { message: 'Unable to deleted note!' })
            }
            return resolve(results, { message: 'Successfully deleted note!' })
        });
    });
};

module.exports = notesDB;