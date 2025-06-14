randomize();
down = false;
up = false;
edit_node = undefined;
node = undefined;
creating = false;

grid_template = {
  "width":1280.0,
  "name":"main_panel",
  "height":720.0,
  "top":50.0,

  "data":{
  },
  "nodes":[
    {
      "padding":0.0,
      "flexDirection":"row",
      "name":"top_panel_grid",
      "height":300.0,
      "flex":1.0,
      "top":0.0,
      "data":{
      },
      "nodes":[
        {
          "width":60.0,
          "name":"grid_panel1",
          "flex":1.0,
          "padding":0.0,
          "data":{
          }
        },
        {
          "margin":0.0,
          "padding":0.0,
          "width":60.0,
          "name":"grid_panel2",
          "flex":1.0,
          "data":{
          }
        },
        {
          "width":60.0,
          "name":"grid_panel3",
          "flex":1.0,
          "padding":0.0,
          "data":{
          }
        }
      ],
      "left":0.0
    },
    {
      "padding":0.0,
      "flexDirection":"row",
      "name":"middle_panel_grid",
      "height":300.0,
      "flex":1.0,
      "top":0.0,
      "data":{
      },
      "nodes":[
        {
          "width":60.0,
          "name":"grid_panel4",
          "flex":1.0,
          "padding":0.0,
          "data":{
          }
        },
        {
          "margin":0.0,
          "padding":0.0,
          "border":0.0,
          "width":60.0,
          "name":"grid_panel5",
          "flex":1.0,
          "data":{
          }
        },
        {
          "flexBasis":0.0,
          "padding":0.0,
          "width":60.0,
          "name":"grid_panel6",
          "flex":1.0,
          "data":{
          }
        }
      ],
      "left":0.0
    },
    {
      "padding":0.0,
      "flexDirection":"row",
      "name":"bottom_panel_grid",
      "height":300.0,
      "flex":1.0,
      "top":0.0,
      "data":{
      },
      "nodes":[
        {
          "margin":0.0,
          "padding":0.0,
          "width":60.0,
          "name":"grid_panel7",
          "flex":1.0,
          "data":{
          }
        },
        {
          "width":60.0,
          "name":"grid_panel8",
          "flex":1.0,
          "padding":0.0,
          "data":{
          }
        },
        {
          "width":60.0,
          "name":"grid_panel9",
          "flex":1.0,
          "padding":0.0,
          "data":{
          }
        }
      ],
      "left":0.0
    }
  ],
  "left":275.0
}
clear_template = {
    "width":1280.0,
    "name":"main_panel",
    "height":720.0,
    "top":50.0,
    "data":{
    },
    "left":275.0
};
//template = global.game_uis.rooms;
template = grid_template;
//template = clear_template;
ui = new window(template, true);
ui.edit_mode();

new_window = function() {
	ui.dispose();
	ui = new window(template, true);
	ui.edit_mode();
}

clearstr = function(struct) {
	var names = struct_get_names(struct);
	if (array_contains(names, "instances")) {
	    struct_remove(struct, "instances");
	}
	if (struct_exists(struct.data, "owner")) {
	    struct_remove(struct.data, "owner");
	}
	if (struct_exists(struct.data, "inst")) {
	    struct_remove(struct.data, "inst");
	}	
	if (array_contains(names, "nodes")) {
	    array_foreach(struct.nodes, function(e, i) {
			clearstr(e);
		});
	}	
}

save = function(name = "test") {
	var f = file_text_open_write(name);
	var str = variable_clone(flexpanel_node_get_struct(ui.root));
	clearstr(str);
	file_text_write_string(f, json_stringify(str, true));
	file_text_close(f);
}

load = function() {
	ui.dispose();
	ui = new window(json_parse(buffer_read(buffer_load("/home/airgeadlamh/.config/DenoTest1/test.ui"), buffer_text)), true);
	//ui.edit_mode();
}

depth = depth + 1;