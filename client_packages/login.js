var loginBrowser = mp.browsers.new("package://login/index.html");
mp.gui.cursor.show(true, true);

mp.events.add("loginDataToServer", (user, pass, state) => {
    mp.events.callRemote("sendDataToServer", user, pass, state);
});

var test = 0
mp.keys.bind(0x71, true, function() {
    if(test == 0){
    mp.events.callRemote('keypress:F2');
    loginBrowser.destroy();
    mp.gui.chat.push("Вы вошли!");
    mp.gui.chat.activate(true);
    mp.gui.cursor.show(false, false);
    test = 1;
    }else{
    loginBrowser.reload();
    test = 0;
    mp.gui.chat.push("Test");
    }
});


mp.events.add("loginHandler", (handle) => {
    switch(handle){
        case "success":
        {
            loginBrowser.destroy();
            mp.gui.chat.push("Вы вошли!");
            mp.gui.chat.activate(true);
            mp.gui.cursor.show(false, false);
            break;
        }
        case "registered":
        {
            loginBrowser.destroy();
            mp.gui.chat.push("Вы зарегистрировались!");
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