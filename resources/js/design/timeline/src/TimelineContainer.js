import React, { useState, useEffect } from 'react';
import './App.css';
import 'jquery-ui-dist/jquery-ui';
import MenuList from './component/menuList'
import TaskEdition from './component/taskEdition'
import PatternView from './component/PatternView'
import { DATAAPI } from './api/api-server'
import LESSONVIEW from './component/LessonView'
import TABLEVIEW from './component/TableView'
import styles from './component/viewStyle.js'

function deepCopyTask(item, index){
	let newtask = {}
	for(let key in item){
		newtask[key]=item[key]
	}
	newtask["id"] = index
	return newtask
}

function TimelineContainer() {
	const forceUpdate = React.useState()[1].bind(null, {})
	const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
	const [currentTaskId, setcurrentTaskId] = useState(0)
	const [lessonList, setLessonList] = useState([])
	const [showPatternView, setShowPatternView] = useState(false)
	const [showEditionView, setShowEditionView] = useState(false)
	useEffect(()=>{
	  DATAAPI.getCourseInfo(setLessonList)
	}, [])
  return (
    <div>
    	<MenuList 
			currentLessonIndex={currentLessonIndex} 
			changeLessonIndex={(index)=>{setCurrentLessonIndex(index)}}
			lessonList={lessonList}
		/>
    	{showEditionView?(<TaskEdition 
    		lessonList={lessonList}
			currentLessonIndex={currentLessonIndex}
			currentTaskId = {currentTaskId}
			setShowEditionView={(ifshowEdition) =>{setShowEditionView(ifshowEdition)}}
			changeLessonList={(newstate)=>{
				let allResourcedId = newstate.allResourcedId
				let allToolsId = newstate.allToolsId
				newstate.resourceid = allResourcedId.map((resource_id) => ({'learningtask_id': newstate.id, 'resource_id': resource_id}))
				newstate.toolid = allToolsId.map((tool_id) => ({'learningtask_id': newstate.id, 'elearningtool_id': tool_id}))
				DATAAPI.setTaskInfo(newstate,forceUpdate)
				let taskid = newstate.id
				let taskidx = (lessonList[currentLessonIndex]['tasks']).findIndex(task => task['id'] === taskid)
				lessonList[currentLessonIndex]["tasks"][taskidx] = newstate;
				setLessonList(lessonList);
				setShowEditionView(false);
			}}
			
		/>):""}
		<div style={styles.tableview}>
			<TABLEVIEW lessonList={lessonList}
				currentLessonIndex={currentLessonIndex}
				changeLessonIndex={(index)=>{setCurrentLessonIndex(index)}} 
				changeTaskIndex= {(index)=>{setcurrentTaskId(index)}}
				setShowEditionView={(ifshowEdition) =>{setShowEditionView(ifshowEdition)}}
				changeLessonList={(newLessonlist, item, is_deleted = false)=>{
					setLessonList(newLessonlist);
					if(is_deleted)
						DATAAPI.updateLessonTaskSequence(newLessonlist[item],forceUpdate)
					else{
						let lessoni = item.lesson
						let taskid = item.id
						let taskindex = (newLessonlist[lessoni]['tasks']).findIndex(task => task['id'] === taskid)
						DATAAPI.setTaskInfo(newLessonlist[lessoni]['tasks'][taskindex], forceUpdate)
					}
				}}
			></TABLEVIEW>
		</div>
		<div style={styles.lessonview}>
			<LESSONVIEW lessonList={lessonList}
				currentLessonIndex={currentLessonIndex} 
				currentTaskId = {currentTaskId}
				changeLessonIndex={(index)=>{setCurrentLessonIndex(index)}} 
				changeTaskIndex= {(index) => {setcurrentTaskId(index)}}
				showPatternViewChange={(ifshow)=>{setShowPatternView(ifshow)}}
				setShowEditionView={(ifshowEdition) =>{setShowEditionView(ifshowEdition)}}
				addEmptyTask={()=>{
					let idlist = lessonList[currentLessonIndex]["tasks"].map(item=>item["id"])
					idlist = idlist.sort(function(a,b){return a[1] - b[1]}).reverse();
					lessonList[currentLessonIndex]["tasks"].push({
																id: idlist[0]+1,
																class_type: 2,
																created_at: "",
																created_by:'',
																description: "",
																currentTaskId: idlist[0]+1,
																assessment: [],
																assessmentid: [],
																has_assessment: 0,
																is_deleted: 0,
																laravel_through_key: 759,
																resourceid: [],
																size: 7,
																target: 3,
																time: 5,
																title: "empty",
																toolid: [],
																type: 1})
					setLessonList(lessonList);
				}}
				resetTaskOrder={(tasks) => {
					lessonList[currentLessonIndex]["tasks"] = tasks
					setLessonList(lessonList);
				}}></LESSONVIEW>
		</div>
		<PatternView 
			showPatternViewChange={(ifshow)=>{setShowPatternView(ifshow)}}
			showPatternView={showPatternView}
			addExampleTask={
				(item)=>{
					let idlist = lessonList[currentLessonIndex]["tasks"].map(item=>item["id"])
					idlist = idlist.sort(function(a,b){return a[1] - b[1]}).reverse();
					let newitem = deepCopyTask(item, idlist[0]+1)
					newitem.lessonid = {
						sequence: Math.max(...lessonList[currentLessonIndex]["tasks"].map((task) => {return task.lessonid.sequence})) + 1,
					}
					lessonList[currentLessonIndex]["tasks"].push(newitem)
					setLessonList(lessonList);
					DATAAPI.addTaskToLesson(lessonList[currentLessonIndex], item, showPatternView,forceUpdate)
				}
			}
		/>
    </div>
  );
}
export default TimelineContainer;