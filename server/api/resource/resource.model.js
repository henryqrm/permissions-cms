'use strict';

import mongoose from 'mongoose';

var ResourceSchema = new mongoose.Schema({
  group: String,
  contexts: [{
    name: String,
    roles: {
      c: Boolean,
      r: {
        type: Boolean,
        default: true
      },
      u: Boolean,
      d: Boolean,
      p: Boolean
    }
  }]
});

export default mongoose.model('Resource', ResourceSchema);
