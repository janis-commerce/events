# events

![Build Status](https://github.com/janis-commerce/events/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/events/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/events?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fevents.svg)](https://www.npmjs.com/package/@janiscommerce/events)

A simple package to Emit and Listen events in Janis Services.

This package wraps the `events` from Node.js to ensure using the same EventEmitter instance.

### Emit

You can easily emit a new event using the _static_ method `emit(eventName, ...args)`.

```js
'use strict';

const Events = require('@janiscommerce/events');

Events.emit('some-random-event', 'foo', 'bar');
```

For more information see the Node.js documentation [emitter.emit()](https://nodejs.org/api/events.html#events_emitter_emit_eventname_args).

### Listen

To create listener for an event you should call the _static_ method `on(eventName, callback)`.
The callback will be called **every time** the event was emitted.

```js
'use strict';

const Events = require('@janiscommerce/events');

Events.on('some-random-event', (...args) => {
	// do some serious stuff with the args
});
```

For more information see the Node.js documentation [emitter.on()](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener).

### One time listener

To create listener that is only **called once** should register the listener with the _static_ method `once(eventName, callback)`.
The callback will be called **only the first time** the event was emitted.

```js
'use strict';

const Events = require('@janiscommerce/events');

Events.once('one-time-event', (...args) => {
	// do some serious stuff with the args
});
```

For more information see the Node.js documentation [emitter.once()](https://nodejs.org/api/events.html#events_emitter_once_eventname_listener).
