if (room != rUIEditor) {
	//display_set_gui_size(window_get_width(), window_get_height());
}

if (keyboard_check_pressed(ord("Z"))) {
	debug_rooms();
}
if (keyboard_check_pressed(vk_f1)) {
    dbglog = !dbglog;
	show_debug_log(dbglog);
}
if (keyboard_check_pressed(vk_f2)) {
	new packet("joinRoom").write("roomName", lastroom).send();
}
if (keyboard_check_pressed(ord("R"))) {
	AirNet.connection.reconnect();
	alarm[0] = 120;
	count = 0;
}
//if (keyboard_check_pressed(vk_f2)) {
//    var json = {
//		type : "leaveRoom"
//	}
//	new msg().write(json_stringify(json)).send();
//}
if (mx != mouse_x or my != mouse_y) {
    mx = mouse_x;
	my = mouse_y;
	with (oOtherPlayer) {
	    if (uuid == AirNet.connection.uuid) {
		    player.x = mouse_x;
		    player.y = mouse_y;
		}
	}
	if (AirNet.connection.current_room != "") {
	    new packet("movePlayer").write("x", mx).write("y", my).send();
	}
}