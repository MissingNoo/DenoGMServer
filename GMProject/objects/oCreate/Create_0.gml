ui = new window(global.game_uis.create);
ui.fit_to_gui();

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


maxp = new listbox();
for (var i = 0; i <= 12; i++) {
	maxp.add_item(i);
}
maxp.text = 12;
maxp.backspr = undefined;

create_button = new button("Create");
create_button.set_function(method(self, function () {
    new packet("newRoom")
	.write("roomName", name_input.text)
	.write("password", "")
	.write("maxPlayers", maxp.text)
	.write("roomType", type_dropdown.text)
	.send();
}));

droplist = [type_dropdown, maxp];