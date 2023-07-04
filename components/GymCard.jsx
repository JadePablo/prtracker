import React from "react"
import {Card,CardContent,Typography,CardActionArea} from '@mui/material'
import Link from 'next/link';

/*
props breakdown:

name  = gym.gymName, location = gym.location
*/
function GymCard(props) {
    const name = props.gymName;
    const location = props.location;

    function capitalize(str) { //capitalize the gym names
        const lower = str.toLowerCase()
        return str.charAt(0).toUpperCase() + lower.slice(1)
    }

    return (
        <Link href={`/${name}`}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography>
                            {capitalize(name)}
                        </Typography>
                        <Typography>
                            @ {location}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default GymCard