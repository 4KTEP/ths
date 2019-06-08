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
        gm.mysql.handle.query('UPDATE `accounts` SET money = ?, posX = ?, posY = ?, posZ = ?, health = ?, armour = ? WHERE login = ?', [player.data.money, player.position.x.toFixed(2), player.position.y.toFixed(2), player.position.z.toFixed(2), player.health, player.armour, login], function(err, res, row){
            if(err) console.log(err);
        });
    },
    loadAccount: function(player){
        gm.mysql.handle.query('SELECT * FROM `accounts` WHERE login = ?', [login], function(err, res, row){
            if(err) console.log(err);
            if(res.length){
                res.forEach(function(playerData){
                    player.name = playerData.username;
                    player.data.money = playerData.money;
                    player.position = new mp.Vector3(playerData.posX, playerData.posY, playerData.posZ);
                    player.health = playerData.health;
                    player.armour = playerData.armour;
                    player.loggedInAs = playerData.username;
                });
            }
        });
        console.log('${login} вошёл');
    }
}
