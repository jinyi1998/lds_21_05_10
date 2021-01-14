import React from 'react'
import { DATAAPI } from '../api/api-server'
import styles from './viewStyle.js'
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Edit from '@material-ui/icons/Edit';

// need to modify to achieve a good animation
const zoomWidthChange = 35
// judge whether the task is selected
const selectedStyle = '2px solid rgb(240, 128, 128)'


const maxWidth = 300
const minWidth = 80
const widthRange5min = [minWidth, minWidth]
const widthRange10or15min = [minWidth, 160]
const widthRangeInClass = [minWidth, 160]
const widthRangeLesson = [120, 120]

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const THREE_HOUR = ONE_HOUR * 3;

// for relative time
// original time: lesson 0, start 0
const originTimeInMS = 0
// inTime: lesson 1, start from pre-class
const inALesson = 0
const inATime = inALesson * THREE_HOUR

let timeGap = []
let unitWidthGap = [
    widthRange5min,
    widthRange10or15min, 
    widthRangeInClass,
    widthRangeLesson
]
let defaultTimeGap = 2 // 30min


const grouidxToTarget = [3, 2, 4, 1] // ['Whole Class', 'Group', 'Individual', 'Peer', ]


class TABLEVIEW extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            lessons: [],
            // origin Time relative to the border of background; negative
            // timeStart: (originTimeInMS - inATime) / timeGap[defaultTimeGap] * styles.unit.width, 
            timeStart: 0,
            unitWidth: styles.unit.width,
            showTimeGap: defaultTimeGap,
        }
        this.dragTimeStartX = 0
        this.zoomTimeStartX = 0
        this.prevUnitWidth = styles.unit.width // judge whether happened a zoom operation just now

        // for zooming
        this.mouseOnTime = -1
        this.mouseOnTimeOffsetX = -1 

        // for change time duration
        this.changeTaskDurationStartX = 0
        this.changeTaskDurationBorder = ''
        this.groupIdxDuration = -1
        this.taskIdxDuration = -1

        // for drag and drop task
        this.groupIdx = -1
        this.taskIdx = -1
        this.contentTop = -1
        this.changeGroupStartX = 0
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.showTimeGap>=0 && timeGap[this.state.showTimeGap]>=0){
            let atime = nextProps.currentLessonIndex * ONE_HOUR * 5
            let st = (originTimeInMS - atime) / timeGap[defaultTimeGap] * styles.unit.width

            this.setState({
                showTimeGap: defaultTimeGap,
                timeStart: st,
                unitWidth: styles.unit.width
            })
        }
        if(nextProps.lessonList){
            let tmplesson = this.getLessons(nextProps.lessonList)
            this.setState({
                tasks: this.transformLesson2Task(nextProps.lessonList),
                // lessonList: nextProps.lessonList, //nextProps.lessonList,
                lessons: tmplesson
            });
        }
    }

    transformTask2Lesson(tasks){
        tasks.map((group, groupIdx)=>{
            group.map((task, taskIdx) => {
               task.groupid = groupIdx
            })
        })

        let AllTasks = []
        for(let i=0; i<4; i++)
            AllTasks = AllTasks.concat(tasks[i])
        
        let lessonListtmp = Object.assign({}, this.props.lessonList)
        lessonListtmp =  Object.values(lessonListtmp)


        for(let lessoni=0; lessoni<this.props.lessonList.length; lessoni++){
            let currentLesson = this.props.lessonList[lessoni]
            let maxEnd = 0

            for(let taski=0; taski < currentLesson.tasks.length; taski++){

                let currentTask = currentLesson['tasks'][taski]
                // if this tasks in the transform tasks?
                let index = AllTasks.findIndex(task => task['id'] === currentTask.id && task['lesson'] == lessoni)

                
                // the index of this tasks in the lessonlist
                let taskTmp = lessonListtmp[lessoni]['tasks']
                let taskIdx = taskTmp.findIndex(currenttask => currenttask['id'] === currentTask.id)
                taskIdx = parseInt(taskIdx)

                if(index == -1){
                    // delete task
                    taskTmp.splice(taskIdx, 1)

                    // delete taskid 
                    let tasksidTmp = lessonListtmp[lessoni]["tasksid"]
                    let taskidIdx = tasksidTmp.findIndex(currenttaskid => currenttaskid['task_id'] === currentTask.id)
                    tasksidTmp.splice(parseInt(taskidIdx), 1)

                    lessonListtmp[lessoni]["tasksid"] = tasksidTmp

                }
                else{
                    // change time duration, target, and description(to start)
                    taskTmp[taskIdx].time =  Math.floor(AllTasks[index].duration / 60000)
                    taskTmp[taskIdx].target = grouidxToTarget[AllTasks[index].groupid]
                    taskTmp[taskIdx]['lessonid']['starttime'] = AllTasks[index].startToLesson
                    // to reoroder the tasks in lessonview
                    taskTmp[taskIdx].startToLesson = AllTasks[index].startToLesson
                    taskTmp[taskIdx]['lessonid']['lessontype'] = AllTasks[index].classType=='preClass' ? 1 : (AllTasks[index].classType=='inClass' ? 2: 3)
                
                }
                
                lessonListtmp[lessoni]["tasks"] = taskTmp

            }

            let tasks_after =  Object.assign({}, lessonListtmp[lessoni].tasks)
            // console.log('tasks_after', tasks_after)
            // console.log(type(tasks_after))
            tasks_after =  Object.values(tasks_after)
            tasks_after = tasks_after.sort(function(a, b){
                // let a_toStartIndex = (a.description).indexOf('toStart:')
                // let b_toStartIndex = (b.description).indexOf('toStart:')
                // let a_startToLesson = (a.description).substr(a_toStartIndex + 8,)
                // let b_startToLesson = (b.description).substr(b_toStartIndex + 8,)
                // return parseInt(a_startToLesson) - parseInt(b_startToLesson)
                return a.startToLesson - b.startToLesson
            });
            // delete tasks_after.startToLesson 
            lessonListtmp[lessoni]["tasks"] = tasks_after
        }
        // delete obj.hobby 
        //  console.log('lessonListtmp',lessonListtmp)
         return lessonListtmp

        // console.log(tasks)
        /* 从 task list 还原到 lesson list */

    }

    transformLesson2Task(lessons){
    	let idvTasks = []
        let groupTasks = []
        let peerTasks = []
        let wholeTasks = []
        // let lessons = DATAAPI.courseinfo["lessons"]
        // console.log(lessons)
    	let allTaskTime = 0
    	for(let lessoni = 0; lessoni < lessons.length; lessoni ++){
    		let tasks = lessons[lessoni].tasks
    		let startToLesson = 0
    		let maxEnd = 0
    		for (let taski = 0; taski < tasks.length; taski++){
    			let currentTask = tasks[taski]
	            let groupid =  parseInt(currentTask.target)
	            const taskOpt = DATAAPI.getTaskOptions(currentTask)
	            let startToLesson = currentTask['lessonid']['starttime']
                if(currentTask["lessonid"]["lessontype"] == 2 && startToLesson == 0)
                    startToLesson += 2* 60 * DATAAPI.ONE_MINUTE
                if(currentTask["lessonid"]["lessontype"] == 3 && startToLesson == 0)
                    startToLesson += 3* 60 * DATAAPI.ONE_MINUTE
	            let tool = taskOpt["tool"]
	            let tableTask = {
	            	id: currentTask.id,
	            	lesson: lessoni,
	            	startToLesson: startToLesson,
	            	start: lessoni * 5 * 60 * DATAAPI.ONE_MINUTE + startToLesson,
	                group: DATAAPI.groupName[groupid - 1],
                    groupid: groupid -1,
	                duration: currentTask.time * DATAAPI.ONE_MINUTE,
	                tool: tool.length == 0? 'No Tools': ((taskOpt["tool"].map((tool)=> {return tool.description})).join('+')),
	                desc: currentTask.title.length>0?currentTask.title:"No title",
	                bgColor:  taskOpt["taskType"]["color"],
                    resource: DATAAPI.getResourceIcon(currentTask),//'logo192.png',
                    classType: currentTask["lessonid"]["lessontype"]==1?"preClass":(currentTask["lessonid"]["lessontype"]==2?"inClass":"postClass")
	            }
	            if(groupid == 3)
	                idvTasks.push(tableTask)
	            if(groupid == 2)
	                groupTasks.push(tableTask)
	            if(groupid == 4)
	                peerTasks.push(tableTask)
	            if(groupid == 1)
	                wholeTasks.push(tableTask)
    		}
    	}
    	let tasks_after =  [idvTasks, groupTasks, peerTasks, wholeTasks]
        return tasks_after
    }

    getLessons(lessons){
        const ONE_SECOND = 1000;
        const ONE_MINUTE = ONE_SECOND * 60;
        const ONE_HOUR = ONE_MINUTE * 60;
        const THREE_HOUR = ONE_HOUR * 3;
        let defaultInClass = 60 * ONE_MINUTE
        // let unitCnt = defaultInClass * 5 / timeGap[defaultTimeGap]
        // let newUnitWidth = styles.right.width / unitCnt
        // allow the defaultInClass to be times of 10 or 15
        if (defaultInClass % (15 * ONE_MINUTE) === 0) {
            timeGap = [
                5 * ONE_MINUTE,
                15 * ONE_MINUTE,
                defaultInClass,
                5 * defaultInClass
            ]
        }
        else if (defaultInClass % (10 * ONE_MINUTE) === 0){
            timeGap = [
                5 * ONE_MINUTE,
                10 * ONE_MINUTE,
                defaultInClass,
                5 * defaultInClass
            ]
        }
        else {
            console.log('Error! the lesson duration cannot be timed by 10 or 15 min!')
        }
        // pre and post class will be doubled than in class 
        return lessons.map((item,index) => {
            return {
                'id': item["id"],
                'title': item["title"],
                'preClass': 2 * defaultInClass,
                'inClass': defaultInClass,
                'postClass': 2 * defaultInClass,
                'duration': defaultInClass * 5,
                'allPrevLessonDuration': index * 5 * defaultInClass,
            }
        })
    }

    dragTimeStart = (e) => {
        // dragTimeStartX: record the start mouse position, only allow horizontal drags
        this.dragTimeStartX = e.clientX
        // render the layout while dragging
        document.onmousemove = this.draggingTime
        e.target.style.cursor = 'move'
        // console.log('drag time start:', e.target, e.currentTarget)
    }

    dragTimeEnd = (e) => {
        document.onmousemove = null
        e.target.style.cursor = 'default'
        // e.stopPropagation()
        // console.log('drag time end:', e.currentTarget)
    }

    draggingTime = (e) => {
        const val = e.clientX
        // mouse movement: e.clientX - this.dragTimeStartX
        this.setState((prevState) => {
            // cannot drag time before the first lesson
            let newTimeStart = prevState.timeStart + (val - this.dragTimeStartX)
            // newTimeStart = newTimeStart > 0 ? 0 : newTimeStart
            // cannot drag time after the final lesson
            // let finalLesson = this.state.lessons[this.state.lessons.length-1]
            // let maxTimeStart = (originTimeInMS - (finalLesson.allPrevLessonDuration + finalLesson.duration)) / timeGap[this.state.showTimeGap] * this.state.unitWidth
            // timeStart is negative
            // newTimeStart = newTimeStart < maxTimeStart ? maxTimeStart : newTimeStart
            // console.log('in dragging time:', newTimeStart, maxTimeStart, this.state.unitWidth)
            return ({
                timeStart: newTimeStart,
            })
        })
        this.dragTimeStartX = val
        // e.stopPropagation()
    }

    zoomTime = (e) => {
        // record the mouse position
        this.zoomTimeStartX = e.clientX - e.currentTarget.getBoundingClientRect().left
        const gap = timeGap[this.state.showTimeGap]
        if (e.nativeEvent.deltaY <= 0) {
            this.setState((prevState) => {
                this.mouseOnTime = Math.floor((this.zoomTimeStartX - prevState.timeStart) / prevState.unitWidth) * gap + originTimeInMS
                this.mouseOnTimeOffsetX = (this.mouseOnTime - originTimeInMS) / gap * prevState.unitWidth + prevState.timeStart
                let newUnitWidth = prevState.unitWidth + zoomWidthChange
                let newShowTimeGap = prevState.showTimeGap
                if (newUnitWidth > unitWidthGap[prevState.showTimeGap][1]){
                    newShowTimeGap = prevState.showTimeGap - 1 >= 0 ? prevState.showTimeGap - 1 : 0
                    newUnitWidth = unitWidthGap[newShowTimeGap][0] // change to minWidth of the upper state
                }
                let newTimeStart = (this.mouseOnTime - originTimeInMS) / timeGap[newShowTimeGap] * newUnitWidth - this.mouseOnTimeOffsetX
                // console.log('newTimeStart:', newTimeStart)
                // console.log('mouseOnTime:', new Date(this.mouseOnTime))
                return ({
                    timeStart: -newTimeStart,
                    unitWidth: newUnitWidth,
                    showTimeGap: newShowTimeGap,
                })
            })
            // console.log('zoom-in')
        } else {
            this.setState((prevState) => {
                this.mouseOnTime = Math.floor((this.zoomTimeStartX - prevState.timeStart) / prevState.unitWidth) * gap + originTimeInMS
                this.mouseOnTimeOffsetX = (this.mouseOnTime - originTimeInMS) / gap * prevState.unitWidth + prevState.timeStart
                let newUnitWidth = prevState.unitWidth - zoomWidthChange
                let newShowTimeGap = prevState.showTimeGap
                if (newUnitWidth < unitWidthGap[prevState.showTimeGap][0]) {
                    newShowTimeGap = prevState.showTimeGap + 1 <= timeGap.length - 1 ? prevState.showTimeGap + 1 : timeGap.length - 1
                    newUnitWidth = unitWidthGap[newShowTimeGap][1] // change to maxWidth of the lower state
                }
                let newTimeStart = (this.mouseOnTime - originTimeInMS) / timeGap[newShowTimeGap] * newUnitWidth - this.mouseOnTimeOffsetX
                // console.log('newShowTimeGap', newShowTimeGap)
                // console.log('newTimeStart:', newTimeStart)
                // console.log('mouseOnTime:', new Date(this.mouseOnTime))
                return ({
                    timeStart: -newTimeStart,
                    unitWidth: newUnitWidth,
                    showTimeGap: newShowTimeGap,
                })
            })
            // console.log('zoom-out')
        }

    }

    // careful!!
    handleTaskSelection = (e) => {
        // if this click makes the task is selected, then handle delete and edit
        console.log("handleTaskSelection",e.currentTarget.parentNode)
        if (e.currentTarget.parentNode.style.border !== selectedStyle) {
            e.currentTarget.parentNode.style.border = selectedStyle
            e.currentTarget.parentNode.nextElementSibling.style.display = 'inline'
        }
        else {
            e.currentTarget.parentNode.style.border = styles.taskBorder.border
            e.currentTarget.parentNode.nextElementSibling.style.display = 'none'
        }
    }
    
    changeTaskDurationCursor = (e) => {
        if (e.currentTarget === e.target && e.currentTarget.style.border === selectedStyle) {
            e.target.style.cursor = 'ew-resize'
        }
        else {
            e.target.style.cursor = 'default'
        }
    }

    changeTaskDurationStart = (e) => {
        if (e.target.style.cursor === 'ew-resize'){
            this.changeTaskDurationStartX = e.clientX
            if (this.changeTaskDurationStartX >= e.target.getBoundingClientRect().left + 2){
                this.changeTaskDurationBorder = 'right'
            }
            else{
                this.changeTaskDurationBorder = 'left'
            }

            let tmp = this.state.tasks
            let task_id = Number(e.target.parentNode.id.slice(4))
            for (let g in tmp) {
                let idx = tmp[g].findIndex(task => task['id'] === task_id)
                if (idx !== -1) {
                    this.groupIdxDuration = g
                    this.taskIdxDuration = idx
                    break
                }
            }
            if(this.groupIdxDuration !== -1 && this.taskIdxDuration !== -1){
                document.onmousemove = this.changeTaskDuration
            }
            e.preventDefault()
            e.stopPropagation()
        }
    }

    changeTaskDurationEnd = (e) => {

        let tmp = this.state.tasks
        if (this.groupIdxDuration !== -1 && this.taskIdxDuration !== -1 && this.changeTaskDurationBorder !== '')
        {
            let groupIdx = this.groupIdxDuration
            let taskIdx = this.taskIdxDuration
            let transformLesson =  this.transformTask2Lesson(tmp)
            this.props.changeLessonList(transformLesson,tmp[groupIdx][taskIdx])
        }

        document.onmousemove = null
        this.groupIdxDuration = -1
        this.taskIdxDuration = -1
        this.changeTaskDurationBorder = ''
        e.target.style.cursor = 'default'
        e.stopPropagation()
    }

    changeTaskDuration = (e) => {
        let tmp = this.state.tasks
        if (this.groupIdxDuration !== -1 && this.taskIdxDuration !== -1 && this.changeTaskDurationBorder !== ''){
            let groupIdx = this.groupIdxDuration
            let taskIdx = this.taskIdxDuration

            const diff = e.clientX - this.changeTaskDurationStartX
            const gap = timeGap[this.state.showTimeGap]
            
            let change = Math.floor(Math.abs(diff / this.state.unitWidth * gap))
            // the change should be never larger than the duration
            change = change > tmp[groupIdx][taskIdx].duration ? tmp[groupIdx][taskIdx].duration : change
            // console.log('change:', this.changeTaskDurationBorder, change / ONE_MINUTE, tmp[groupIdx][taskIdx].duration / ONE_MINUTE, diff)
            if (this.changeTaskDurationBorder === 'left') {
                if (diff > 0) { // drag the left border (start time) to the right => task begins later, shorten duration
                    // the task should last at least one minute
                    change = tmp[groupIdx][taskIdx].duration - change > ONE_MINUTE ? change : tmp[groupIdx][taskIdx].duration - ONE_MINUTE
                    tmp[groupIdx][taskIdx].startToLesson += change
                    tmp[groupIdx][taskIdx].start += change
                    tmp[groupIdx][taskIdx].duration -= change
                }
                else { // drag the left border (start time) to the left => task begins earlier, duration gets longer
                    // the task should be within the specific class type
                    let thisLesson = this.state.lessons[tmp[groupIdx][taskIdx].lesson]
                    let dist = tmp[groupIdx][taskIdx].startToLesson // the initial dist is assumed that the task in preClass
                    if (tmp[groupIdx][taskIdx].classType === 'inClass'){
                        dist = tmp[groupIdx][taskIdx].startToLesson - thisLesson.preClass
                    }
                    else if (tmp[groupIdx][taskIdx].classType === 'postClass') {
                        dist = tmp[groupIdx][taskIdx].startToLesson - thisLesson.preClass - thisLesson.inClass
                    }
                    change = change > dist ? dist : change
                    tmp[groupIdx][taskIdx].startToLesson -= change
                    tmp[groupIdx][taskIdx].start -= change
                    tmp[groupIdx][taskIdx].duration += change
                }
            }
            else { 
                if (diff > 0){ // drag the right border to the right => just extend the duration
                    tmp[groupIdx][taskIdx].duration += change
                    // the task should never extend out of a specific class type
                    let thisLesson = this.state.lessons[tmp[groupIdx][taskIdx].lesson]
                    let dist = thisLesson.preClass // the initial dist is assumed that the task in preClass
                    if (tmp[groupIdx][taskIdx].classType === 'inClass') {
                        dist += thisLesson.inClass
                    }
                    else if (tmp[groupIdx][taskIdx].classType === 'postClass') {
                        dist = thisLesson.duration 
                    }
                    tmp[groupIdx][taskIdx].duration = tmp[groupIdx][taskIdx].startToLesson + tmp[groupIdx][taskIdx].duration > dist ? dist - tmp[groupIdx][taskIdx].startToLesson : tmp[groupIdx][taskIdx].duration
                }
                else { // drag the right border to the left => just shorten the duration
                    // the task should last at least one minute
                    change = tmp[groupIdx][taskIdx].duration - change > ONE_MINUTE ? change : tmp[groupIdx][taskIdx].duration - ONE_MINUTE
                    tmp[groupIdx][taskIdx].duration -= change
                }
            }
            // console.log('after:', tmp[groupIdx][taskIdx])
            this.setState({
                tasks: tmp
            })
           
            this.changeTaskDurationStartX = e.clientX
            
        }
    }

    deleteTask = (groupIdx, taskIdx, e) => {
        // const task_id = Number(e.currentTarget.parentNode.id.slice(4))
        let tmp = this.state.tasks
        /****************************** */
        // this.transformTask2Lesson(tmp)
        let lesson = tmp[groupIdx][taskIdx].lesson

        tmp[groupIdx].splice(taskIdx, 1)   
        let transformLesson =  this.transformTask2Lesson(tmp)
        this.props.changeLessonList(transformLesson, lesson, true)
        /****************************** */
        this.setState({
            tasks: tmp
        })
        
    }

    callTaskEdit = (groupIdx, taskIdx, e) => {
        console.log(groupIdx, taskIdx, e, this.state)
        console.log("lesson:", this.state["tasks"][groupIdx][taskIdx])
        this.props.changeLessonIndex(this.state["tasks"][groupIdx][taskIdx]["lesson"])
        this.props.changeTaskIndex(this.state["tasks"][groupIdx][taskIdx]["id"])
        this.props.setShowEditionView(true)
    }

    dragTaskStart = (e) => {
        // console.log('change group start', e.target)
        // if (e.target.className.slice(0, 4) === 'task' && e.currentTarget.parentNode.style.border === selectedStyle){
        if (e.target.className.slice(0, 4) === 'task') {
            let task_id = Number(e.target.className.slice(4))
            let tmp = this.state.tasks
            for (let g in tmp) {
                let idx = tmp[g].findIndex(task => task['id'] === task_id)
                if (idx !== -1) {
                    this.groupIdx = g
                    this.taskIdx = idx
                    break
                }
            }
            if (this.groupIdx !== -1 && this.taskIdx !== -1) {
                e.target.style.cursor = 'grabbing'
                this.changeGroupStartX = e.clientX
                this.contentTop = e.currentTarget.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect().top
                document.onmousemove = this.dragTask
            }
            e.preventDefault()
            e.stopPropagation()
        }
    }

    dragTaskEnd = (e) => {
        let tmp = this.state.tasks
        let groupIdx = Number(this.groupIdx)
        let taskIdx = Number(this.taskIdx)
        if(groupIdx !== -1 && taskIdx !== -1){
            /****************************** */
            // this.transformTask2Lesson(tmp)
            let transformLesson =  this.transformTask2Lesson(tmp)
            this.props.changeLessonList(transformLesson, tmp[groupIdx][taskIdx])
            /****************************** */
            // this.props.changeTaskDuration(groupIdx, taskIdx, tmp)
        }

        
        document.onmousemove = null
        this.groupIdx = -1
        this.taskIdx = -1
        e.target.style.cursor = 'default'
        // console.log('End:', e.clientX)
        e.stopPropagation()
    }

    dragTask = (e) => {
        const groupName = ['Individual', 'Group', 'Peer', 'Whole Class']
        let tmp = this.state.tasks
        let groupIdx = Number(this.groupIdx)
        let taskIdx = Number(this.taskIdx)
        if(groupIdx !== -1 && taskIdx !== -1){
            let task = tmp[groupIdx][taskIdx]

            let newGroupIdx = Math.floor((e.clientY - this.contentTop) / styles.group.height)
            newGroupIdx = newGroupIdx < 0 ? 0 : newGroupIdx
            newGroupIdx = newGroupIdx > groupName.length - 1 ? groupName.length - 1 : newGroupIdx

            const gap = timeGap[this.state.showTimeGap]
            let diff = e.clientX - this.changeGroupStartX
            let newStart = Math.floor(diff / this.state.unitWidth * gap) + task.start

            // the drag task should be within the class type (pre/in/post) in the lesson
            // based on the task type and compute the start time and end time of the class type
            let classStart = this.state.lessons[task.lesson].allPrevLessonDuration
            let classEnd = classStart
            if (task.classType === "preClass"){
                classEnd = classStart + this.state.lessons[task.lesson].preClass
            }
            else if (task.classType === "inClass") {
                classStart = classStart + this.state.lessons[task.lesson].preClass
                classEnd = classStart + this.state.lessons[task.lesson].inClass
            }
            else if (task.classType === "postClass") {
                classStart = classStart + this.state.lessons[task.lesson].preClass + this.state.lessons[task.lesson].inClass
                classEnd = classStart + this.state.lessons[task.lesson].postClass
            }
            else {
                console.log('err! unknown classType:', task.classType)
            }
            // console.log('in drag task:', task.classType, classStart, classEnd)

            // newStart should start after the class type            
            newStart = newStart < classStart ? classStart : newStart
            // the task should stop within the class type
            newStart = newStart + task.duration > classEnd ? classEnd - task.duration : newStart

            task.startToLesson = newStart - this.state.lessons[task.lesson].allPrevLessonDuration
            task.start = newStart
            
            if (newGroupIdx !== groupIdx) {
                task.group = groupName[newGroupIdx]
                let len = tmp[newGroupIdx].push(task)
                tmp[groupIdx].splice(taskIdx, 1)
                this.groupIdx = newGroupIdx
                this.taskIdx = len - 1
            }
            this.setState({
                tasks: tmp
            })
            this.changeGroupStartX = e.clientX
        }
    }

    drawTimeline = () => {
        const gap = timeGap[this.state.showTimeGap]
        const maxNumber = Math.ceil(styles.right.width / this.state.unitWidth)
        let currentNumber = 0
        const DragOrZoom = this.state.unitWidth === this.prevUnitWidth // true for Drag false for Zoom
        // tStart: earliest time rendered in MS
        let tStart = originTimeInMS
        if (DragOrZoom) { // drag
            tStart = originTimeInMS - (this.state.timeStart / this.state.unitWidth * gap)
            tStart = tStart < 0 ? 0 : tStart
            tStart = Math.floor(tStart / gap) * gap
        }
        else { // zoom
            tStart = this.mouseOnTime - Math.ceil(this.zoomTimeStartX / this.state.unitWidth) * gap
            tStart = tStart < 0 ? 0 : tStart
        }

        const timeRange = [...Array(maxNumber + 1).keys()].map(i => tStart + i * gap)

        let lessonDuration = -1 // unexpected bug, make some black magic

        return (
            <React.Fragment>
                {/* draw the pre-/in-/post-class divider */}
                {this.state.lessons.map((lesson, index) => {
                    let classTypePos = []
                    let inClassType = { ...styles.inClassType }
                    let outClassType = { ...styles.outClassType }
                    // for pre-class
                    let val = (lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                    outClassType.width = lesson.preClass / gap * this.state.unitWidth
                    outClassType.transform = `translate(${val}px, 0px)`
                    classTypePos.push({ ...outClassType })
                    // for in-class
                    val = (lesson.preClass + lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                    inClassType.width = lesson.inClass / gap * this.state.unitWidth
                    inClassType.transform = `translate(${val}px, 0px)`
                    classTypePos.push({ ...inClassType })
                    //for post-class
                    val = (lesson.preClass + lesson.inClass + lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                    outClassType.width = lesson.postClass / gap * this.state.unitWidth
                    outClassType.transform = `translate(${val}px, 0px)`
                    classTypePos.push({ ...outClassType })
                    // for lesson title
                    let lessonTitle = { ...styles.lessonTitle}
                    val = (lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                    lessonTitle.width = lesson.duration / gap * this.state.unitWidth
                    lessonTitle.transform = `translate(${val}px, 0px)`
                    // console.log('in 653:', lesson.duration)
                    lessonDuration = lesson.duration
                    return (
                        <div className='classInfo' key={`${lesson.title}`}>
                            <div style={lessonTitle}>{lesson.title}</div>
                            <div style={classTypePos[0]}>Pre-Class</div>
                            <div style={classTypePos[1]}>In-Class</div>
                            <div style={classTypePos[2]}>Post-Class</div>
                        </div>
                    )
                })}
                
                {/* draw time label */}
                {timeRange.map((time, idx) => {
                    let unit = { ...styles.unit }
                    unit.width = this.state.unitWidth

                    // render when dragging or initial render
                    if (DragOrZoom) {
                        // let val = (time - Math.round(originTime.getTime())) / gap * this.state.unitWidth + this.state.timeStart
                        let val = (time - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                        unit.transform = `translate(${val}px, 0px)`
                        currentNumber += 1
                    }
                    // render when zoom in/out time
                    else {
                        let val = this.mouseOnTimeOffsetX + this.state.unitWidth * ((time - this.mouseOnTime) / gap)
                        unit.transform = `translate(${val}px, 0px)`
                        currentNumber += 1
                        if (currentNumber > maxNumber) {
                            this.prevUnitWidth = this.state.unitWidth
                        }
                    }

                    // formatting time output for relative time
                    // console.log('in 713:', lessonDuration)
                    if (this.state.showTimeGap === timeGap.length - 1){ // only show lessons
                        if (Math.floor(time / lessonDuration) < this.state.lessons.length) {
                            // if (Math.floor(time / lessonDuration) === this.state.lessons.length - 1) {
                            //     unit.borderRight = '1px solid rgba(173, 203, 144, 0.4)'
                            // }
                            return (
                                <div key={idx} style={unit}>Lesson {Math.floor(time / lessonDuration) + 1}</div>
                            )
                        }
                        
                    }
                    else {
                        let defaultInClass = lessonDuration / 5 / ONE_MINUTE
                        let showTime = time % lessonDuration / ONE_MINUTE 
                        // console.log('default:', defaultInClass, showTime)
                        // start of pre-/in-/post-class should be 0
                        if (showTime >= defaultInClass * 2 && showTime < defaultInClass * 3){
                            showTime -= defaultInClass * 2 // in-class
                        }
                        else if (showTime >= defaultInClass * 3){
                            showTime -= defaultInClass * 3
                        }
                        return (
                            <div key={idx} style={unit}>{showTime} min</div>
                        )
                    }
                })}
            </React.Fragment>
        )
    }

    drawContent = () => {
        const gap = timeGap[this.state.showTimeGap]
        const groups = DATAAPI.getClassTargetOpt()
        // console.log('groups:', groups)
        // console.log('lesson:', this.state.lessons)
        // console.log('tasks:', this.state.tasks)

        return (
            <React.Fragment>
                {groups.map((group, groupIdx) => {
                    // console.log('draw content:', this.state.tasks)
                    return (
                    // draw the group line
                    <div style={styles.group} key={`${group.name}`}
                        onMouseDown={this.changeTaskDurationStart}
                        onMouseUp={this.changeTaskDurationEnd}
                    >
                        {/* draw the pre-/in-/post-class divider */}
                        {this.state.lessons.map((lesson, index) => {
                            let dividerPos = []
                            let divider = { ...styles.divider }
                            // for pre-class
                            let val = (lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                            divider.transform = `translate(${val}px, 0px)`
                            dividerPos.push({...divider})
                            // for in-class
                            val = (lesson.preClass + lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                            divider.transform = `translate(${val}px, 0px)`
                            dividerPos.push({ ...divider })
                            //for post-class
                            val = (lesson.preClass + lesson.inClass + lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                            divider.transform = `translate(${val}px, 0px)`
                            dividerPos.push({ ...divider })
                            // for the end of the post-class of the last lesson
                            if (index === this.state.lessons.length - 1) {
                                val = (lesson.duration + lesson.allPrevLessonDuration - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                                divider.transform = `translate(${val}px, 0px)`
                                dividerPos.push({ ...divider })
                            }
                            return (
                                <div className='dividers' key={`${lesson.id}`}>
                                    <div style={dividerPos[0]}></div>
                                    <div style={dividerPos[1]}></div>
                                    <div style={dividerPos[2]}></div>
                                    {dividerPos.length === 4 ? <div style={dividerPos[3]}></div> : ''}
                                </div>
                            )
                        })}

                        {/* draw each task on the timeline */}
                        {this.state.tasks.length>0?this.state.tasks[groupIdx].map((task, taskIdx) => {
                            let item = { ...styles.item }
                            let val = (task.start - originTimeInMS) / gap * this.state.unitWidth + this.state.timeStart
                            item.transform = `translate(${val}px, 0px)`
                            let taskBorder = { ...styles.taskBorder }
                            taskBorder.width = task.duration / gap * this.state.unitWidth
                            let desc = { ...styles.desc }
                            desc.backgroundColor = task.bgColor

                            // draw each task and on listen the task editing
                            return (
                                <div key={taskIdx} style={item} id={`task${task.id}`} 
                                    className={`task${task.id}`}
                                >
                                    <div style={taskBorder}
                                        className={`task${task.id}`}
                                        onMouseOver={this.changeTaskDurationCursor}
                                    >
                                        <div style={styles.taskContent}
                                            className={`task${task.id}`}
                                            onClick={this.handleTaskSelection}
                                            onMouseDown={this.dragTaskStart}
                                            onMouseUp={this.dragTaskEnd}
                                        >
                                            <div className={`task${task.id}`} style={styles.tool}>
                                                {task.tool}
                                            </div>
                                            <div className={`task${task.id}`} style={{ overflow: 'hidden' }}>
                                                <img className={`task${task.id}`} style={styles.resource}
                                                    src={task.resource}
                                                    onMouseDown={(e) => e.preventDefault()} />
                                            </div>
                                            <div className={`task${task.id}`} style={desc}>
                                                {task.desc}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={styles.controlWidgets}>
                                        <div onClick={this.deleteTask.bind(this, groupIdx, taskIdx)}>
                                            <CloseIcon color="secondary" fontSize="small" />
                                        </div>
                                        <div onClick={this.callTaskEdit.bind(this, groupIdx, taskIdx)}>
                                            <EditIcon color="secondary" fontSize="small" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }):""}                        
                    </div>
                )})}
            </React.Fragment>
        )
    }

    drawGroups = () => {
        const groups = DATAAPI.getClassTargetOpt()
        return (
            <React.Fragment>
                {groups.map((group, index) => (
                    <div style={styles.leftItem} key={index}>
                        <img style={styles.leftItemImage} src={`${group.img}`} />
                        <div style={styles.leftItemName}>{group.name}</div>
                    </div>
                ))}
            </React.Fragment>
        )
    }

    render() {
        return (
            <div ref="tableview" id='tablevis' style={styles.root}>
                <div style={styles.viewName}>
                    A detailed timeline layout for planning learning tasks and required tools and resources
                </div>
                <div id='timeTable' style={styles.timeTable}>
                    <div style={{display: 'flex'}}>
                        <div id='left' style={styles.left}>
                            <div style={styles.topLeft}></div>
                            {this.drawGroups()}
                        </div>

                        <div id='right' style={styles.right}
                            onMouseDown={this.dragTimeStart}
                            onMouseUp={this.dragTimeEnd}
                            onWheel={this.zoomTime}
                        >
                            <div className='background' style={styles.timeBackground}>
                                {this.drawTimeline()}
                            </div>

                            <div id='content' style={styles.content}
                            >
                                {this.drawContent()}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default (TABLEVIEW)