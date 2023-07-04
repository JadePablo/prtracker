import {Schema,model,models} from 'mongoose';

//adjust prSchema to actual name of table containing prs
const GymSchema = new Schema({
    location: {
        type: String,
        unique: [true,'there is already a gym here'],
    },
    gymName: {
        type: String,
        unique: [true,'this gym already exists'],
    },
    verified_prs: [
        {type:Schema.Types.ObjectId,ref:'prs'}
    ],
    undecided_prs: [
        {type:Schema.Types.ObjectId,ref:'prs'}
    ]

})

const Gym = models.Gym || model("Gym",GymSchema);

export default Gym;