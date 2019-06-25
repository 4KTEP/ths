






/*-----------------------------commands--------------------------------*/
mp.events.addCommand('hp', (player, hp) => {
    var $hp = parseInt(hp);
    if(1 <= $hp){
        player.health = $hp;
    }else{
        player.outputChatBox("Введены некоректные данные (1-100)");
    }
});

mp.events.addCommand('armour', (player, armour) => {
    var $armour = parseInt(armour);
        player.armour = $armour
});

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
	let weaponHash = mp.joaat(weapon);
	player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
});

let spawnPointsDeath = require ('./spawn_death.json'). SpawnDeath;

mp.events.add ('playerDeath', (player) => {
    player.spawn (spawnPointsDeath [Math.floor (Math.random () * spawnPointsDeath.length)]);
    player.health = 100;
});

mp.events.addCommand('xyz', (player) => {
    player.outputChatBox(`X: ${player.position.x.toFixed(2)} Y: ${player.position.y.toFixed(2)} Z: ${player.position.z.toFixed(2)}`);
});

mp.events.addCommand('car', (player, car) => {
    let mycar = mp.joaat(car)
    mp.vehicles.new(mycar, new mp.Vector3(player.position.x, player.position.y + 4, player.position.z),
    {
        heading: -180,
        numberPlate: "Kolya",
        alpha: 10,
        color: [[254,248,230],[254,248,230]],
        locked: false,
        engine: false,
        dimension: 0
    });
})

mp.events.addCommand ('fullcmd', (player) => {
    player.outputChatBox("/hp '1-100' - выдаёт ХП");
    player.outputChatBox("/armour '0-100' - выдаёт броню");
    player.outputChatBox("/car 'название машины' - спавнит рядом авто");
    player.outputChatBox("/weapon 'название оружие' - выдаёт оружие");
});











/*
mp.events.addCommand('respawn', (player) => {
    player.health = 0;
});

mp.events.addCommand('respawn', (player) => {
    player.health = 0;
});

mp.events.addCommand('respawn', (player) => {
    player.health = 0;
}); 
*/ 
