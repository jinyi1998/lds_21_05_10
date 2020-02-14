import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import {ContextStore} from '../container/designContainer'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

 const BasicReview = (props) =>  {
  const classes = useStyles();
  const { course, dispatch } = React.useContext(ContextStore);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Course summary
      </Typography>
      <List disablePadding>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Approach Type:" secondary="" />
            <Typography variant="body2">{course.designType}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Unit Title:" secondary="" />
            <Typography variant="body2">{course.unitTitle}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="School Name:" secondary=""/>
            <Typography variant="body2">{course.schoolName}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Level:" secondary="" />
            <Typography variant="body2">{course.level}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="No. Of Lesson:" secondary="" />
            <Typography variant="body2">{course.noOfLessons}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Description:" secondary="" />
            <Typography variant="body2">{course.courseDes}</Typography>
          </ListItem>
      </List>
    </React.Fragment>
  );
}
export default BasicReview;