
ui = new window(global.game_uis.main_menu);
ui.fit_to_gui();
options = ["singleplayer", "create", "join", "settings", "quit"];
option_data = {};
selected_size = 50;
unselected_size = 30;
min_size = 35;
base_offset = 7;
for (var i = 0; i < array_length(options); i += 1) {
    option_data[$ options[i]] = {
        height : 30,
        __y : 0,
		btn : new button(options[i])
    }
}

option_data.create.btn.set_function(function () {
    instance_create_depth(x, y, depth, oCreate);
	instance_deactivate_object(self);
});

option_data.join.btn.set_function(function() {
	instance_create_depth(x, y, depth, oJoin);
	instance_deactivate_object(self);
});

option_data[$ "quit"].btn.set_function(function() {
	game_end();
});

maxyy = 0;

dbg = dbg_view("Main Menu", false, 10, 10);
create_view_from_instance(self);