//draw_set_alpha(0.5);
//draw_sprite_stretched(sJoin, 0, 0, 0, display_get_gui_width(), display_get_gui_height());
//draw_set_alpha(1);
ui.foreach(function(name, pos, data) {
    var spr = data[$ "image"] != undefined ? asset_get_index(data.image) : undefined;
    spr = (spr != undefined and spr != -1) ? spr : sBlank;
	var _x = pos.left, _y = pos.top, _w = pos.width, _h = pos.height;
	var area = [_x, _y, _x + _w, _y + _h];
    switch (name) {
		case "join_panel":
			draw_set_color(bg);
		    draw_roundrect_ext(_x, _y, _x + _w, _y + _h, roundness_x, roundness_y, false);
            draw_set_color(global.game_uis.button_bg);
		    draw_roundrect_ext(_x + _w - 20, _y - 20, _x + _w + 20, _y + 20, global.game_uis.roundx, global.game_uis.roundy, false);
			draw_set_color(c_white);
            quit_button.position(_x + _w - 20, _y - 20, _x + _w + 20, _y + 20);
            quit_button.draw();
			break;
		case "code_panel":
			draw_set_color(fg);
		    draw_roundrect_ext(_x, _y, _x + _w, _y + _h, roundness_x, roundness_y, false);
			draw_set_color(c_white);
			break;
		case "code_label":
			scribble($"[c_black][fa_middle]Join game from code").scale(room_list_title_scale).draw(_x + room_list_title_x, _y + _h / 2);
			break;
		case "join_label":
			scribble($"[c_black][fa_middle]Join game").scale(room_list_title_scale).draw(_x + room_list_title_x, _y + _h / 2);
			break;
		case "join_button":
			code_button.set_position_area(area);
			code_button.draw();
			break;
		case "filters":
			draw_set_color(fg);
		    draw_roundrect_ext(_x, _y, _x + _w, _y + _h, roundness_x, roundness_y, false);
			draw_set_color(c_white);
			break;
		case "code_input":
			draw_roundrect_ext(_x, _y, _x + _w, _y + _h, roundness_x, roundness_y, true);
			code_input.position(_x, _y, _x + _w, _y + _h);
			code_input.draw();
			break;
		case "room_panel":
			draw_set_color(fg);
		    draw_roundrect_ext(_x, _y, _x + _w, _y + _h, roundness_x, roundness_y, false);
			draw_set_color(c_white);
			break;
		case "room_list":
			if (mouse_in_area_gui(area)) {
				var newscroll = (-mouse_wheel_up() + mouse_wheel_down()) * 10;
			    room_list_scroll += newscroll;
				scrolltime = newscroll != 0 ? 5 : scrolltime;
			}
			scrolltime = clamp(scrolltime - 1, 0, 5);
			if (scrolltime == 0 and room_list_scroll > 0) {
			    room_list_scroll = lerp(room_list_scroll, 0, 0.1);
			}
			//draw_rectangle(_x, _y, _x + _w, _y + _h, true);
			roomsurf = surface_recreate(roomsurf, gui_x_percent(100), gui_y_percent(100));
			surface_set_target(roomsurf);
				draw_clear_alpha(c_black, 0);
				if (is_array(room_list)) {
				    for (var yoff = 0, i = 0; i < array_length(room_list); ++i) {
						var yy = _y + yoff + room_list_scroll;
						var r = room_list[i];
						r[$ "join_btn"] ??= new button("Join");
						r.join_btn.set_function(method(r, function() {
							new packet("joinRoom").write("roomName", name).send();
						}));
						r.join_btn.position(_x + _w - room_list_btn_x, yy + room_list_btn_y, _x + _w - room_list_btn_x + room_list_btn_w, yy + room_list_title_y + room_list_btn_h);
						draw_set_color(bg);
					    draw_roundrect_ext(_x, yy, _x + _w, yy + room_list_h, roundness_x, roundness_y, false);
						draw_set_color(c_white);
						scribble($"[c_black]{r.name}").scale(room_list_title_scale).draw(_x + room_list_title_x, yy + room_list_title_y);
						scribble($"[c_black][fa_middle][fa_right]{r.players}/{r.maxPlayers}").scale(room_list_title_scale).draw(_x + _w - room_list_btn_x - room_list_online_x, yy + room_list_online_y);
						r.join_btn.draw();
						yoff += room_list_offset;
					}
				}
			surface_reset_target();
			draw_surface_part_area(roomsurf, area);
			break;
        case "reload_button":
            reload_button.position(_x, _y, _x + _w, _y + _h);
            reload_button.draw();
		default:
			//if (string_contains(name, "grid")) {
			//    break;
			//}
			//draw_rectangle(_x, _y, _x + _w, _y + _h, true);
			break;
	}
});
