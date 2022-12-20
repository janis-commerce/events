# events

![Build Status](https://github.com/janis-commerce/events/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/events/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/events?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fevents.svg)](https://www.npmjs.com/package/@janiscommerce/events)

A simple package to Emit and Listen events in Janis Services.

### async/await

**Important**: _Since 0.2.0_ async callbacks are allowed, `on()` and `once()` accepts async functions and `emit()` will wait when `await` is used.

### Emit

You can easily emit a new event using the _static_ method `async emit(eventName, ...args)`.

```js
'use strict';

const Events = require('@janiscommerce/events');

await Events.emit('some-random-event', 'foo', 'bar');
```

### Listen every time

To create listener for an event you should call the _static_ method `on(eventName, callback)`.

The callback will be called **every time** the event was emitted.

```js
'use strict';

const Events = require('@janiscommerce/events');

Events.on('some-random-event', async (...args) => {
	// do some serious stuff with the args
});
```

### Listen one time only

To create listener that is only **called once** should register the listener with the _static_ method `once(eventName, callback)`.

The callback will be called **only the first time** the event was emitted.

```js
'use strict';

const Events = require('@janiscommerce/events');

Events.once('one-time-event', async (...args) => {
	// do some serious stuff with the args
});
```

### Remove listeners

To remove listener of an event previously registered you should use the _static_ method `off(eventName)`.

This will remove all listeners (clean all callbacks): registered with `on()` or `once()`


```js
'use strict';

const Events = require('@janiscommerce/events');

Events.on('my-event', async () => {
	console.log('my-event occurred!!!')
});

Events.once('my-event', async () => {
	console.log('my-event occurred for the first time!!!')
});

await Event.emit('my-event');
// expected output: my-event occurred!!!
// expected output: my-event occurred for the first time!!!

await Event.emit('my-event');
// expected output: my-event occurred!!!

Events.off('my-event');

await Event.emit('my-event'); // no output expected

```

### Remove all listeners

To remove all listener registered you should use the _static_ method `off()`.

```js
'use strict';

const Events = require('@janiscommerce/events');

Events.on('my-event', async () => {
	console.log('my-event occurred!!!')
});

Events.once('my-other-event', async () => {
	console.log('my-other-event occurred for the first time!!!')
});

await Event.emit('my-event');
// expected output: my-event occurred!!!
await Event.emit('my-event-event');
// expected output: my-other-event occurred for the first time!!!

Events.off();

await Event.emit('my-event'); // no output expected
await Event.emit('my-event-event'); // no output expected

```
