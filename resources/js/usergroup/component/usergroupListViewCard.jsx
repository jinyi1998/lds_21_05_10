import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

const UsergroupListViewCard = (props) => {
    const [usergroup, setUsergroup] = React.useState(props.usergroup);
    const [joinStatus, setJoinStatus] = React.useState(3);
    const {userJoinUsergroup, setJoinGroupWarningOpen} = props;

    React.useEffect(()=>{
        setUsergroup(props.usergroup)
    }, [props])


    React.useEffect(()=>{
        if(usergroup.userid.filter(x => x.user_id == props.user.id).length > 0){
            setJoinStatus(1);
        }else if(usergroup.useridtemp.filter(x => x.user_id == props.user.id).length > 0){
            setJoinStatus(2);
        }else{
            setJoinStatus(3);
        }
    }, [usergroup])


    const onClickJoinGroup = () => {
        userJoinUsergroup(usergroup.id)
    }

    const onClickGroup = () => {   
        if(usergroup.userid.filter(x => x.user_id == props.user.id).length > 0){
            window.location.href = "/usergroup/"+usergroup.id;
        
        }else{
            //you have no right to enter this group
            setJoinGroupWarningOpen(true)
        }
    }

    return (
        <Card>
            <CardActionArea onClick = {onClickGroup}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="https://na.cx/i/TfT33Ln.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {usergroup.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {usergroup.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            {
            joinStatus == 1?  
            <Button size="small" color="primary"  startIcon={<DoneIcon />} disabled>
                Joined
            </Button>
            :
            joinStatus == 2?  
            <Button size="small" color="primary"  startIcon={<DoneIcon />} disabled>
                Waiting Approval
            </Button>
            :
            <Button size="small" color="primary" onClick = {onClickJoinGroup}>
                Join Group
            </Button>
            }
           
          
            </CardActions>
      </Card>
    )
}
export default UsergroupListViewCard;
