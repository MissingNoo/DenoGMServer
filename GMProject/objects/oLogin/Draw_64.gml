//feather ignore all
ui.foreach(function(name, pos, data) {
	AirUIArea;
	switch (name) {
		case "title":
			scribble("[c_black][fa_center][fa_middle]LOGIN").fit_to_box(_w, _h).draw(_x + _w / 2, _y + _h / 2);
			break;
		case "user_label":
			scribble("[c_black][fa_center][fa_middle]Username").draw(_x + _w / 2, _y + _h / 2);
			break;
		case "pass_label":
			scribble("[c_black][fa_center][fa_middle]Password").draw(_x + _w / 2, _y + _h / 2);
			break;
		case "username":
			username.position_area(area);
			username.draw();
			break;
		case "password":
			password.position_area(area);
			password.draw();
			break;
		case "login":
			login.position_area(area);
			login.draw();
			break;
		case "register":
			register.position_area(area);
			register.draw();
			break;
		default:
			break;
	}
});