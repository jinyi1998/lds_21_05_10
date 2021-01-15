const TableWidth = window.innerWidth - 350;
const LessonWidth = window.innerWidth;

const width = TableWidth
const timeTablePadding = 15
const leftWidth = 120
const contentWidth = width - timeTablePadding - leftWidth

const height = 520
const topHeight = 100
const contentHeight = height - topHeight

const viewStyle = {
    // positions for each view
    tableview: {
        // position:"fixed",
        top: "50px",
        left:"50px"
    },
    lessonview: {
        // position:"fixed",
        top: "650px",
        left:"50px",
        width: LessonWidth
    },
    patternview: {
        width:"450px",
        height:"800px",
        zIndex:23000,
        left: window.innerWidth - 400
    },
    // styles for the table view
    root: {
        width: TableWidth,
        height: 580,
        background: 'white',
        marginTop: 20,
    },
    viewName: {
        fontSize: '1.1em',
        fontWeight: '500',
        textAlign: 'center',
        padding: '10px 0px'
    },
    timeTable: {
        padding: `0px ${timeTablePadding}px`,
    },
    left: {
        width: leftWidth,
        height: height-5,
        borderRight: '1px solid rgba(173, 203, 144, 0.4)',
    },
    topLeft: {
        height: topHeight,
        borderBottom: '3px solid rgb(173, 203, 144)'
    },
    leftItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        minHeight: (contentHeight - 20) / 4,
        borderBottom: '3px solid rgb(173, 203, 144)'
    },
    leftItemImage: {
        width: leftWidth*0.6,
    },
    leftItemName: {
        marginTop: '3px',
        fontSize: '15px',
    },
    right: {
        width: contentWidth,
        height: height,
        // position: 'relative',
        // overflow: 'hidden',
    },
    timeBackground: {
        height: topHeight,
        borderBottom: '3px solid rgb(173, 203, 144)',
        position: 'relative',
        overflow: 'hidden',
    },
    lessonTitle: {
        position: 'absolute',
        fontSize: '18px',
        fontWeight: '500',
        textAlign: 'center',
    },
    inClassType: {
        backgroundColor: 'rgb(173,216,230)',
        textAlign: 'center',
        position: 'absolute',
        height: topHeight * 0.2,
        top: topHeight * 0.3,
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        wordBreak: 'break-all',
    },
    outClassType: {
        backgroundColor: 'rgba(173,216,230, 0.4)',
        borderRight: '1px solid rgb(173,216,230)',
        textAlign: 'center',
        position: 'absolute',
        height: topHeight * 0.2,
        top: topHeight * 0.3,
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        wordBreak: 'break-all',
    },
    // timeForeground: {
    //     width: infinite,
    //     position: 'absolute',
    //     top: topHeight * 0.7,
    // },
    content: {
        width: contentWidth,
        // height: contentHeight,
        position: 'relative',
        overflow: 'hidden',
    },
    group: {
        // display: 'flex',
        // flexDirection: 'column',
        height: (contentHeight - 20) / 4,
        borderBottom: '3px solid rgb(173, 203, 144)'
    },
    classTag: {
        position: 'absolute',
        top: topHeight * 0.5,
        height: topHeight * 0.2,
        fontSize: '16px',
        paddingLeft: '3px'
        // fontWeight: '500',
    },
    unit: {
        borderLeft: '1px solid rgba(173, 203, 144, 0.4)',
        position: 'absolute',
        top: topHeight * 0.78,
        height: topHeight * 0.2,
        width: 150,
        fontSize: '16px',
        paddingLeft: '3px'
    },
    item: {
        position: 'absolute',
        height: (contentHeight - 20) / 4,
        display: 'flex',
    },
    taskBorder: {
        border: '1px solid black',
    },
    taskContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    tool: {
        backgroundColor: 'black',
        textAlign: 'center',
        color: 'white',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        wordBreak: 'break-all',
    },
    resource: {
        height: (contentHeight - 20) / 4 - 42,
        width: ((contentHeight - 20) / 4 - 42) / 9 * 16,
    },
    desc: {
        textAlign: 'center',
        fontSize: '14px',
        paddingBottom: '4px',
        color: 'white',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        wordBreak: 'break-all',
    },
    controlWidgets: {
        marginLeft: '5px',
        display: 'none',
        height: '50px'
    },
    divider: {
        // display: 'inline-block',
        height: (contentHeight - 20) / 4,
        width: '1px',
        backgroundColor: 'rgba(173, 203, 144, 0.4)',
        position: 'absolute',
    }
}

export default viewStyle