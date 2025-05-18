var ctn = new context_menu("player", 100, 200);
var fbutton = new button("Add friend");
fbutton.set_function(function() {
	show_message_async("add");
});
ctn.add_button(fbutton);
ctn.add_button(variable_clone(fbutton));