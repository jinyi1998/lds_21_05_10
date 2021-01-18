import { DATAAPI } from '../api/api-server'
import Button from '@material-ui/core/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

// styles for Lesson View
const styles = theme => ({
    listRoot: {
        width: '350px',
        height: '700px',
        margin: '5px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
})

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    piproot: {
        flexGrow: 1,
      },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    iconRight: {
        textAlign: 'right',
    },
    choicePanel:{
        display:"inline-grid",
        position: "absolute"
    }

}))

const getListStyle = isDraggingOver => ({
    background: 'none',
    overflowX: "auto",
    overflowY: "hidden",
    display: 'flex',
    paddingBottom: "5px",
});

const getItemStyle = (isDragging, draggableStyle, otherStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    color: "white",
    padding: 5,
    margin: `0 5px 0 0`,
    fontSize: '10px',
    height: "42px",
    // minWidth: "240px",
    borderRadius: "5px",
    minWidth: "300px",
    maxWidth: "300px",
    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'grey',
    // styles we need to apply on draggables
    ...draggableStyle,
    ...otherStyle,
});

/* Lesson switch buttons */
function LessonButtonGroup(props) {
    const classes = useStyles()
    const [currentlesson, setCurrentlesson] = useState(0)
    
    return (
        <div className={classes.root}>
            <ButtonGroup aria-label="small outlined button group">
                {props.lessonList.map((item, index) => {
                    return(
                    <Button 
                            variant={index===currentlesson?"contained":"text"}
                            color="primary"
                            onClick={() => {props.lessonChange(index);setCurrentlesson(index);}}
                            >Lesson {index+1}
                    </Button>)
                })}
                <Button
                    variant={-1===currentlesson?"contained":"text"}
                    color="primary"
                    onClick={() => {props.lessonChange(-1);setCurrentlesson(-1);}}
                >All Lessons</Button>
            </ButtonGroup>
        </div>
    )
}

/* Lesson Pre-In-Post buttons */
function LessonPreInPostClass(props) {
    const classes = useStyles()
    const [showtaskPanel, setShowtaskPanel] = useState(-1)
    useEffect(() => {
        function handleClickOutside(event) {
            setShowtaskPanel(-1)
        }
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [showtaskPanel]);
    return (
        <React.Fragment>
            <div className={classes.piproot}>
                <Grid container spacing={1}>
                    <Grid item xs={2} sm={4}>
                        <Paper className={classes.paper}>Pre-Class
                        <IconButton aria-label="AddBoxIcon">
                            <AddBoxIcon className={classes.iconRight} onClick={()=>{setShowtaskPanel(0)}}/>
                        </IconButton>
                        {showtaskPanel==0?(<AddTaskPanel setShowPatternView={() => props.setShowPatternView(1)} addEmptyTask={props.addEmptyTask}></AddTaskPanel>):""}
                        </Paper>
                    </Grid>
                    <Grid item xs={2} sm={4}>
                        <Paper className={classes.paper}>In-Class
                        <IconButton aria-label="AddBoxIcon">
                            <AddBoxIcon className={classes.iconRight} onClick={()=>{setShowtaskPanel(1)}}/>
                        </IconButton>
                        {showtaskPanel==1?(<AddTaskPanel setShowPatternView={() => props.setShowPatternView(2)} addEmptyTask={props.addEmptyTask}></AddTaskPanel>):""}
                        </Paper>
                    </Grid>
                    <Grid item xs={2} sm={4}>
                        <Paper className={classes.paper}>Post-Class
                        <IconButton aria-label="AddBoxIcon">
                            <AddBoxIcon className={classes.iconRight} onClick={()=>{setShowtaskPanel(2)}}/>
                        </IconButton>
                        {showtaskPanel==2?(<AddTaskPanel setShowPatternView={() => props.setShowPatternView(3)} addEmptyTask={props.addEmptyTask}></AddTaskPanel>):""}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
} 

/* Reorder function for drag items in draggable components */
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/* Lesson task list with draggable components */
function LessonTaskList(props){
    const [dragEndItems, setDragEndItems] = useState([])
    let v = props.currentTasks
    useEffect(() => {
        if(props.currentTasks && props.currentTasks.length >= 0){
             setDragEndItems(props.currentTasks)
        }
    }, [v])
    return(
        <React.Fragment>
            <DragDropContext onDragEnd={(result) => {
                if (!result.destination) {
                    return;
                }
                const items = reorder(
                    dragEndItems,
                    result.source.index,
                    result.destination.index
                );
                setDragEndItems(items)
                props.resetTaskOrder(items)
            }}>
                <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                    {dragEndItems.map((item, index) => {
                        const taskOpt = DATAAPI.getTaskOptions(item)
                        item.currentTaskId = index; 
                        return (<Draggable 
                                    isDragDisabled={true}
                                    key={""+item.id} 
                                    draggableId={""+item.id} 
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                        onClick={() => {props.setShowEditionView(true); props.taskChange(item.id);}}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            {backgroundColor:taskOpt["taskType"]["color"]})}
                                        >
                                        {item.title}
                                        </div>
                                    )}
                                </Draggable>)
                    })}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
        </React.Fragment>
    )
}

