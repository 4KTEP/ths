require('./login.js')

global.gm = {};

gm.mysql = require('./login.js');
gm.auth = require('./auth.js');

gm.mysql.connect(function() { });


