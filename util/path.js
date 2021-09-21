const path = require('path');

// Obtención de path actual.

const pth = path.dirname(require.main.filename);

module.exports = pth;