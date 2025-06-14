ui = new window(global.game_uis.login);
ui.fit_to_gui();
username = new textbox();
username.set_align(fa_center, fa_middle);
username.backtext = "username";
password = new textbox();
password.set_align(fa_center, fa_middle);
password.backtext = "password";
login = new button("Login");
login.set_function(method(self, function() {
	new packet("login")
	.write("username", username.text)
	.write("passwordhash", sha1_string_unicode(password.text))
	.send();
}));
register = new button("Register");
register.set_function(method(self, function() {
	new packet("register")
	.write("username", username.text)
	.write("passwordhash", sha1_string_unicode(password.text))
	.send();
}));