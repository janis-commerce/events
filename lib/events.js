'use strict';

let events = {};
let oneTimeEvents = {};

module.exports = class Events {

	static async emit(eventName, ...args) {

		const callbacks = [
			...events[eventName]?.length ? events[eventName] : [],
			...oneTimeEvents[eventName]?.length ? oneTimeEvents[eventName] : []
		];

		if(!callbacks.length)
			return;

		await Promise.all(callbacks.map(callback => callback(...args)));

		if(oneTimeEvents[eventName]?.length)
			oneTimeEvents[eventName] = [];
	}

	static on(eventName, callback) {

		if(!events[eventName])
			events[eventName] = [];

		events[eventName].push(callback);
	}

	static once(eventName, callback) {

		if(!oneTimeEvents[eventName])
			oneTimeEvents[eventName] = [];

		oneTimeEvents[eventName].push(callback);
	}

	static off(eventName) {

		if(!eventName) {
			events = {};
			oneTimeEvents = {};
		}

		if(events[eventName]?.length)
			delete events[eventName];

		if(oneTimeEvents[eventName]?.length)
			delete oneTimeEvents[eventName];
	}
};
