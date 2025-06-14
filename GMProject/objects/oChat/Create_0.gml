ui = new window(global.game_uis.chat);
ui.fit_to_gui();
text_input = new textbox();
text_input.backtext = "Chat here";
text_input.set_function(method(self, function() {
	var text = text_input.text;
	if (text != "") {
		new packet("chatMessage")
		.write("player", AirNet.username)
		.write("message", text)
		.send();
		text_input.text = "";
	}
}));
chat = [];
chatsurf = undefined;
over = 0;