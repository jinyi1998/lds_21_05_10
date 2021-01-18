import React, { useState, useEffect } from 'react'
import { DATAAPI } from '../api/api-server'
import Popover from '@material-ui/core/Popover'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton} from '@material-ui/core'
import { Checkbox, Typography, Grid } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import PeopleIcon from '@material-ui/icons/People'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp'
import zIndex from '@material-ui/core/styles/zIndex'
import viewstyle from './viewStyle.js'

// styles for PatternView
const styles = theme => ({
    listRoot: {
        width: '350px',
        height: '700px',
        margin: '5px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
})

// styles for Patterns and Tasks
const useStyles = makeStyles((theme) => ({
    listPattern: {
        // flexDirection: 'column',
        height: "160px",
        margin: '7px 0px',
        border: '1px solid',
        // justifyContent: "center",
    },
    // listPatternAvatar: {
    //     width: '140px',
    //     height: '140px',
    // },
    listItemText:{
        display: 'inline-block',
        width: '100%',
    },
    // listItemMultiline: {
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap',
    //     wordBreak: 'break-all',
    // },
    pageUpDownButton: {
        border: '1px solid',
        padding: '5px',
    },
    listTask: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '15px 0px',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    selectBox:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: '10px',
    },
    selectBar: {
        width: '330px',
        height: '20px',
        // backgroundColor: 'yellow',
    },
    checkRoot: {
        padding: '0px',
        width: '20px',
        height: '20px',
        '&:hover': {
            background: 'none',
        }
    },
    basicInfoIcon: {
        width: 'auto',
        height: 'auto',
        float: 'left',
    },
    basicInfo: {
        width: 'auto',
        height: 'auto',
        float: 'left',
        fontSize: '0.7rem',
        paddingTop: '3px',
        paddingLeft: '1px',
    },
}))

// show the pattern selection view
function Patterns(props) {
    const count = props.allPatterns.length
    // console.log(props.allPatterns)
    // set view state
    const [first, setFirst] = useState(0)
    const classes = useStyles()

    return (
        <React.Fragment>
            {<div align='center'>
                <IconButton style={first === 0 ? { visibility: 'hidden' } : { visibility: 'visible'}} aria-label="page up" classes={{ root: classes.pageUpDownButton }} onClick={() => { setFirst(first > 0 ? first - 1: 0) }}>
                    <ExpandLessIcon />
                </IconButton>
            </div>}
            {props.allPatterns.map((pattern, index) => {
                if(index >= first && index < first + 3 ){
                    return (
                        <ListItem button key={index} classes={{ root: classes.listPattern }} onClick = {() => {props.onPatternNum(index)}}>
                            {/* <ListItemAvatar>
                                <Avatar variant="square" src="/logo512.png" classes={{ root: classes.listPatternAvatar }} />
                            </ListItemAvatar> */}
                            <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemMultiline }}
                                primary={pattern['title'].replace(/.+?:\s/g, "")} />
                        </ListItem>
                    )
                }
            })}
            {<div align='center' style={first >= count - 3 ? { visibility: 'hidden' } : { visibility: 'visible' }}>
                <IconButton aria-label="page down" classes={{ root: classes.pageUpDownButton }} onClick={() => {setFirst(first + 3 >= count ? count - 3: first + 1)}}>
                    <ExpandMoreIcon />
                </IconButton>
            </div>}
        </React.Fragment>
    )
}

