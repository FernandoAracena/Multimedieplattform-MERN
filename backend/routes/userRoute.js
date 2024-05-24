import express from 'express';
import {User} from '../models/users.js';

const router =  express.Router();

router.post('/register', async (req, res) => {
    try {
        if(
            !req.body.name ||
            !req.body.email ||
            !req.body.password 
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: name, email, password',
            });
        }
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        const user = await User.create(newUser);

        return res.status(200).send(user);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        if(
            !req.body.email ||
            !req.body.password 
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: email, password',
            });
        } else {
            const {email, password} = req.body;
            User.findOne({email: email})
            .then(user => {
                if(user) {
                    if(user.password === password) {
                        res.json('success!')
                    } else {
                        res.json('Password is incorrect.')
                    }
                } else {
                    res.json('User doesnt exist.')
                }
            })
        }       
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;