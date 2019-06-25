module.exports =
{
    registerAccount: function(player){
        player.data.money = 500;
        player.position = new mp.Vector3(15, 15, 71);
        player.health = 100;
        player.armour = 0;
        player.loggedInAs = player.name;
    },
    saveAccount: function(player){
        gm.mysql.handle.query('UPDATE `accounts` SET money = ?, corX = ?, corY = ?, corZ = ?, hp = ?, armour = ? WHERE login = ?', [player.data.money, player.position.x.toFixed(2), player.position.y.toFixed(2), player.position.z.toFixed(2), player.health, player.armour, login], function(err, res, row){
            if(err) console.log(err);
        });
    },
    loadAccount: function(player){
        gm.mysql.handle.query('SELECT * FROM `accounts` WHERE login = ?', [login], function(err, res, row){
            if(err) console.log(err);
            if(res.length){
                res.forEach(function(playerData){
                    player.name = playerData.login;
                    player.data.money = playerData.money;
                    player.position = new mp.Vector3(playerData.corX, playerData.corY, playerData.corZ);
                    player.health = playerData.hp;
                    player.armour = playerData.armour;
                    player.loggedInAs = playerData.login;
                });
            }
        });
        console.log('${login} вошёл');
    }
}
