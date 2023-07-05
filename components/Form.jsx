"use client";

import {useState} from 'react'
import {Typography,Box,TextField,Button,RadioGroup,Radio,FormControlLabel,Container} from '@mui/material'
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

function PrForm() {

    const {data: session} = useSession();
    const pathname = usePathname();

    const [formData,setFormData] = useState({
        lifter: '', 
        lift: '',
        weight: '',
        location:'',
        date: '',
        video: null
    })
    
    /*
    HELPER FUNCTION: check if the formData's fields fits all constraints specified below:
        - creator length is between: [1,20]
        - lift length > 0, meaning that one of lifts' radio buttons were selected
        - weight is between: [1,1000]
        - reps is between: [1,99]
    
    post: { returns <true> if formData's fields meet above spec. , returns <false> otherwise}
    */
    function isValidSubmission() {
        

        var validCreator,validLift,validWeight,validReps

        validCreator = Boolean(formData.creator.length >= 1 && formData.creator.length <= 20)
        validLift = Boolean(formData.lift.length > 0)
        validWeight = Boolean(formData.weight >= 1 && formData.weight <= 1000)
        validReps = Boolean(formData.reps >= 1 && formData.reps <= 99)

        if (validCreator && validLift && validWeight && validReps) {return true}

        return false
    }

    /*
    HELPER FUNCTION: submits data if formData meets specs. noted above the 'isValidSubmission' function then resets formData's fields

    post: {makes axios request with the formData in its request body, sets formData to its default values}
    */
    async function submitPr(gym,creator,lift,weight,reps,source) {

        if (isValidSubmission()) {await api.createPr(gym,creator,lift,weight,reps,source)}
        
        setFormData({
            creator: '',
            lift: '',
            weight: 0,
            reps: 0,
            source:''
        })
    }

    /*
    HELPER FUNCTION: sets formData's 'lift' field to value of selected radio button.
        ex. if 'deadlift' radio button is selected, lift is set to 'deadlift'

    post: {sets formDatas' 'lift' field to one of three options: {deadlift,squat,bench} when a radio button is selected}
    */
    function setLift(e) {
        switch(e.target.value) {
            case "squat":
                setFormData({...formData,lift:e.target.value})
                break
            case "deadlift":
                setFormData({...formData,lift:e.target.value})
                break
            case "bench":
                setFormData({...formData,lift:e.target.value})
                break
            default:
                setFormData({...formData,lift:''})
        }
    }

    return (
        <div>
            <Typography sx={{padding:"0.5em"}} variant="h4">Submit a Pr</Typography>

            <Box component="form" autoComplete="off" display="flex" flexDirection="column">
                    <RadioGroup 
                    required
                    row 
                    sx={{marginBottom:"0.5em"}}>
                        <FormControlLabel checked={formData.lift === 'squat'} className='radio' value="squat" control={<Radio />} label="Squat" onClick={function(e){setLift(e)}}/>
                        <FormControlLabel checked={formData.lift === 'bench'} className='radio' value="bench" control={<Radio />} label="Bench" onClick={function(e){setLift(e)}}/>
                        <FormControlLabel checked={formData.lift === 'deadlift'} className='radio' value="deadlift" control={<Radio />} label="Deadlift" onClick={function(e){setLift(e)}}/>
                    </RadioGroup>
                    {
                        (formData.lift === '' && (
                            <Typography paddingLeft="1em" marginBottom="1em" align="left" fontSize="12px" color="#AB261D">Must choose one lift</Typography>
                        ))
                    }
                    <TextField
                        sx={{marginBottom:"1em"}}
                        required
                        error={formData.weight < 1 || formData.weight > 1000}
                        helperText = {(formData.weight < 1 || formData.weight > 1000) ? 'Weight must be between 1 - 1000 lbs' : ''}

                        label="Weight (lbs)"
                        type="number"
                        value={formData.weight}
                        onChange={
                            function(e) {
                                setFormData({...formData,weight: e.target.value})  
                            }
                        }
                    />

                    <Button
                        sx={{marginBottom:"1em",backgroundColor:"#D16002"}}
                        variant="contained"
                        onClick={
                            function(e) {
                                e.preventDefault()
                                submitPr(currentGym,formData.creator,formData.lift,formData.weight,formData.reps,formData.source)
                            }
                        }
                    >Submit PR</Button>
            </Box>
        </div>
    )
}

export default PrForm