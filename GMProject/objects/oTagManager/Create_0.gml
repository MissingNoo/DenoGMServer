ui = new window(AirLib.lib_uis.tag_manager);
tagsdrop = new listbox();
addbtn = new button("Add");
addbtn.set_function(method(self, function() {
    if (is_undefined(data[$ "tags"])) {
    	data.tags = [];
    } 
    if (!array_contains(data.tags, tagsdrop.text)) {
    	array_push(data.tags, tagsdrop.text);
    }
    instance_destroy();
}));
delbtn = new button("Remove");
delbtn.set_function(method(self, function() {
    if (is_undefined(data[$ "tags"])) {
    	data.tags = [];
    } 
    if (array_contains(data.tags, tagsdrop.text)) {
        var index = array_get_index(data.tags, tagsdrop.text);
        array_delete(data.tags, index, 1);
    }
    instance_destroy();
}));
for (var tags = AirLibTags, i = 0; i < array_length(tags); i++) {
	tagsdrop.add_item(tags[i]);
}
//data.tags = ["bg"];
//data = variable_clone(data);
//struct_remove(data, "owner");
//show_debug_message(data);