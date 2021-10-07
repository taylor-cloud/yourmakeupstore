const db = require('../models');

// Véase ../controllers/users.js

// Lista todas las regiones.
exports.listRegions = () => {
    return db.Region.findAll();
}