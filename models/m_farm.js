const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmSchema = new Schema(
  {
    temp: {
      type: Number,
      required: true,
    },
      humidity: {
      type: Number,
      required: true,
    },
      moisture: {
      type: Number,
      required: true,
    },
      light: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Farm', farmSchema);

