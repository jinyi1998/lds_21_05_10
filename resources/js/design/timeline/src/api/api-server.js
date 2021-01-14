import axios from 'axios';
import config from 'react-global-configuration';


const OPTS = {"learningTasktypeOpts":[{"id":1,"description":"Receiving & Interpreting Information","color":"#48448a","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":2,"description":"Explorations through Conversation","color":"#91b541","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":3,"description":"Construction: Conceptual \/ Visual Artefacts","color":"#ff5513","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":4,"description":"Presentations, Performance Illustrations","color":"#ffc500","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":5,"description":"Information Exploration","color":"#4cc981","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":6,"description":"Self-\/Peer-assessment","color":"#b759ef","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":7,"description":"Revision","color":"#82009d","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":8,"description":"Tangible \/ Immersive Investigation","color":"#abd848","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":9,"description":"Reflection","color":"#7f1b72","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":10,"description":"Practice","color":"#123123","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-10-30 10:00:50"},{"id":11,"description":"Test \/ Assessment","color":"#48aeda","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":12,"description":"Construction: Tangible \/ Manipulable Artifacts","color":"#971217","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-10-21 17:55:35"}],"classTypeOpts":[{"id":1,"description":"In Class","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":2,"description":"Out Class","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"}],
"classTargetOpts":[{"id":1,"description":"Whole Class","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":2,"description":"Group","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":3,"description":"Individual","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},
{"id":4,"description":"Peer","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"}],
"classSizeOpts":[{"id":1,"description":"N\/A","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":2,"description":"6 per group","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":3,"description":"5 per group","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":4,"description":"4 per group","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":5,"description":"3 per group","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":6,"description":"2 per group","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":7,"description":"Individual","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"}],"resourceOpts":[{"id":1,"description":"Videos","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":2,"description":"Articles","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":3,"description":"Worksheets","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":4,"description":"Rubrics","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":5,"description":"Materials","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":6,"description":"Guidelines","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":7,"description":"Quiz","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":8,"description":"Survey","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"}],"elearningtoolOpts":[{"id":1,"description":"Moodle (discussion forum)","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":2,"description":"Moodle (wiki)","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":3,"description":"Moodle (portfolio)","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":4,"description":"Moodle (Polling\/ survey)","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":5,"description":"Instant messenger","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":6,"description":"Video conferencing system","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":7,"description":"Google toolkits","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":8,"description":"Assignment Submission","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-05-21 09:51:28","updated_at":"2020-05-21 09:51:28"},{"id":9,"description":"Testing","created_by":1,"updated_by":1,"is_deleted":0,"created_at":"2020-10-21 17:55:56","updated_at":"2020-10-21 17:55:56"}]}



const DATAAPI = {
    baseURL:  'http://'+config.get('url')+'/api',
    ONE_MINUTE : 60000,
    groupName : ['Whole Class', 'Group', 'Individual', 'Peer', ],
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + $('meta[name="apitoken"]').attr('content')
    },
    courseinfo: {},
    getComponents: () => { 
        return DATAAPI.courseinfo["components"]
    },
    getLessons: () => {
        return DATAAPI.courseinfo["lessons"]
    },
    getelearningtoolOpts:() => {
     return OPTS['elearningtoolOpts']
    },
    getresourceOpts:() => {
     return OPTS['resourceOpts']
    },
    getlearningTasktypeOpts: ()=> {
     return OPTS['learningTasktypeOpts']
    },
    getclassSizeOpts:() => {
     return OPTS['classSizeOpts']
    },
    getTaskOptions: (taskobj) => {
        let ctype = OPTS["classTypeOpts"].filter(opt => {
            return opt["id"] == taskobj["class_type"]
        })[0]
        let lttype = OPTS["learningTasktypeOpts"].filter(opt => {
            return opt["id"] == taskobj["type"]
        })[0]
        let ctarget = OPTS["classTargetOpts"].filter(opt => {
            return opt["id"] == taskobj["target"]
        })
        let csize = OPTS["classSizeOpts"].filter(opt => {
            return opt["id"] == taskobj["size"]
        })
        let resources = taskobj["resourceid"].map(item => {
            return OPTS["resourceOpts"].filter(opt => {
                return item["resource_id"] == opt["id"]
            })[0]
        })
        let elearningtool = taskobj["toolid"].map(item => {
            return OPTS["elearningtoolOpts"].filter(opt => {
                return item["elearningtool_id"] == opt["id"]
            })[0]
        })
        return {
            time: taskobj["time"],
            classType: ctype,
            classTarget: ctarget,
            classSize: csize,
            taskType: lttype,
            resource: resources,
            tool: elearningtool
        }
    },
    getClassTargetOpt: () => {
        return [
            { "name": 'Individual', "id":3, "img": '/asset/public/img/individual.png' },
            { "name": 'Group', "id":2, "img": '/asset/public/img/group.png' },
            { "name": 'Peer', "id":4, "img": "/asset/public/img/peer.png" },
            { "name": 'Whole Class', "id":1, "img": "/asset/public/img/whole-class.png" }
        ]
    },
  
    getResourceIcon: (task) => {
        if(task["resourceid"][0]){
            let id = task["resourceid"][0]["resource_id"]
            let resoureidToIcon = {
                1: 'Default.svg',
                2: 'Default.svg',
                3: 'Default.svg',
                4: 'Default.svg',
                5: 'Default.svg',
                6: 'Default.svg',
                7: 'Quiz.svg',
                8: 'Survey.svg'
            }
            return "/asset/public/img/" + resoureidToIcon[id]
        }
        return '/asset/public/img/Default.svg'
    },
    getToolIcon: (task) => {
        if(task["toolid"][0]){
            let id = task["toolid"][0]["resource_id"]
            let toolidToIcon = {
                1: 'Forum.svg',
                2: 'Wiki.svg',
                3: 'Default.svg',
                4: 'Survey.svg',
                5: 'Default.svg',
                6: 'Default.svg',
                7: 'Assignment.svg',
                8: 'Default.svg',
            }
            return  "/asset/public/img/" + toolidToIcon[id]
        }
        return '/asset/public/img/Default.svg'
    },

    getCourseInfo: (callback) => {
        /********* Done */
        let courseid = window.location.href.split('/').reverse()[0]
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/course',
            headers: DATAAPI.headers
        });
        e.get('/'+courseid).then((response)=>{
              DATAAPI.courseinfo = response['data']
              console.log(DATAAPI.courseinfo, callback)
              callback(DATAAPI.courseinfo["lessons"])
        }).catch(function (error) {
            console.log(error);
        });
    },
    addTaskToLesson: (lesson, task, task_type, callback)=>{
        /** re-order task sequence --- done*/
        console.log(lesson, task, task_type)
        let tkids = lesson["tasks"].filter(item => item["lessonid"]["lessontype"]==task_type).map(item => {
            return {"lesson_id": lesson["id"], "task_id": item["id"], "sequence": 1}
        })
        tkids.push({"lesson_id": lesson["id"], "task_id": task["id"], "sequence": 1})
        let obj = {"lesson_id": lesson["id"],
            "lessontype": task_type,
            "tasks_id": tkids
        }
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/lesson',
            headers: DATAAPI.headers
        });
        e.put('/' + lesson["id"], obj).then((response)=>{
            DATAAPI.setTaskInfo(task)
            callback(response['data'])
        }).catch((error) => {
            console.log(error);
        });
    },
    setTaskInfo: (task,callback) => {
        /********* Done */
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/learningTask',
            headers: DATAAPI.headers
        });
        e.put('/' + task["id"], task).then((response)=>{
            DATAAPI.updateLessonTaskRelation(task)
        }).catch(function (error) {
            console.log(error);
        });
    }, 
    updateLessonTaskRelation: (task, callback)=>{
        let obj = {"id":task["id"], "lessontype": task["lessonid"]["lessontype"], "starttime": task["lessonid"]["starttime"]}
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/lessonTaskRelation/',
            headers: DATAAPI.headers
        });
        e.put('/' + task["lessonid"]["id"], obj)
              .then(function (response) {
                // callback(response['data'])
              })
              .catch(function (error) {
                console.log(error);
        });
    },
}
export { DATAAPI }
