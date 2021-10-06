'use strict';

const Events = require('../lib/events');

describe('Events', () => {

	afterEach(() => {

	});

	it('Should emit new event', () => {

		Events.emit('my-new-event');

	});

});
