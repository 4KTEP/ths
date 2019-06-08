var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

module.exports =
{
    handle: null,

    connect: function(call){
        this.handle = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'thsrpg'
        });

        this.handle.connect(function (err){
            if(err){
                switch(err.code){
                    case "ECONNREFUSED":
                        console.log("\x1b[93m[MySQL] \x1b[97mОшибка: проверьте информацию о вашем соединении (packages/mysql/mysql.js) или убедитесь, что ваш сервер MySQL работает. \x1b[39m");
                        break;
                    case "ER_BAD_DB_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mОшибка: введенное вами имя базы данных не существует. \x1b[39m");
                        break;
                    case "ER_ACCESS_DENIED_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mОшибка: проверьте имя пользователя и пароль MySQL и убедитесь, что они верны. \x1b[39m");
                        break;
                    case "ENOENT":
                        console.log("\x1b[91m[MySQL] \x1b[97mОшибка: нет подключения к интернету. Проверьте соединение и попробуйте снова. \x1b[39m");
                        break;
                    default:
                        console.log("\x1b[91m[MySQL] \x1b[97mОшибка: " + err.code + " \x1b[39m");
                        break;
                }
            } else {
                console.log("\x1b[92m[MySQL] \x1b[97mУспешно подключен \x1b[39m");
            }
        });
    }
};

mp.events.add("sendDataToServer", (player, login, pass, state) => {
    let loggedAccount = mp.players.toArray().find(p => p.loggedInAs == login);
    switch(state){
        case 0: //Статус логинирование
        {
            if(loggedAccount){
                console.log("Уже зашли.");
                player.call("loginHandler", ["logged"]);
            } else {
                gm.mysql.handle.query('SELECT `password` FROM `accounts` WHERE `login` = ?', [login], function(err, res){
                    if(res.length > 0){
                        let sqlPassword = res[0]["password"];
                        bcrypt.compare(pass, sqlPassword, function(err, res2) {
                            if(res2 === true){  //Пароль правильный
                                player.name = username;
                                player.call("loginHandler", ["success"]);
                                gm.auth.loadAccount(player);
                            } else {    //Пароль не правильный
                                player.call("loginHandler", ["incorrectinfo"]);
                            }
                        });
                    } else {
                        player.call("loginHandler", ["incorrectinfo"]);
                    }
                });
            }
            break;
        }
        case 1: //Статус регистрации
        {
            if(login.length >= 3 && pass.length >= 5){
                gm.mysql.handle.query('SELECT * FROM `accounts` WHERE `login` = ?', [login], function(err, res){
                    if(res.length > 0){
                        player.call("loginHandler", ["takeninfo"]);
                    } else {
                        bcrypt.hash(pass, null, null, function(err, hash) {
                            if(!err){
                                gm.mysql.handle.query('INSERT INTO `accounts` SET login = ?, password = ?', [login, hash], function(err, res){
                                    if(!err){
                                        player.name = username;
                                        player.call("loginHandler", ["registered"]);
                                        gm.auth.registerAccount(player);
                                        console.log("\x1b[92m" + login + "\x1b[39m зарегистрировался.");
                                    } else {
                                        console.log("\x1b[31m[Ошибка] " + err)
                                    }
                                });
                            } else {
                                console.log("\x1b[31m[BCrypt]: " + err)
                            }
                        });
                    }
                });
            } else {
                player.call("loginHandler", ["tooshort"]);
            }            
            break;
        }
        default:
        {
            player.outputChatBox("Произошла ошибка, обратитесь к администратору сервера.")
            console.log("\x1b[31m[Ошибка] Состояние входа/регистрации не определено. Статус: " + state)
            break;
        }
    }
});

mp.events.add("playerQuit", (player) => {
    if(player.loggedInAs != ""){
        gm.auth.saveAccount(player);
    }
});

mp.events.add("playerJoin", (player) => {
    console.log(`${login} вошёл.`);
    player.loggedInAs = "";
});