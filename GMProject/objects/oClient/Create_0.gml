x = 10;
y = 10;
count = 0;
lastroom = "test";
global[$ "con"] ??= new connection("127.0.0.1", 36692, network_socket_udp);
global.con.connect();
players_in_room = [];
mx = mouse_x;
my = mouse_y;
ui = new window(global.game_uis.main_menu);
ui.fit_to_gui();
options = ["create", "join", "settings", "quit"];
option_data = {};
for (var i = 0; i < array_length(options); i += 1) {
    option_data[$ options[i]] = {
        height : 30,
        __y : 0
    }
}