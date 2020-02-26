import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const InstructionBox = (props) => {
    const {title, content, tips} = props;
    return (
        <React.Fragment>
             <Card variant="outlined" style={{margin: "16px"}}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {title}
                    </Typography>

                    <Typography variant="body2" component="p">
                        {content}
                    </Typography>
                </CardContent>
                {tips == ""? 
                    null 
                    :
                    <CardActions>
                        <Tooltip title={tips} aria-label="add">
                            <Button> <EmojiObjectsIcon/></Button>
                        </Tooltip>  
                    </CardActions>
                }
               
            </Card>
        </React.Fragment>
    );
}
export default InstructionBox;