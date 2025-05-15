ui.foreach(function(name, pos, data) {
    var spr = data[$ "image"] != undefined ? asset_get_index(data.image) : undefined;
    spr = (spr != undefined and spr != -1) ? spr : sBlank;
	var _x = pos.left, _y = pos.top, _w = pos.width, _h = pos.height;
	var area = [_x, _y, _x + _w, _y + _h];
    switch (name) {
        case "create_label":
			scribble($"[c_black][fa_middle]Create game").scale(1).draw(_x + 0, _y + _h / 2);
			break;
        case "display_label":
			scribble($"[c_black][fa_middle]Join game").scale(1).draw(_x + 0, _y + _h / 2);
			break;
        case "request_label":
			scribble($"[c_black][fa_middle]Request to join:").scale(1).draw(_x + 0, _y + _h / 2);
			break;
        case "maxp_label":
			scribble($"[c_black][fa_middle]Max Players:").scale(1).draw(_x + 0, _y + _h / 2);
			break;
        case "type_label":
			scribble($"[c_black][fa_middle]Type:").scale(1).draw(_x + 0, _y + _h / 2);
			break;
        case "options_panel":
			draw_set_color(global.game_uis.fg);
		    draw_roundrect_ext(_x, _y, _x + _w, _y + _h, global.game_uis.roundx, global.game_uis.roundy, false);
			draw_set_color(c_white);
			break;
        case "create_panel":
			draw_set_color(global.game_uis.bg);
		    draw_roundrect_ext(_x, _y, _x + _w, _y + _h, global.game_uis.roundx, global.game_uis.roundy, false);
            quit_button.position(_x + _w - 20, _y - 20, _x + _w + 20, _y + 20);
            quit_button.draw();
			break;
        case "name_input":
            name_input.position(_x, _y, _x + _w, _y + _h);
            name_input.draw();
            break;
        case "type_selection":
            type_dropdown.position(_x, _y, _x + _w, _y + _h);
            break;
        case "maxp_selection":
            maxp.position(_x, _y, _x + _w, _y + _h);
            break;
        case "create_button":
            create_button.position(_x, _y, _x + _w, _y + _h);
            create_button.draw();
            break;
		default:
			if (string_contains(name, "grid")) {
			    break;
			}
			//draw_rectangle(_x, _y, _x + _w, _y + _h, true);
			break;
	}
});
array_sort(droplist, function (e1, e2) {
    return e1.area[1] < e2.area[1];
});
array_foreach(droplist, function (e, i) {
    e.draw();
});