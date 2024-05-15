//console.log(require('crypto').randomBytes(256).toString('hex'));
(async () => {
    const bcrypt = require('bcrypt');
    console.log(await bcrypt.hash('admin', 10));
})();