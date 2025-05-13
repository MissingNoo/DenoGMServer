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