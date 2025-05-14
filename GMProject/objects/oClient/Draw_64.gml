var p = [];
for (var i = 0; i < array_length(AirNet.players_in_room); ++i) {
    array_push(p, AirNet.players_in_room[i].uuid);
}
var dbg = $"UUID: {AirNet.connection.uuid} \nPing: {AirNet.connection.ping} \nRoom: {AirNet.connection.current_room} \nPlayers: {p}";
draw_set_color(c_black);
draw_set_alpha(0.75);
draw_rectangle(x, y, x + string_width(dbg) + 5, y + string_height(dbg) + 5, false);
draw_set_color(c_white);
draw_set_alpha(1);
draw_text(x + 5, y + 5, dbg);
draw_rectangle(x, y, x + string_width(dbg) + 5, y + string_height(dbg) + 10, true);
if (!is_undefined(room_code)) {
	scribble($"[fa_bottom][fa_center]Room Code: {room_code}").draw(gui_x_percent(50), gui_y_percent(98));
}