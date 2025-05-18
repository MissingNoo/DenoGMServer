ui.foreach(function(name, pos, data) {
	AirUIArea; 
	switch (name) {
		case "text":
			scribble($"{player} wants to add you as a friend").fit_to_box(_w, _h).wrap(_w - 5).draw(_x + 5, _y + 5);
			break;
		case "accept":
			accept.position_area(area);
			accept.draw();
			break;
		case "refuse":
			refuse.position_area(area);
			refuse.draw();
			break;
	}
});