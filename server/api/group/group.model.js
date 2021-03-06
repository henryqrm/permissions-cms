'use strict';

import mongoose from 'mongoose';

var GroupSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Group', GroupSchema);
