const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let results = await db.all();
        return res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
        return { message: 'Something went wrong, please try again.' }
    }
});

router.get('/:id', async (req, res) => {
    try {
        let results = await db.one(req.params.id);
        return res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
        return { message: 'Something went wrong, please try again.' }
    }
});

router.post('/create', async (req, res) => {
    try {
        await db.create(req.body);
        return res.json({ message: 'Successfully added a new note!' })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
        return { message: 'Something went wrong, please try again.' }
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await db.update(req.params.id, req.body);
        return res.json({ message: 'Successfully updated note!' })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
        return { message: 'Something went wrong, please try again.' }
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await db.delete(req.params.id);
        return res.json({ message: 'Successfully deleted note!' })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
        return { message: 'Something went wrong, please try again.' }
    }
});

module.exports = router;