import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    customWidth: {
      maxWidth: 500,
    },
    noMaxWidth: {
      maxWidth: 'none',
    },
  }));


const QuestionHint = (props) => {
    const classes = useStyles();
    return (
        <Tooltip 
            classes={{ tooltip: classes.customWidth }}
            title={
                <React.Fragment>
                    <Typography  variant="subtitle1" color="inherit">Hints:</Typography>
                    <Typography variant="body2" color="inherit">{props.title}</Typography>
                </React.Fragment>
            } 
            placement="right-end"
        >
            <HelpIcon/>
        </Tooltip>   
    );
}
export default QuestionHint;