// show the task selection view
function Tasks(props) {
    const allTasks = props.allTasks['tasks']
    const count = allTasks.length
    let OBJLesson = {}
    props.lessonList[props.currentLessonIndex]["tasks"].forEach(item => {
        OBJLesson[item["id"]] = true
    })
    const allNotCheck = {}
    allTasks.map((task) => { allNotCheck[task['id'].toString()] = false })
    const allChecked = {}
    allTasks.map((task) => { allChecked[task['id'].toString()] = true })
    // set view state
    const [first, setFirst] = useState(0)
    const [checked, setChecked] = useState(OBJLesson)
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid container spacing={0}>
                <Grid item xs={5}>
                </Grid>
                <Grid item xs={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <IconButton aria-label="page up" classes={{ root: classes.pageUpDownButton }}
                        style={first === 0 ? { visibility: 'hidden' } : { visibility: 'visible' }}
                        onClick={() => { setFirst(first > 0 ? first - 1 : 0) }}>
                        <ExpandLessIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    Select All
                    <Checkbox checked={JSON.stringify(checked) === JSON.stringify(allChecked)}
                        style={{paddingLeft: '5px', color: 'black'}}
                        className={classes.checkRoot}
                        disableRipple
                        icon={<CheckBoxOutlineBlankSharpIcon />}
                        checkedIcon={<CheckBoxSharpIcon />}
                        onChange={(e) => { JSON.stringify(checked) === JSON.stringify(allChecked) ? setChecked(allNotCheck) : setChecked(allChecked)}} />
                </Grid>
            </Grid>

            {allTasks.map((task, index) => {
                if (index >= first && index < first + 3) {
                    const taskOpt = DATAAPI.getTaskOptions(task)
                    return (
                        <ListItem key={index} classes={{ root: classes.listTask }} >
                            <div className={classes.selectBox}>
                                <div className={classes.selectBar} style={{backgroundColor:taskOpt["taskType"]["color"]}}></div>
                                <div>
                                    <Checkbox name={task['id'].toString()} checked={checked[task['id']]}
                                        className={classes.checkRoot} 
                                        disableRipple
                                        icon={<CheckBoxOutlineBlankSharpIcon />} 
                                        checkedIcon={<CheckBoxSharpIcon />}
                                        onChange={(event) => {
                                            console.log(event.target, event.target.checked)
                                            if(!event.target.checked){
                                                props.removeLessonTaskById(event.target.name)
                                            }else{
                                                props.addExampleTask(task)
                                            }
                                            setChecked({...checked, [event.target.name]: event.target.checked})
                                        }}/>
                                </div>
                            </div>
                            
                            <Typography variant="subtitle2">
                                <b>{task['title']}</b>
                            </Typography>

                            <Typography variant="subtitle2">
                                {taskOpt["taskType"]["description"]}
                            </Typography>

                            <Grid container spacing={0}>
                                <Grid item xs={3}>
                                    <span className={classes.basicInfoIcon}><AccessTimeSharpIcon style={{ fontSize: '1.2rem' }}/></span>
                                    <span className={classes.basicInfo}>{taskOpt["time"] + "mins"}</span>
                                </Grid>
                                <Grid item xs={3}>
                                    <span className={classes.basicInfoIcon}><LocationOnIcon style={{ fontSize: '1.2rem' }}/></span>
                                    <span className={classes.basicInfo}>{taskOpt["classType"]["description"]}</span>
                                </Grid>
                                <Grid item xs={3}>
                                    <span className={classes.basicInfoIcon}><LocationSearchingIcon style={{ fontSize: '1.2rem' }}/></span>
                                    <span className={classes.basicInfo}>{taskOpt["classTarget"][0]["description"]}</span>
                                </Grid>
                                <Grid item xs={3}>
                                    <span className={classes.basicInfoIcon}><PeopleIcon style={{ fontSize: '1.2rem' }}/></span>
                                    <span className={classes.basicInfo}>{taskOpt["classSize"][0]["description"]}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className={classes.basicInfoIcon}><AssignmentIcon style={{ fontSize: '1.2rem' }}/></span>
                                    <span className={classes.basicInfo}>{taskOpt["resource"][0] ? taskOpt["resource"][0]["description"] : "N/A"}</span>
                                </Grid>
                                <Grid item xs={6}>
                                    <span className={classes.basicInfoIcon}><ImportantDevicesIcon style={{ fontSize: '1.2rem' }}/></span>
                                    <span className={classes.basicInfo}>{taskOpt["tool"][0] ? taskOpt["tool"][0]["description"] : "N/A"}</span>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )
                }
            })}

            <Grid container spacing={0} >
                <Grid item xs={5}>
                    <IconButton aria-label="return back to pattern view" onClick={() => { props.onSwitchPattern(true) }}>
                        <ArrowBackIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={7} style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <IconButton aria-label="page down" classes={{ root: classes.pageUpDownButton }} style={first >= count - 3 ? { visibility: 'hidden' } : { visibility: 'visible' }} 
                        onClick={() => { setFirst(first + 3 >= count ? count - 3 : first + 1) }}>
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

class PatternView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            isPattern: true,
            patternNum: -1,
        }
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
        this.props.showPatternViewChange(false)
    }

    switchTask = (index) => {
        this.setState({
            isPattern: false,
            patternNum: index
        })
    }

    switchPattern = (sp) => {
        this.setState({
            isPattern: true,
            patternNum: -1
        })
    }
    
    renderPage() {
        const allPatterns = DATAAPI.getComponents()
        if(this.state.isPattern){
            return <Patterns allPatterns={allPatterns} onPatternNum={this.switchTask} />
        }
        else{
            // return <Tasks allTasks={allPatterns[this.state.patternNum]['tasks']} onSwitchPattern={this.switchPattern} addExampleTask={this.props.addExampleTask} />
            return <Tasks removeLessonTaskById={this.props.removeLessonTaskById} showPatternView={this.props.showPatternView} lessonList={this.props.lessonList} currentLessonIndex={this.props.currentLessonIndex} allTasks={allPatterns[this.state.patternNum]['patterns'][0]} onSwitchPattern={this.switchPattern} addExampleTask={this.props.addExampleTask} />
        }
    }
    
    render() {
        const classes = this.props.classes
        return (
            <Popover
                style={viewstyle.patternview}
                open={this.props.showPatternView}
                onClose={this.handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 0, left: 0 }}
            >
                <List component="nav" className={classes.listRoot}>
                    {this.renderPage()}
                </List>
            </Popover>
        )
    }
}

export default withStyles(styles)(PatternView)
