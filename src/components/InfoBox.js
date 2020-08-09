import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"

function InfoBox({title,cases,total}) {
    return (
        <div>
            <Card >
                <CardContent>
                    {/* title */}
                    <Typography>{title}</Typography>
                    {/* cases */}
                    <h2>{cases}</h2>
                    {/* total */}
                    <Typography>{total} </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox;
