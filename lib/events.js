'use strict';

const EventEmitter = require('events');

module.exports = class Events {

	static get eventEmitter() {

		if(!this._eventEmitter)
			this._eventEmitter = new EventEmitter();

		return this._eventEmitter;
	}

	static emit(eventName, ...args) {
		this.eventEmitter.emit(eventName, ...args);
	}

	static on(eventName, callback) {
		this.eventEmitter.on(eventName, callback);
	}

	static once(eventName, callback) {
		this.eventEmitter.once(eventName, callback);
	}
};
