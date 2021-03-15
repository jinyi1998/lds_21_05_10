import axios from 'axios';
import config from 'react-global-configuration';

const DATAAPI = {
    baseURL: config.get('url')+'/api',
    ONE_MINUTE : 60000,
    groupName : ['Whole Class', 'Group', 'Individual', 'Peer', ],
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + $('meta[name="apitoken"]').attr('content')
    },
    courseinfo: {},
    OPTS: {
        "elearningtoolOpts": [],
        "resourceOpts": [],
        "learningTasktypeOpts": [],
        "classSizeOpts": [],
        "classTypeOpts": [],
        "classTargetOpts": [],

    },
    getOpts: () => { 
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/opts',
            headers: DATAAPI.headers
        });
        e.get().then((response)=>{
              DATAAPI.OPTS = response['data']
            //   console.log( DATAAPI.OPTS );
        }).catch(function (error) {
            console.log(error);
        });
    },
    getComponents: () => { 
        return DATAAPI.courseinfo["components"]
    },
    getLessons: () => {
        return DATAAPI.courseinfo["lessons"]
    },
    getelearningtoolOpts:() => {
     return DATAAPI.OPTS['elearningtoolOpts']
    },
    getresourceOpts:() => {
     return DATAAPI.OPTS['resourceOpts']
    },
    getlearningTasktypeOpts: ()=> {
     return DATAAPI.OPTS['learningTasktypeOpts']
    },
    getclassSizeOpts:() => {
     return DATAAPI.OPTS['classSizeOpts']
    },
    getTaskOptions: (taskobj) => {
        let ctype = DATAAPI.OPTS["classTypeOpts"].filter(opt => {
            return opt["id"] == taskobj["class_type"]
        })[0]
        let lttype = DATAAPI.OPTS["learningTasktypeOpts"].filter(opt => {
            return opt["id"] == taskobj["type"]
        })[0]
        let ctarget = DATAAPI.OPTS["classTargetOpts"].filter(opt => {
            return opt["id"] == taskobj["target"]
        })
        let csize =DATAAPI.OPTS["classSizeOpts"].filter(opt => {
            return opt["id"] == taskobj["size"]
        })
        let resources = taskobj["resourceid"].map(item => {
            return DATAAPI.OPTS["resourceOpts"].filter(opt => {
                return item["resource_id"] == opt["id"]
            })[0]
        })
        let elearningtool = taskobj["toolid"].map(item => {
            return DATAAPI.OPTS["elearningtoolOpts"].filter(opt => {
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
        let images = task["resourceid"].map(item => {
            let id = item["resource_id"]
            return '/asset/public/img/'+resoureidToIcon[id]
        })
        if(images.length==0){
            return ['/asset/public/img/Default.svg']
        }
        return images
    },
    getToolIcon: (task) => {
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
        let images = task["toolid"].map(item => {
            let id = item["elearningtool_id"]
            return '/asset/public/img/'+toolidToIcon[id]
        })
        if(images.length==0){
            return ['/asset/public/img/Default.svg']
        }
        return images
    },

    // getCourseInfo: (callback) => {
    //     /********* Done */
    //     let courseid = window.location.href.split('/').reverse()[0]
        // const e = axios.create({
        //     baseURL:  DATAAPI.baseURL + '/course',
        //     headers: DATAAPI.headers
        // });
    //     e.get('/'+courseid).then((response)=>{
    //           DATAAPI.courseinfo = response['data']
    //           console.log(DATAAPI.courseinfo, callback)
    //           callback(DATAAPI.courseinfo["lessons"])
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // },
    getCourseInfo: (callback) => {
        /********* Done */
        let courseid = window.location.href.split('/').reverse()[0]
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/course',
            headers: DATAAPI.headers
        });
        e.get('/'+courseid).then((response)=>{
              DATAAPI.courseinfo = response['data']
            //   console.log(DATAAPI.courseinfo, callback)currentLessonIndex
              callback(DATAAPI.courseinfo["lessons"])
        }).catch(function (error) {
            console.log(error);
        });
    },
    deleteTaskFromLesson: (lesson, task_Type, callback) =>  {
        let resArr = [];
        lesson["tasks"].forEach(function(item){
            var i = resArr.findIndex(x => x["task_id"] == item["task_id"]);
            if(i <= -1){
                resArr.push(item);
            }
        });
        let tkids = resArr;
        tkids = lesson["tasks"].filter(item => item["lessonid"]["lessontype"]==task_Type).map(item => {
            return {"lesson_id": lesson["id"], "task_id": item["id"], "sequence": 1}
        })
        
        let obj = {"lesson_id": lesson["id"],
            "lessontype": task_Type,
            "tasks_id": tkids
        }
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/lesson',
            headers: DATAAPI.headers
        });
        e.put('/' + lesson["id"], obj).then((response)=>{
            console.log(response['data'])
        }).catch((error) => {
            console.log(error);
        });
    },
    addTaskToLesson: (lesson, task, task_type, callback)=>{
        /** re-order task sequence --- done*/
        let tkids = lesson["tasks"].filter(item => item["lessonid"]["lessontype"]==task_type).map(item => {
            return {"lesson_id": lesson["id"], "task_id": item["id"], "sequence": 1}
        })

        // tkids.push({"lesson_id": lesson["id"], "task_id": task["id"], "sequence": 1})
        let obj = {"lesson_id": lesson["id"],
            "lessontype": task_type,
            "tasks_id": tkids
        }
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/lesson',
            headers: DATAAPI.headers
        });
        e.put('/' + lesson["id"], obj).then((response)=>{
            DATAAPI.setTaskInfo(task, lesson["id"])
            callback(response['data'])
        }).catch((error) => {
            console.log(error);
        });
    },
    setTaskInfo: (task, lessoinid, callback) => {
        /********* Done */
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/learningTask',
            headers: DATAAPI.headers
        });
        e.put('/' + task["id"], task).then((response)=>{
            // if(task["lessonid"]["id"] == -1){
            DATAAPI.updateLessonTaskRelation(task, lessoinid)
        }).catch(function (error) {
            console.log(error);
        });
    }, 
    getLessonTaskRelationList: (task, lessonid) => {
        // console.log(task, lessonid, "--------")
        const e = axios.create({
            baseURL:  DATAAPI.baseURL + '/lessonTaskRelation',
            headers: DATAAPI.headers
        });
        e.get('/').then((response)=>{
            let relationID = response["data"].filter(item => item["lesson_id"]==lessonid && item["task_id"]==task["id"])[0]
            task["lessonid"]["id"] = relationID["id"]
            DATAAPI.updateLessonTaskRelation(task)
        }).catch(function (error) {
            console.log(error);
        });
    },
    updateLessonTaskRelation: (task)=>{
      
        const request = axios.create({
            baseURL:  DATAAPI.baseURL + '/learningTask',
            headers: DATAAPI.headers
        });
        request.get('/' + task["id"])
            .then(function (response) {
                console.log(response['data'])
                console.log(task)
                let obj = {
                    "id":response['data']["lessonid"]["id"], 
                    "sequence": 1, 
                    "lessontype": typeof task["lessonid"]["lessontype"] != 'undefined'? task["lessonid"]["lessontype"] : response['data']["lessonid"]["lessontype"], 
                    "starttime":  typeof task["lessonid"]["starttime"] != 'undefined'?  task["lessonid"]["starttime"] : response['data']["lessonid"]["starttime"]
                }

                const e = axios.create({
                    baseURL:  DATAAPI.baseURL + '/lessonTaskRelation',
                    headers: DATAAPI.headers
                });
                e.put('/' + response['data']["lessonid"]["id"], obj)
                    .then(function (response) {
                        console.log(response['data'])
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            })
            .catch(function (error) {
                console.log(error);
        });

       
    },
}
export { DATAAPI }
