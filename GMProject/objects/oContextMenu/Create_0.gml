
uistr = {
  "nodes":[
    {
      "padding":10.0,
      "data":{
        "tags":[
          "fg"
        ]
      },
      "height":15.0,
      "name":"title"
    },
    {
      "padding":10.0,
      "data":{
        "tags":[
          "fg"
        ]
      },
      "height":60.0,
      "name":"list",
	  "marginTop" : 5.0,
      "flex":1.0
    }
  ],
  "name":"main_panel",
  "left":275.0,
  "padding":5.0,
  "top":50.0,
  "width":200.0,
  "data":{
    "tags":[
      "bg"
    ]
  },
  "height":300.0
}
while (top + height > display_get_gui_height()) {
	top--;
}
while (left + width > display_get_gui_width()) {
	left--;
}
uistr.left = left;
uistr.top = top;
uistr.width = width;
uistr.height = height;

ui = new window(uistr);
offset = 22;
button_height = 22;
dbg = dbg_view("Context Menu", false);
create_view_from_instance(self);