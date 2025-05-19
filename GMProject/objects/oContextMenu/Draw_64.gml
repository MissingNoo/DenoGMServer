ui.foreach(function(name, pos, data) {
	AirUIArea;
	switch (name) {
		case "title":
			scribble($"[fa_center][fa_middle][c_black]{title}").fit_to_box(_w, _h).draw(_x + _w / 2, _y + _h / 2);
			break;
		case "list":
			offset = 0;
			for (var i = 0; i < array_length(buttons); i++) {
				e = buttons[i];
				e.position(_x, _y + offset, _x + _w, _y + offset + button_height);
				offset += button_height + 5;
				e.draw();
			}
			if (device_mouse_check_button_released(0, mb_left) and mouse_in_area_gui(area)) {
				instance_destroy();
			}
			break;
	}
});