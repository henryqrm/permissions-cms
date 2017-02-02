'use strict';

import mongoose from 'mongoose';

var PageSchema = new mongoose.Schema({
  id: Number,
  title: String,
  text: String,
  context: String,
  moderators: [Number],
  status: String,
  active: Boolean
});

export default mongoose.model('Page', PageSchema);
