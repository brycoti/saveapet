const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");
const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo";

const login = async (req, res, Model) => {
    try {
        const { email, password } = req.body;
        const user = await Model.findOne({ where: { email } }); // Cerca l'usuari pel seu email

        if (!user) {
            return res.status(404).json({ error: 'User no trobat' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada 

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password incorrecte' });
        }

        const token = jwt.sign({ userId: user.id, userName: user.name }, SECRET_KEY, { expiresIn: '2h' }); // Genera un token JWT vàlid durant 2 hores
        res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie

        res.json({ name: user.name, id: user.id, already_logged: user.already_logged, home: user.home, other_pets: user.other_pets, age_range: user.age_range, kids_at_home: user.kids_at_home, ill_pets: user.ill_pets }); // 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createItem = async (req, res, Model) => {
    try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItems = async (req, res, Model) => {
    try {
        const items = await Model.findAll();
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItemsUser = async (req, res, Model) => {
    try {
        const item = await Model.findAll({ where: { userId: req.userId } })
        res.json(item)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
    readItemsUser,
    login
}  