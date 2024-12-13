
const mongoose = require('mongoose');
const marketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
    },
    results: [
      {
        resultDate: {
          type: Date,
          required: true,
        },
        openPatti: {
          type: Number,
        },
        jodi: {
          type: Number,
        },
        closePatti: {
          type: Number,
        },
      },
    ],
    todayResult: {
      openPatti: { type: Number },
      jodi: { type: Number },
      closePatti: { type: Number },
    },
  },
  { timestamps: true }
);

const Market = mongoose.model('Market', marketSchema);

module.exports = Market;
