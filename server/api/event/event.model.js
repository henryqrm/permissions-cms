'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  id: Number,
  title: String,
  text: String,
  context: String,
  moderators: [String],
  status: String,
  active: Boolean
});

export default mongoose.model('Event', EventSchema);
