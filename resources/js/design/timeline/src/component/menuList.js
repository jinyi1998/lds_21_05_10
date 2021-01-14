import * as React from 'react'
import { MenuItem, Select, Checkbox, Button, Divider} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    textTransform: 'none',
    fontSize: '0.95em',
  },
  divider: {
    margin: '10px 15px 10px 0px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  menuSelect: {
    border: '1px solid',
    borderColor: 'rgba(0,0,0, 0.6)',
    backgroundColor: 'white',
    paddingLeft: '15px',
  },
  menuSelectFocus: {
    '&:focus': {
      backgroundColor: 'white',
    }
  }
})

class MenuList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      currentLesson: 0,
      toolChecked: false,
      resourceChecked: false,
    }
  }

  handleLessonSelection = (event) => {
    this.props.changeLessonIndex(event.target.value)
  }

  handleToolCheck = () => {
    this.setState({
      toolChecked: !this.state.toolChecked
    })
  }

  handleResourceCheck = () => {
    this.setState({
      resourceChecked: !this.state.resourceChecked
    })
  }

  render() {
    // console.log('MenuList', this.props.lessonList)
    const classes = this.props.classes
    console.log(this.props)
    return (
      <div className='menuList'>
        {/* <div className='menuItem'> Lession View &nbsp;&nbsp;
          <div className={classes.menuSelect}>
            <Select
              value={this.props.currentLessonIndex}
              onChange={this.handleLessonSelection}
              classes = {{select: classes.menuSelectFocus}}
              disableUnderline
            >
            {this.props.lessonList.map((lesson, index) => (
              <MenuItem value={index} key={lesson}>{index+1}</MenuItem>
            ))}
            <MenuItem value={-1} key={-1}>All</MenuItem>
            </Select>
          </div>
        </div> */}
        <div className='menuItem'>
          <Checkbox checked={this.state.toolChecked} onChange={this.handleToolCheck} disableRipple/>
          Tools
        </div>
        <div className='menuItem'>
          <Checkbox checked={this.state.resourceChecked} onChange={this.handleResourceCheck} disableRipple/>
          Resources
        </div>
        {/* <Divider orientation="vertical" flexItem className={classes.divider}/>
        <div className='menuItem'>
          <Button className={classes.button}>
            undo
        </Button>
        </div>
        <div className='menuItem'>
          <Button className={classes.button}>
            redo
        </Button>
        </div> */}
      </div>
    )
  }
}

export default withStyles(styles)(MenuList);