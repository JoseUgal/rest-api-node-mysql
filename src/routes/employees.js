const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


// SELECCIONAMOS TODOS LOS USUARIOS
router.get('/', (req, res) => {

    let strQuery = 'SELECT * FROM usuario';

    mysqlConnection.query(strQuery, (err, rows, fields) => {

        if (err) {
            console.log(err);
            return;
        }

        res.json(rows);

    });

});

// SELECCIONAMOS USUARIO POR ID
router.get('/:dni', (req, res) => {

    let strQuery = 'SELECT * FROM usuario where dni = ?';
    const { dni } = req.params;

    mysqlConnection.query(strQuery, [dni], (err, rows, fields) => {

        if (err) {
            console.log(err);
            return;
        }

        res.json(rows[0]);

    });

});

// INSERTAMOS UN USUARIO
router.post('/', (req, res) => {

    const { accion, nombre, apellido, email, pass, dni, telefono, lenguajes, is_admin } = req.body;

    let strQuery = `
        CALL usuarioAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    mysqlConnection.query(strQuery, [accion, nombre, apellido, email, pass, dni, telefono, lenguajes, is_admin],
        (err, rows, fields) => {

            if (err) {
                console.log(err);
                return;
            }

            res.json({
                status: 'User Saved'
            });

        });

});

// MODIFICAMOS UN USUARIO
router.put('/:dni', (req, res) => {

    const { accion, nombre, apellido, email, pass, telefono, lenguajes, is_admin } = req.body;
    const { dni } = req.params;

    let strQuery = `
        CALL usuarioAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    mysqlConnection.query(strQuery, [accion, nombre, apellido, email, pass, dni, telefono, lenguajes, is_admin],
        (err, rows, fields) => {

            if (err) {
                console.log(err);
                return;
            }

            res.json({
                status: 'User Updated'
            });

        });

});

// BORRAMOS EL USUARIO
router.delete('/:dni', (req, res) => {

    const { dni } = req.params;
    mysqlConnection.query('DELETE FROM usuario WHERE dni = ?;', [dni], (err, rows, fields) => {

        if (err) {
            console.log(err);
            return;
        }

        res.json({ status: 'User deleted' });

    });

});

module.exports = router;