/* 3 types of task list in one lesson */
function LessonTask(props){
    const classes = useStyles()
    let preclass = props.lessonList[props.currentLessonIndex]?props.lessonList[props.currentLessonIndex].tasks.filter(item => item["lessonid"]["lessontype"] == 1):[]
    let inclass = props.lessonList[props.currentLessonIndex]?props.lessonList[props.currentLessonIndex].tasks.filter(item => item["lessonid"]["lessontype"] == 2):[]
    let postclass = props.lessonList[props.currentLessonIndex]?props.lessonList[props.currentLessonIndex].tasks.filter(item => item["lessonid"]["lessontype"] == 3):[]
    return (
        <React.Fragment>
            <div className={classes.piproot}>
                <Grid container spacing={1}>
                    <Grid item xs={1} sm={4}>
                        <LessonTaskList currentTasks={preclass} taskChange={props.taskChange} lessonList={props.lessonList} currentLessonIndex={props.currentLessonIndex} resetTaskOrder={(tasks)=>{props.resetTaskOrder(tasks)}} setShowEditionView={props.setShowEditionView}></LessonTaskList>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <LessonTaskList currentTasks={inclass} taskChange={props.taskChange} lessonList={props.lessonList} currentLessonIndex={props.currentLessonIndex} resetTaskOrder={(tasks)=>{props.resetTaskOrder(tasks)}} setShowEditionView={props.setShowEditionView}></LessonTaskList>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <LessonTaskList currentTasks={postclass} taskChange={props.taskChange} lessonList={props.lessonList} currentLessonIndex={props.currentLessonIndex} resetTaskOrder={(tasks)=>{props.resetTaskOrder(tasks)}} setShowEditionView={props.setShowEditionView}></LessonTaskList>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

function AddTaskPanel(props){
    const classes = useStyles()
    return(
        <React.Fragment>
                <ButtonGroup 
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical contained primary button group"
                    variant="contained"
                    className={classes.choicePanel}>
                    <Button variant="contained">Add Task</Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        onMouseDown={() => {props.setShowPatternView(true)}}
                    >Choose CC</Button>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        onMouseDown={() => {props.addEmptyTask()}}
                    >ADD Blank Task</Button> */}
                </ButtonGroup>
        </React.Fragment>
    )
}

class LESSONVIEW extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <LessonButtonGroup lessonList={this.props.lessonList} 
                    currentLessonIndex={this.props.currentLessonIndex} 
                    lessonChange={this.props.changeLessonIndex}/>
                <LessonPreInPostClass setShowPatternView={this.props.showPatternViewChange} 
                    addEmptyTask={this.props.addEmptyTask}>
                </LessonPreInPostClass>
                <LessonTask 
                    lessonList={this.props.lessonList} 
                    currentLessonIndex={this.props.currentLessonIndex} 
                    resetTaskOrder={this.props.resetTaskOrder} 
                    setShowEditionView={this.props.setShowEditionView}
                    currentTaskId={this.props.currentTaskId}
                    taskChange={this.props.changeTaskIndex} >
                </LessonTask>
            </React.Fragment>)
    }
}

export default withStyles(styles)(LESSONVIEW)