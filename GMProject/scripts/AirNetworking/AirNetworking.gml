function connection(_ip, _port, _type) constructor {
	ip = _ip;
	port = _port;
	type = _type;
	socket = network_create_socket(type);
	connected = -1;
	uuid = "";
	ping = 0;
	pingtime = get_timer();
	lastpong = get_timer();
	current_room = "";
	
	pingpong = time_source_create(time_source_game, 60, time_source_units_frames, function() {
		var pongtime = (get_timer() - lastpong) / 1000000;
		pingtime = get_timer();
		new packet("ping").send();
		if (pongtime > 30) {
		    show_message_async("Disconnected!");
			disconnect();
		}
	}, [], -1);
	
	static connect = function() {
		if (connected = 0) {
		    show_debug_message("Already connected!");
			exit;
		}
		socket = network_create_socket(type);
		connected = network_connect_raw(socket, ip, port);
		time_source_start(pingpong);
		new packet("connect").write("uuid", uuid).send();
	}
	
	static reconnect = function() {
		network_destroy(socket);
		connected = -1;
		connect();
		return connected;
	}
	
	static disconnect = function() {
		network_destroy(socket);
		connected = -1;
		time_source_stop(pingpong);
	}
	
	static set_uuid = function(_uuid) {
		uuid = _uuid;
		return self;
	}
}

function packet(type) constructor {
	buffer = buffer_create(0, buffer_grow, 1);
	buffer_seek(buffer, buffer_seek_start, 0);
	data = { type }
	
	static write = function(k, v) {
		data[$ k] = v;
		return self;
	}
	
	static send = function() {
		if (global.con.connected != 0) { exit; }
		buffer_write(buffer, buffer_string, json_stringify(data));
		network_send_raw(global.con.socket, buffer, buffer_tell(buffer) - 1);
		buffer_delete(buffer);
	}
}