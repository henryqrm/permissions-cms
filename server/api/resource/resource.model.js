'use strict';

import mongoose from 'mongoose';

var ResourceSchema = new mongoose.Schema({
  group: String,
  contexts: [{
    name: String,
    roles: {
      c: Boolean,
      r: Boolean,
      u: Boolean,
      d: Boolean,
      p: Boolean
    }
  }],
  active: Boolean
});

export default mongoose.model('Resource', ResourceSchema);
