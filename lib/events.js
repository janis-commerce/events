'use strict';

const EventEmitter = require('events');

module.exports = class Events {

	static get eventEmitter() {

		if(!this._eventEmitter)
			this._eventEmitter = new EventEmitter();

		return this._eventEmitter;
	}

	static emit(eventName) {
		this.eventEmitter.emit(eventName);
	}

	static on(eventName, callback) {
		this.eventEmitter.on(eventName, callback);
	}
};
