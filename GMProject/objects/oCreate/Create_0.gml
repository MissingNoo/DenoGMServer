ui = new window(global.game_uis.create);
ui.fit_to_gui();

droplist = [];

name_input = new textbox();
name_input.only_numbers = false;
name_input.can_be_null = false;
name_input.backtext = "Insert the room name here";
name_input.backspr = undefined;

type_dropdown = new listbox();
type_dropdown.add_item("Public")
.add_item("Private")
.add_item("Offline");
type_dropdown.text = "Public";
type_dropdown.backspr = undefined;
array_push(droplist, type_dropdown);

maxp = new listbox();
for (var i = 1; i <= 12; i++) {
	maxp.add_item(i);
}
maxp.text = 12;
maxp.backspr = undefined;
array_push(droplist, maxp);

quit_button = new button("X");
quit_button.set_function(method(self, function() {
    instance_activate_object(oMainMenu);
    instance_destroy(self);
}));
quit_button.set_sprite(sBlank);
quit_button.set_back_sprite(sBlank);

create_button = new button("Create");
create_button.set_sprite(sBlank);
create_button.set_back_sprite(sBlank);
create_button.set_function(method(self, function () {
    if (name_input.text != "") {
    	new packet("newRoom")
    	.write("roomName", name_input.text)
    	.write("password", "")
    	.write("maxPlayers", maxp.text)
    	.write("roomType", type_dropdown.text)
    	.send();
    }
}));