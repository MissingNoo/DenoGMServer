
uistr = variable_clone(global.game_uis.context_menu);
while (top + height > display_get_gui_height()) {
	top--;
}
while (left + width > display_get_gui_width()) {
	left--;
}
uistr.left = left;
uistr.top = top;
uistr.width = width;
uistr.height = height;

ui = new window(uistr);
offset = 22;
button_height = 22;
dbg = dbg_view("Context Menu", false);
create_view_from_instance(self);