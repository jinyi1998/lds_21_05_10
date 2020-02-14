import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { red } from '@material-ui/core/colors';
import DesignTypeBox from './approachTypeBox';
import {ContextStore} from '../container/designContainer'

const useStyles = makeStyles(theme => ({

    gridList: {
      display: 'flex',
      justifyContent: 'end',
      overflow: 'scroll',
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}));


const DesignType = (props) => {
  const classes = useStyles();
  const [designType, setDesignType] = React.useState([]); 
  const { course, dispatch } = React.useContext(ContextStore);


  async function fetchDesignTypeData() {

    const res = await fetch(
        `http://localhost:8000/api/course/getDesignTypeTemp`,
        {
        method: "GET",
        }
    )
        .then(res => res.json())
        .then(response => {
          setDesignType(response);
    })
    .catch(error => console.log(error));

  }

  React.useEffect(() => {
    fetchDesignTypeData();
  }, []);

  const onClick = (event, value) => {
      // event.preventDefault();
      dispatch({
        type: "DESIGN_TYPE",
        value: value
      });
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose the subject specific design
      </Typography>
      <GridList className={classes.gridList} cols={2.5}>
          {designType.map((_data, i) => (
            <DesignTypeBox designBoxData={_data} key={i} onClick={onClick} >
            </DesignTypeBox>
          ))}
      </GridList>
    </React.Fragment>
  );
}

export default DesignType;