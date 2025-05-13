var p = [];
for (var i = 0; i < array_length(players_in_room); ++i) {
    array_push(p, players_in_room[i].uuid);
}
var dbg = $"UUID: {global.con.uuid} \nPing: {global.con.ping} \nRoom: {global.con.current_room} \nPlayers: {p}";
draw_set_color(c_black);
draw_set_alpha(0.75);
draw_rectangle(x, y, x + string_width(dbg) + 5, y + string_height(dbg) + 5, false);
draw_set_color(c_white);
draw_set_alpha(1);
draw_text(x + 5, y + 5, dbg);
draw_rectangle(x, y, x + string_width(dbg) + 5, y + string_height(dbg) + 10, true);
global[$ "__mouse_over"] ??= -1;
ui.foreach(function(name, pos, data) {
    var spr = data[$ "image"] != undefined ? asset_get_index(data.image) : undefined;
    spr = (spr != undefined and spr != -1) ? spr : sBlank;
	var _x = pos.left, _y = pos.top, _w = pos.width, _h = pos.height;
    switch (name) {
        case "menu_options":
            var y_offset = 2;
            var base_height = _h / array_length(options);
            var offset = 2;
            for (var names = struct_get_names(option_data), i = 0; i < array_length(names); i += 1) {
                var opt = option_data[$ names[i]];
                var area;
                var yy = _y;
                if (i == 0) {
                    area = [_x, yy, _x + _w, _y + opt.height];
                    draw_rectangle(_x, yy, _x + _w, yy + opt.height, true);
                } else {
                    var lastopt = option_data[$ names[i - 1]];
                    yy = _y + lastopt.height + y_offset;
                    area = [_x, yy, _x + _w, yy + opt.height];
                    draw_rectangle(_x, yy, _x + _w, yy + opt.height, true);
                    y_offset += lastopt.height + offset;
                }
                draw_text(_x - 90, yy, $"{opt.height}:{names[i]}:{global[$ "__opt"] ?? "" == names[i]}:{global.__mouse_over}");
                if (mouse_in_area_gui(area)) {
                    global.__mouse_over = i;
                    global.__opt = names[i];
                    struct_foreach(option_data, function (n, e) {
                        if (global.__opt != n) {
                            e.height = lerp(e.height, 20, 0.1);
                        }
                    });
                    opt.height = lerp(opt.height, 50, 0.1);
                }
                if (!mouse_in_area_gui([_x, _y, _x + _w, _y + _h])) {
                    struct_foreach(option_data, function (n, e) {
                        e.height = lerp(e.height, 30, 0.05);
                    });
                }
            }
            break;
        default:
            if (!is_undefined(spr)) {
                draw_set_alpha(0.5);
                draw_sprite_stretched(spr, 0, _x, _y, _w, _h);
                draw_set_alpha(1);
            }
            break;
    }
});