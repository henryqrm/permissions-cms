/**
 * Page model events
 */

'use strict';

import {EventEmitter} from 'events';
import Page from './page.model';
var PageEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PageEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Page.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PageEvents.emit(event + ':' + doc._id, doc);
    PageEvents.emit(event, doc);
  };
}

export default PageEvents;
