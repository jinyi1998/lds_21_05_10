import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import QuestionHint from '../components/questionHint';

const InstructionBox = (props) => {
    const {title, content, tips} = props;
    return (
        <React.Fragment>
             <Card variant="outlined" style={{margin: "16px"}}>
                <CardContent>
                    {/* <Typography variant="h5" gutterBottom>
                        {title}
   
                    </Typography> */}

                    <Typography variant="body1" color="textPrimary" component="p">
                        {content}
                        {(tips == "" || typeof tips == "undefined")? 
                            null 
                            :
                            <QuestionHint title={tips}/>
                        }
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
export default InstructionBox;