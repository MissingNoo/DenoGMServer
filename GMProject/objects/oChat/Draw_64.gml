ui.foreach(function(name, pos, data) {
	AirUIArea;
	switch (name) {
		case "messages":
			chatsurf = surface_recreate(chatsurf, _w, _h);
			surface_set_target(chatsurf);
			draw_clear_alpha(c_black, 0);
			for (var offset = 0, i = 0; i < array_length(chat); i++) {
				var msg = chat[i];
				var strh = string_height(msg.message);
				scribble($"{msg.player}: {msg.message}").draw(2, over + offset);
				if (mouse_in_area_gui([_x, _y, _x + _w, _y + _h]) and mouse_in_area_gui([_x + 2, _y + over + offset, _x + 2 + string_height(msg.player), _y + over + offset + strh]) and device_mouse_check_button_pressed(0, mb_right)) {
					player_context_menu(msg.player);
				}
				offset += strh + 2;
				if (over + offset > _h) {
					over--;
				}
			}
			surface_reset_target(); 
			draw_surface(chatsurf, _x, _y);
			break;
		case "text_input":
			text_input.position_area(area);
			text_input.draw();
			break;
	}
});