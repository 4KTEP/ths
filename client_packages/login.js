var loginBrowser = mp.browsers.new("package://login/index.html");
mp.gui.cursor.show(true, true);

mp.events.add("loginDataToServer", (user, pass, state) => {
    mp.events.callRemote("sendDataToServer", user, pass, state);
});

mp.keys.bind(0x71, true, function() {
    mp.events.callRemote('keypress:F2');
    loginBrowser.destroy();
    mp.gui.chat.push("Это сервер за 150 рублей");
    mp.gui.chat.push("Сервер пока делается, поэтому есть недочеты");
    mp.gui.chat.push("Все доступные команды: /fullcmd");
    mp.gui.chat.activate(true);
    mp.gui.cursor.show(false, false);
});

mp.keys.bind(0x72, true, function() {
    mp.events.callRemote('keypress:F3');
    loginBrowser.reload()
    mp.gui.chat.push("Test");
    });

mp.events.add("loginHandler", (handle) => {
    switch(handle){
        case "success":
        {
            loginBrowser.destroy();
            mp.gui.chat.push("Все доступные команды: /fullcmd");
            mp.gui.chat.activate(true);
            mp.gui.cursor.show(false, false);
            break;
        }
        case "registered":
        {
            loginBrowser.destroy();
            mp.gui.chat.push("Это сервер за 150 рублей");
            mp.gui.chat.push("Сервер пока делается, поэтому есть недочеты");
            mp.gui.chat.push("Все доступные команды: /fullcmd");
            mp.gui.chat.activate(true);
            mp.gui.cursor.show(false, false);
            break;
        }
        case "incorrectinfo":
        {
            loginBrowser.execute(`$(".incorrect-info").show(); $("#loginBtn").show();`);
            break;
        }
        case "takeninfo":
        {
            loginBrowser.execute(`$(".taken-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "tooshort":
        {
            loginBrowser.execute(`$(".short-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "logged":
        {
            loginBrowser.execute(`$(".logged").show(); $("#loginBtn").show();`);
            break;
        }
        default:
        {
            break;
        }
    }
});