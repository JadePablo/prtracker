import {Schema,model,models} from 'mongoose';

//adjust prSchema to actual name of table containing prs
const GymSchema = new Schema({
    location: {
        type: String
    },
    gymName: {
        type: String,
        unique: [true,'this gym already exists'],
    },
    domain: {
        type:String
    }

})

const Gym = models.Gym || model("Gym",GymSchema);

export default Gym;