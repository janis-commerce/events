'use strict';

const assert = require('assert');

const Events = require('../lib/events');

describe('Events', () => {

	afterEach(() => {
		Events.off('event-test-a');
		Events.off('event-test-b');
	});

	it('Should emit new event and listener event every time was emitted', async () => {

		let calledCount = 0;

		Events.on('event-test-a', async () => {
			calledCount++;
		});

		await Events.emit('event-test-a');
		await Events.emit('event-test-a');
		await Events.emit('event-test-a');
		await Events.emit('event-test-a');

		assert.deepStrictEqual(calledCount, 4);
	});

	it('Should emit new event and listener only once the emitted event', async () => {

		let calledCount = 0;

		Events.once('event-test-a', async () => {
			calledCount++;
		});

		await Events.emit('event-test-a');
		await Events.emit('event-test-a');
		await Events.emit('event-test-a');
		await Events.emit('event-test-a');

		assert.deepStrictEqual(calledCount, 1);
	});

	it('Should not listen events if not registered', async () => {

		let calledCount = 0;

		Events.on('event-test-a', async () => {
			calledCount++;
		});

		await Events.emit('event-test-b');

		assert.deepStrictEqual(calledCount, 0);
	});

	it('Should receive args in listener', async () => {

		let args = [];

		Events.on('event-test-a', (...eventArgs) => {
			args = [...eventArgs];
		});

		await Events.emit('event-test-a', 'first arg', 10);

		assert.deepStrictEqual(args.length, 2);
		assert.deepStrictEqual(args[0], 'first arg');
		assert.deepStrictEqual(args[1], 10);
	});

	it('Should register multiple callbacks for the same event to be emitted multiple times', async () => {

		let callCountCrossCallbacks = 0;

		Events.on('event-test-a', () => {
			callCountCrossCallbacks++;
		});

		Events.on('event-test-a', () => {
			callCountCrossCallbacks += 2;
		});

		await Events.emit('event-test-a');

		assert.deepStrictEqual(callCountCrossCallbacks, 3);
	});

	it('Should listen events once and every time for same event', async () => {

		let callCountCrossCallbacks = 0;

		Events.once('event-test-a', () => {
			callCountCrossCallbacks++;
		});

		Events.on('event-test-a', () => {
			callCountCrossCallbacks += 2;
		});

		await Events.emit('event-test-a');
		await Events.emit('event-test-a');

		/**
		 * +1 por el once() del 1er emit()
		 * +2 por el on() del 1er emit()
		 * +2 por el on() del 2er emit()
		 *
		 * total correcto a testear -> 5
		 *
		 * PD: el 2do() emit() no suma por el once() ;)
		 *
		 */
		assert.deepStrictEqual(callCountCrossCallbacks, 5);
	});

	it('Should remove listeners of an event when off() is used with eventName', async () => {

		let callCountCrossCallbacks = 0;

		Events.once('event-test-a', () => {
			callCountCrossCallbacks++;
		});

		Events.on('event-test-a', () => {
			callCountCrossCallbacks++;
		});

		Events.off('event-test-a');

		await Events.emit('event-test-a'); // no tiene que tener impacto en el contador y quedar en 0

		assert.deepStrictEqual(callCountCrossCallbacks, 0);
	});

	it('Should remove all listeners when off() is used without eventName', async () => {

		let callCountCrossCallbacks = 0;

		Events.once('event-test-a', () => {
			callCountCrossCallbacks++;
		});

		Events.on('event-test-a', () => {
			callCountCrossCallbacks++;
		});

		Events.once('event-test-b', () => {
			callCountCrossCallbacks++;
		});

		Events.on('event-test-b', () => {
			callCountCrossCallbacks++;
		});

		Events.off();

		await Events.emit('event-test-a'); // no tiene que tener impacto en el contador y quedar en 0
		await Events.emit('event-test-b'); // no tiene que tener impacto en el contador y quedar en 0

		assert.deepStrictEqual(callCountCrossCallbacks, 0);
	});

});
