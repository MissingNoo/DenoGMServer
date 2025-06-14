ui = new window(global.game_uis.rooms);
ui.fit_to_gui();
roundness_x = AirLibRoundX;
roundness_y = AirLibRoundY; 
room_list_offset = 53;
room_list_h = 50;
room_list_title_x = 15;
room_list_title_y = 5;
room_list_title_scale = 1;
room_list_btn_x = 120;
room_list_btn_y = 10;
room_list_btn_w = 110;
room_list_btn_h = 32;
room_list_online_x = 5;
room_list_online_y = 25;
room_list_scroll = 0;
scrolltime = 0;
code_input = new textbox();
code_input.textcolor = "c_white";
code_input.only_numbers = false;
code_input.backtext = "Code Here";
code_button = new button("Join Lobby");
code_button.set_function(method(self, function() {
	new packet("joinCode").write("roomCode", code_input.text).send();
}));
reload_button = new button("R");
reload_button.set_function(function() {
    new packet("getRoomList").send();
});
bg = AirLibBG;
fg = AirLibFG;
roomsurf = undefined;
dbg = dbg_view("Join", false, 10, 10);
create_view_from_instance(self);
room_list = undefined;

quit_button = new button("X");
quit_button.set_function(method(self, function() {
    instance_activate_object(oMainMenu);
    instance_destroy(self);
}));

new packet("getRoomList").send();