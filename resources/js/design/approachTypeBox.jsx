import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import CardActionArea from '@material-ui/core/CardActionArea';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    card: {
        padding: 10,
        maxWidth: 400,
        minWidth: 300,
        overflow: 'scroll'
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain'
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
}));

const DesignTypeBox = (props) => {

    const classes = useStyles();
    const {designBoxData, onClick} = props;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={ (event)=>onClick(event, designBoxData.id)} 
            value={designBoxData.id}
            data-tour = {"designtype_action_" +  designBoxData.id}
            name="subject">
                <CardMedia
                    className={classes.media}
                    image={designBoxData.media}
                />
                <CardHeader
                    title={designBoxData.name}
                    data-tour = {"designtype_title_" + designBoxData.id}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {designBoxData.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
          
            <CardActions disableSpacing>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Hint:</Typography>
                <Typography paragraph>
                    {designBoxData.hint}
                </Typography>
                </CardContent>
            </Collapse>
        </Card>
      );
}
export default DesignTypeBox;