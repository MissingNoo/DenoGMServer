//feather ignore all
ui.foreach(function(name, pos, data) {
    AirUIArea;
    switch (name) {
        case "title":
            scribble("[fa_center][fa_middle][c_black]Load UI").draw(_x + _w / 2, _y + _h / 2);
            break;
        case "dropdown_tags":
            uisdrop.position(_x, _y, _x + _w, _y + _h);
            break;
        case "tags_label":
            scribble("[fa_middle]UI to load:").draw(_x, _y + _h / 2);
            break;
        case "button_accept":
            addbtn.position(_x, _y, _x + _w, _y + _h);
            break;
        case "button_cancel":
            delbtn.position(_x, _y, _x + _w, _y + _h);
            break;
    }
});
addbtn.draw();
delbtn.draw();
uisdrop.draw();