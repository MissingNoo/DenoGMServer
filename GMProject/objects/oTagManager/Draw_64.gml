//feather ignore all
ui.foreach(function(name, pos, data) {
    var spr = data[$ "image"] != undefined ? asset_get_index(data.image) : undefined;
    spr = (spr != undefined and spr != -1) ? spr : sBlank;
	var _x = pos.left, _y = pos.top, _w = pos.width, _h = pos.height;
	var area = [_x, _y, _x + _w, _y + _h];
    switch (name) {
        case "title":
            scribble("[fa_center][fa_middle][c_black]Tag Editor").draw(_x + _w / 2, _y + _h / 2);
            break;
        case "dropdown_tags":
            tagsdrop.position(_x, _y, _x + _w, _y + _h);
            break;
        case "tags_label":
            scribble("[fa_middle]Tag:").draw(_x, _y + _h / 2);
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
tagsdrop.draw();