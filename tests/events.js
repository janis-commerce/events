'use strict';

const assert = require('assert');

const Events = require('../lib/events');

describe('Events', () => {

	it('Should emit new event and listener event every time was emitted', () => {

		let calledCount = 0;

		Events.on('my-new-event', () => {
			calledCount++;
		});

		Events.emit('my-new-event');
		Events.emit('my-new-event');
		Events.emit('my-new-event');
		Events.emit('my-new-event');

		assert.deepStrictEqual(calledCount, 4);
	});

	it('Should emit new event and listener only once the emitted event', () => {

		let calledCount = 0;

		Events.once('one-time-event', () => {
			calledCount++;
		});

		Events.emit('one-time-event');
		Events.emit('one-time-event');
		Events.emit('one-time-event');
		Events.emit('one-time-event');

		assert.deepStrictEqual(calledCount, 1);
	});

	it('Should not listen events if not registered', () => {

		let calledCount = 0;

		Events.on('call-count-event', () => {
			calledCount++;
		});

		Events.emit('other-event');

		assert.deepStrictEqual(calledCount, 0);
	});

	it('Should receive args in listener', () => {

		let args = [];

		Events.on('event-with-args', (...eventArgs) => {
			args = [...eventArgs];
		});

		Events.emit('event-with-args', 'first arg', 10);

		assert.deepStrictEqual(args.length, 2);
		assert.deepStrictEqual(args[0], 'first arg');
		assert.deepStrictEqual(args[1], 10);
	});

});
