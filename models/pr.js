import { Schema, model, models } from 'mongoose';
import Gym from './gym';

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
    type: Schema.Types.ObjectId,
    ref: "gyms",
    validate: {
      validator: async function (value) {
        const gym = await Gym.findById(value);
        return !!gym;
      },
      message: "Invalid gym location"
    }
  },
  lifter: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Pr = models.Pr || model("Pr", PrSchema);

export default Pr;
