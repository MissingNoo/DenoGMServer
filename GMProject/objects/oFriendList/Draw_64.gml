ui.foreach(function(name, pos, data) {
	AirUIArea;
	switch (name) {
		case "title":
			scribble("[fa_center][fa_middle]Friends list").scale(2).draw(_x + _w / 2, _y + _h / 2);
			break;
		case "friend_list":
			fsurf = surface_recreate(fsurf, _w, _h);
			surface_set_target(fsurf);
			draw_clear_alpha(c_black, 0);
			for (var offset = 0, i = 0; i < array_length(AirNet.friendlist); i++) {
				var friend = AirNet.friendlist[i];
				scribble(friend).draw(10, offset);
				var mx = device_mouse_x_to_gui(0) - _x;
				var my = device_mouse_y_to_gui(0) - _y;
				if (!instance_exists(oContextMenu) and device_mouse_check_button_pressed(0, mb_left) and point_in_rectangle(mx, my, 10, offset, 10 + string_width(friend), offset + string_height(friend))) {
					friend_context_menu(friend);
				}
				offset += string_height(friend);
			}
			surface_reset_target();
			draw_surface_stretched(fsurf, _x, _y, _w, _h);
			break;
	} 
});