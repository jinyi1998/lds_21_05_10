import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

import {apiUserMgmtDashboard} from '../../../api';


const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: 360,
        padding: 20,
        marginRight: 40
    }
}));

Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小時
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" +  k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +  o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  

const UserMgmtDashboardContainer = (props) => {

    const classes = useStyles();
    const [todayUser, setTodayUser] = React.useState([]);
    const [sevenDaysUser, setSevenDaysUser] = React.useState([]);
    const [lineData, setLineData] = React.useState(initLineData());

    function initLineData() {
        var lables = [];
        var data = [];
        for (var i=6; i>-1; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            lables.push(d.format("yyyy-MM-dd"))
            if( sevenDaysUser.filter( _userlables => _userlables['date'] == d.format("yyyy-MM-dd")).length > 0){
                data.push( sevenDaysUser.filter( _userlables => _userlables['date'] == d.format("yyyy-MM-dd"))[0]['user_count'] );
            }else{
                data.push(0)
            }
        }
        
        var result = { 
            labels: lables,
            datasets: [{
                label: "# Users per day",
                // lineTension: 1,
                backgroundColor: 'rgb(10, 186, 181)',
                borderColor: 'rgb(10, 186, 181)',
                data: data,
            }]
        } ;
        return result;
    }

    const fetchUserData = () => {
        apiUserMgmtDashboard().then( response => {
            handleUserData(response.data);
        })
        .catch(error => console.log(error))
    }


    const handleUserData = (data) => {
        setTodayUser(data.today_users);
        setSevenDaysUser(data.seven_days_users);
    }


    React.useEffect(()=>{
        fetchUserData();
    }, [])

    React.useEffect(()=>{
        var result = initLineData();
        setLineData(result);
    }, [sevenDaysUser])


    return (
        <Grid container spacing = {2}>
            <Grid item xs = {4}>
                <Paper className = {classes.paper}>  
                    <Typography variant="h6" gutterBottom color = "primary">
                        Today Learning Designer
                    </Typography>

                    <Typography variant="h4" gutterBottom color = "inherit">
                       {todayUser.length}
                    </Typography>

                    <Typography variant="body1" gutterBottom color = "textPrimary">
                        {todayUser.length >0 ? todayUser[0].name : "No new user today"}
                    </Typography>

                    <Typography variant="caption" gutterBottom color = "textSecondary">
                        {todayUser.length >0 ? '@' + todayUser[0].school: null}
                    </Typography>

                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        On {new Date().toLocaleDateString()}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs = {8}>
                <Paper className = {classes.paper}>
                    <Typography variant="h6" gutterBottom color = "primary">
                        Last 7 days Learning Designer
                    </Typography>


                    <Line data = {lineData} />
                </Paper>
            </Grid>

        </Grid>
    );
}

export default UserMgmtDashboardContainer;