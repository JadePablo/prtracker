import { Schema, model, models } from 'mongoose';
import Gym from './gym';

/*
PrSchema breakdown:

lift (string)
weight (number)
location (ObjectId to the 'gyms' table)
lifter (string)
date (auto-generated date)
verified(boolean)

*/
const PrSchema = new Schema({
  lift: {
    type: String,
    enum: ["squat", "bench", "deadlift"],
    required: true
  },
  weight: {
    type: Number,
    set: function (value) {
      return Math.round(value);
    },
    validate: {
      validator: function (value) {
        return Number.isInteger(value) && value > 0;
      },
      message: "Weight must be a positive integer"
    },
    required: true
  },
  location: {
    type: String
  },
  lifter: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  source: {
    type: String
  },
  lifterEmail: {
    type: String
  },
  beaten: {
    type: Boolean,
    default: false
  }
});

const Pr = models.Pr || model("Pr", PrSchema);

export default Pr;
