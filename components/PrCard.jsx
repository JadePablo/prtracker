import React from "react"
import {Card,CardContent,Typography,CardActionArea} from '@mui/material'
import Link from 'next/link';


//remember to add the 'overlay' effect when user clicks on pr simliar to diario view journals

const PrCard = (props) => {
    const lifter = props.lifter;
    const weight = props.weight;
    const date = props.date;

    return (
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography>
                            {lifter}
                        </Typography>
                        <Typography>
                            {weight}
                        </Typography>
                        <Typography>
                            {date}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
    )
}

export default PrCard