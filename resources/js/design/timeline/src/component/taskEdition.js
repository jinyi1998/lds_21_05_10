import * as React from 'react';
import { DATAAPI } from '../api/api-server';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
	formControl: {
	    margin: theme.spacing(1),
	    width: 130,
	},
	selectEmpty: {
	    marginTop: theme.spacing(2),
	 },
}));
const useStyles1 = makeStyles((theme) => ({
	formControl: {
	    margin: theme.spacing(1),
	    width: 200,
	},
	selectEmpty: {
	    marginTop: theme.spacing(2),
	 },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
const MenuPropsType = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 360,
		},
	},
};

const toolsName = DATAAPI.getelearningtoolOpts() 
const resourcesName = DATAAPI.getresourceOpts()
const typeName = DATAAPI.getlearningTasktypeOpts()
const sizeOpts = DATAAPI.getclassSizeOpts()
console.log('sizeOpts', sizeOpts)


var style = {
	marginLeft: '-100px'
};
var styleType = {
	marginLeft: '-160px'
};

var styleText = {
	width:130,
	marginLeft: 10,
};
var styleRightText = {
	width: 210,
	marginLeft: 0
}

export default function TaskEdition(props){

	const classes = useStyles();
	const classes1 =useStyles1()
	let choseTask = ((props.lessonList)[props.currentLessonIndex]["tasks"]).filter(item => item.id == props.currentTaskId)[0]
	choseTask.allResourcedId = (choseTask.resourceid).map((resourceid) =>  resourceid.resource_id)
	choseTask.allToolsId =(choseTask.toolid).map((toolid) =>  toolid.elearningtool_id)
	if(!('displayName' in choseTask))
		choseTask.displayName = ''
	const [state, setState] = React.useState(choseTask);

	const handleChange = (event) => {
		// console.log('choseTask', choseTask,state)
	    const name = event.target.name;
	    let value = event.target.value
	    console.log('handleChange', name, value)
	    setState({
	      ...state,
	      [name]: value,
		});
		// console.log('here', state)
	};
	

	return (
      <div className="taskEdition">
	      <div className='taskEditiontitle1'> Edit Learning Task </div>
	      <div className='taskEditiontitle2'> You may add new learning task for this component... </div>
	      <div className='taskInfo'>
	      	<div className='leftInfo'>
	      		 
	      		 <TextField
	      		  required
	      		  error
	      		  inputProps={{ name: 'time',}}
				  id='filled-mintues'
		          label="Minutes"
		          defaultValue={state.time}
		          variant="filled"
		          style={styleText}
		          onChange={handleChange}
		        />

	      		<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel htmlFor="class_type"> Class Type: </InputLabel>
			        <Select
							native
							value={state.class_type}
							onChange={handleChange}
							label="classType"
							inputProps={{
								name: 'class_type',
								id: 'class_type',
					        }}>
						<option value='1'>In Class</option>
						<option value='2'>Out Class</option>
			        </Select>
			     </FormControl>

			     <FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel htmlFor="target"> Class Target: </InputLabel>
			        <Select
							native
							value={state.target}
							onChange={handleChange}
							label="target"
							inputProps={{
								name: 'target',
								id: 'target',
					        }}>
						<option value='3'> Individual </option>
						<option value='4'> Peer </option>
						<option value='2'> Group </option>
						<option value='1'> Whole </option>
			        </Select>
			     </FormControl>

			    <FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel htmlFor="size"> Size: </InputLabel>
			        <Select
							native
							value={state.size}
							onChange={handleChange}
							label="size"
							inputProps={{
								name: 'size',
								id: 'size',
					        }}>
					    {sizeOpts.map((size) => (
					    	<option value={size.id} key={size.id}> {size.description} </option> 
						))}
			        </Select>
			     </FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel id="resources-label"> Resources: </InputLabel>
					<Select
							labelId="resources-label"
							id="allResourcedId"
							multiple
							value={state.allResourcedId}
							onChange={handleChange}
							input={<Input name='allResourcedId' />}
							renderValue={(selected) => selected.map((selectId)=>resourcesName[selectId-1].description).join(',')}
							MenuProps={MenuProps} >
						{resourcesName.map((resources) => (
							<MenuItem key={resources.id} value={resources.id}>
								<Checkbox checked={(state.allResourcedId).indexOf(resources.id) > -1} style={style}/>
								<ListItemText primary={resources.description} style={style}/>
							</MenuItem>
						))}
					</Select>
				</FormControl> 

				<FormControl className={classes.formControl}>
					<InputLabel id="tools-label"> Tools: </InputLabel>
					<Select
							labelId="tools-label"
							id="allToolsId"
							multiple
							value={state.allToolsId}
							onChange={handleChange}
							input={<Input name='allToolsId' />}
							renderValue={(selected) => selected.map((selectId)=>toolsName[selectId-1].description).join(',')}
							MenuProps={MenuProps} >
						{toolsName.map((tools) => (
							<MenuItem key={tools.id} value={tools.id}>
								<Checkbox checked={(state.allToolsId).indexOf(tools.id) > -1} style={style}/>
								<ListItemText primary={tools.description} style={style}/>
							</MenuItem>
						))}
					</Select>
				</FormControl>

	      	</div>

	      	<div className='rightInfo'>
	      		<FormControl className={classes1.formControl}>
					<InputLabel id="type-label"> Type: </InputLabel>

					 <Select
							native
							error
							value={state.type}
							onChange={handleChange}
							label="typeName"
							inputProps={{
								name: 'type',
								id: 'type',
					        }}>
					    {typeName.map((tasktype) => (
					    	<option value={tasktype.id} key={tasktype.id}> {tasktype.description} </option> 
						))}
			        </Select>

				</FormControl> 

	      		<TextField
	      		  id="filled-multiline-static"
			      label="Multiline"
			      multiline
			      rows={3}
	      		  required
	      		  error
	      		  inputProps={{ name: 'title',}}
		          id="filled-title"
		          label="Title"
		          defaultValue={state.title}
		          variant="filled"
		          onChange={handleChange}
		           style={styleRightText}
		        />

		        <TextField
		          id="filled-multiline-static"
			      label="Multiline"
			      multiline
			      rows={5}
		          required
		          error
		          inputProps={{ name: 'description',}}
		          id="filled-description"
		          label="Description"
		          defaultValue={state.description}
		          variant="filled"
		          onChange={handleChange}
		           style={styleRightText}

		        />

		        <TextField
		          required
		          inputProps={{ name: 'displayName',}}
		          id="outlined-displayName"
		          label="Display name(for timeline): "
		          defaultValue={state.displayName}
		          variant="outlined"
		          error
		           style={styleRightText}
		          // helperText="Required. Not empty!"
		          onChange={handleChange}
		        />

	      	</div>
	      </div>

	      <div className='buttonG'>
	      	<Button id='cancel' variant="contained" onClick={() => {props.setShowEditionView(false); }}>CANCEL</Button>
	      	<Button id='save' variant="contained" onClick={() => {props.changeLessonList(state);}}> SAVE</Button>
	     </div>

	     </div>
     
    )

} 