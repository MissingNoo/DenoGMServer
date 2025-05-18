var ctn = new context_menu("player", device_mouse_x_to_gui(0), device_mouse_y_to_gui(0), 100, 200);
var fbutton = new button("Add friend");
fbutton.set_function(function() {
	show_message_async("add");
});
ctn.add_button(fbutton);
ctn.add_button(variable_clone(fbutton));