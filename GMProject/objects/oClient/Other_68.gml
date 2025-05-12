if (async_load[? "type"] == network_type_data) {
	var buffer = buffer_read(async_load[? "buffer"], buffer_string);
	var json= json_parse(buffer);
	var return_type = json.type;
	var data = json_parse(json.message);
	var oouid, player;
	switch (return_type) {
	    case "uuid":
	        global.con.set_uuid(data.uuid);
	        break;
			
		case "pong":
			var time = get_timer();
			global.con.ping = round(((time - global.con.pingtime) / 1000000) * 100);
			global.con.lastpong = get_timer();
			break;
			
		case "joinedRoom":
			global.con.current_room = data.roomName;
			break;
			
		case "playersInRoom":
			players_in_room = data.players;
			array_foreach(players_in_room, function(e, i) {
				var exists = false;
				with (oOtherPlayer) {
					exists = self.player == e;
				}
				if (!exists) {
				//if (!exists and e.uuid != global.con.uuid) {
				    instance_create_depth(e.x, e.y, 0, oOtherPlayer, {player : e});
				}
			});
			break;
			
		case "playerMoved":
			var ouuid = data.uuid;
			global.search = ouuid;
			player = array_find_index(players_in_room, function(e, i) {
				return e.uuid == global.search;
			});
			if (player != -1) {
			    players_in_room[player].x = data.x;
			    players_in_room[player].y = data.y;
			}
			break;
			
		case "playerLeft":
			ouuid = data.uuid;
			player = array_find_index(players_in_room, function(e, i) {
				return e.uuid == global.search;
			});
			if (player != -1) {
				array_delete(players_in_room, player, 1);
			}
			with (oOtherPlayer) {
			    if (uuid == ouuid) {
				    instance_destroy();
				}
			}
			break;
			
		case "roomCreated":
			new packet("joinRoom").write("roomName", data.roomName).send();
			break;
	    default:
	        // code here
	        break;
	}
}