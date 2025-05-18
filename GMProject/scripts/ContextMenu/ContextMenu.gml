function context_menu(title, left, top, width, height) constructor {
	inst = noone;
	if (!instance_exists(oContextMenu)) {
		inst = instance_create_depth(0, 0, -1000, oContextMenu, {
			title, left, top, width, height
		});
	}
	
	static add_button = function(btn) {
		if (instance_exists(inst)) {
			array_push(inst.buttons, btn);	
		}
	}
}