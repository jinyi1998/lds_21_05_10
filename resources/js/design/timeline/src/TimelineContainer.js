import React, { useState, useEffect } from 'react';
import './App.css';
import 'jquery-ui-dist/jquery-ui';
import MenuView from './component/MenuView'
import EditionView from './component/EditionView'
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
	const [toolORresource, setToolORresource] = useState("tool")

	useEffect(()=>{
		DATAAPI.getOpts();
		DATAAPI.getCourseInfo(setLessonList)
	}, [])
  return (
	<div>
	<MenuView 
		// currentLessonIndex={currentLessonIndex} 
		// changeLessonIndex={(index)=>{setCurrentLessonIndex(index)}}
		// lessonList={lessonList}
		toolORresource={toolORresource}
		toolORresourceChange={setToolORresource}
	/>
	{showEditionView?(<EditionView 
		lessonList={lessonList}
		currentLessonIndex={currentLessonIndex}
		currentTaskId = {currentTaskId}
		setShowEditionView={(ifshowEdition) =>{setShowEditionView(ifshowEdition)}}
		changeLessonList={(newstate)=>{
			let allResourcedId = newstate.allResourcedId
			let allToolsId = newstate.allToolsId
			newstate.resourceid = allResourcedId.map((resource_id) => ({'learningtask_id': newstate.id, 'resource_id': resource_id}))
			newstate.toolid = allToolsId.map((tool_id) => ({'learningtask_id': newstate.id, 'elearningtool_id': tool_id}))
			DATAAPI.setTaskInfo(newstate, currentLessonIndex, forceUpdate)
			let taskid = newstate.id
			let taskidx = (lessonList[currentLessonIndex]['tasks']).findIndex(task => task['id'] === taskid)
			lessonList[currentLessonIndex]["tasks"][taskidx] = newstate;
			setLessonList(lessonList);
			setShowEditionView(false);
		}}
		
	/>):""}
	<div style={styles.tableview}>
		<TABLEVIEW lessonList={lessonList}
			toolORresource={toolORresource}
			currentLessonIndex={currentLessonIndex}
			changeLessonIndex={(index)=>{setCurrentLessonIndex(index)}} 
			changeTaskIndex= {(index)=>{setcurrentTaskId(index)}}
			setShowEditionView={(ifshowEdition) =>{setShowEditionView(ifshowEdition)}}
			changeLessonList={(newLessonlist, item, taskType, is_deleted = false)=>{
				setLessonList(newLessonlist);
				if(is_deleted)
					DATAAPI.deleteTaskFromLesson(newLessonlist[item], taskType, forceUpdate)
				else{
					let lessoni = item.lesson
					let taskid = item.id
					let taskindex = (newLessonlist[lessoni]['tasks']).findIndex(task => task['id'] === taskid)
					DATAAPI.setTaskInfo(newLessonlist[lessoni]['tasks'][taskindex], lessoni, forceUpdate)
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
		currentLessonIndex={currentLessonIndex}
		lessonList={lessonList}
		removeLessonTaskById={(id)=>{
			let lesson = lessonList[currentLessonIndex]
			// let taskIdx = lesson["tasks"].filter(item => {return item["id"]==id})[0]
			let taskIdx = (lesson['tasks']).findIndex(task => (task['id']).toString() === id)
			// let taskIdx2 = lesson["tasksid"].filter(item => {return item["task_id"]==id})[0]
			let taskIdx2 = (lesson['tasksid']).findIndex(task => (task['task_id']).toString() === id)

			lesson["tasks"].splice(taskIdx, 1)
			lesson["tasksid"].splice(taskIdx2, 1)
			lessonList[currentLessonIndex] = lesson
			let arr = []
			for(let lessoni = 0; lessoni < lessonList.length; lessoni++)
				arr.push(lessonList[lessoni])
			setLessonList(arr);
			// 
			DATAAPI.deleteTaskFromLesson(lesson, showPatternView, forceUpdate)
		}}
		addExampleTask={
			(item)=>{
				if(lessonList[currentLessonIndex]["tasks"].filter(tk => {
					return tk["id"]==item["id"]
				}).length == 0){
					let lessonid = {
						"id": -1,
						"is_deleted": 0,
						"lesson_id": lessonList[currentLessonIndex]["id"],
						"lessontype": showPatternView,
						"sequence": 0,
						"starttime": 0,
						"task_id": item["id"]
					}
					item["lessonid"] = lessonid
					lessonList[currentLessonIndex]["tasksid"].push({lesson_id: lessonList[currentLessonIndex]["id"], task_id: item['id']})
					lessonList[currentLessonIndex]["tasks"].push(item)
					setLessonList(lessonList);
					DATAAPI.addTaskToLesson(lessonList[currentLessonIndex], item, showPatternView,forceUpdate)
				}
			}
		}
	/>
	</div>
	);
}
export default TimelineContainer;