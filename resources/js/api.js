import axios from 'axios';
import config from 'react-global-configuration';

  //#region  user api
  const userRequest = axios.create({
    baseURL:  'http://'+config.get('url')+'/api/user',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + $('meta[name="apitoken"]').attr('content')
    },
  });
  export const apiUserList = data => userRequest.get('/');
  export const apiUserSearch = data => userRequest.get(`/search/${data}` );
  export const apiUserMgmtDashboard = data => userRequest.get('/getUserMgmtDashboard');
  export const apiUserAvaGroup = data => userRequest.get('/getAvaUserGroup');
  export const apiUserGuidedTourUpdate = data => userRequest.put('/tourguide', JSON.stringify(data));
  //#endregion
  
  //#region user group api
  const usergroupRequest = axios.create({
    baseURL:  'http://'+config.get('url')+'/api/usergroup',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + $('meta[name="apitoken"]').attr('content')
    },
  });
  export const apiUserUsergroupList = data => usergroupRequest.get('/');
  export const apiUserUsergroupGet = data => usergroupRequest.get(`/${data}`);
  export const apiUserUsergroupCreate = data => usergroupRequest.post('/', JSON.stringify(data));
  export const apiUserUsergroupUpdate = data => usergroupRequest.put(`/${data.id}`,  JSON.stringify(data));
  export const apiUserUsergroupDelete = data => usergroupRequest.delete(`/${data}`);
  //#endregion

  //#region user group user api
  const usergroupUserRequest = axios.create({
    baseURL:  'http://'+config.get('url')+'/api/usergroupuser',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + $('meta[name="apitoken"]').attr('content')
    },
  });
  export const apiUserUsergroupUserList = data => usergroupUserRequest.get('/');
  export const apiUserUsergroupUserGet = data => usergroupUserRequest.get(`/${data}`);
  export const apiUserUsergroupUserCreate = data => usergroupUserRequest.post('/', JSON.stringify(data));
  export const apiUserUsergroupUserUpdate = data => usergroupUserRequest.put(`/${data.id}`,  JSON.stringify(data));
  export const apiUserUsergroupUserDelete = data => usergroupUserRequest.delete(`/${data}`);
  //#endregion

  //#region user group user temp api
  const usergroupUseTempRequest = axios.create({
    baseURL:  'http://'+config.get('url')+'/api/usergroupuserTemp',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + $('meta[name="apitoken"]').attr('content')
    },
  });
  export const apiUserUsergroupUserTempList = data => usergroupUseTempRequest.get('/');
  export const apiUserUsergroupUserTempGet = data => usergroupUseTempRequest.get(`/${data}`);
  export const apiUserUsergroupUserTempCreate = data => usergroupUseTempRequest.post('/', JSON.stringify(data));
  export const apiUserUsergroupUserTempUpdate = data => usergroupUseTempRequest.put(`/${data.id}`,  JSON.stringify(data));
  export const apiUserUsergroupUserTempDelete = data => usergroupUseTempRequest.delete(`/${data}`);
  //#endregion

  //#region course api
  const courseRequest = axios.create({
    baseURL:  'http://'+config.get('url')+'/api/course',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
    },
  });
  export const apiCourseList = () => courseRequest.get(`/`);
  export const apiCourseGet = data => courseRequest.get(`/${data}`);
  export const apiCourseDelete = data => courseRequest.delete(`/${data}`);
  export const apiCourseCreate = data => courseRequest.post('/', JSON.stringify(data));
  export const apiCourseUpdate = data => courseRequest.put(`/${data.course_id}`, JSON.stringify(data));
  export const apiCourseShowAll =  data => courseRequest.get(`/showAll`);
  export const apiCourseShowUsergroup =  data => courseRequest.get(`/showUsergroup/${data}`);
  export const apiCourseClearComponent = data => courseRequest.delete(`/clearCourseComponent/${data}`);
  export const apiCourseClearLesson = data => courseRequest.delete(`/clearCourseLesson/${data}`);
  export const apiCourseGetPermission = data => courseRequest.get(`/getPermission/${data}`);
  export const apiCourseUpdatePermission = data => courseRequest.post('/updatePermission', JSON.stringify(data));
  //#endregion

    //#region lesson api
  const lessonRequest = axios.create({
    baseURL: 'http://'+config.get('url')+'/api/lesson',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
    },
  });
  export const apiLessonList = () => lessonRequest.get(`/`);
  export const apiLessoneGet = data => lessonRequest.get(`/${data}`);
  export const apiLessonDelete = data => lessonRequest.delete(`/${data}`);
  export const apiLessonCreate = data => lessonRequest.post('/', JSON.stringify(data));
  export const apiLessonUpdate = data => lessonRequest.put(`/${data.lesson_id}`, JSON.stringify(data));
  //#endregion

    //#region lesson task api
    const lessonTaskRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/lessonTaskRelation',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
      });
      export const apiLessonTaskList = () => lessonTaskRequest.get(`/`);
      export const apiLessoneTaskGet = data => lessonTaskRequest.get(`/${data}`);
      export const apiLessonTaskDelete = data => lessonTaskRequest.delete(`/${data}`);
      export const apiLessonTaskCreate = data => lessonTaskRequest.post('/', JSON.stringify(data));
      export const apiLessonTaskUpdate = data => lessonTaskRequest.put(`/${data.id}`, JSON.stringify(data));
    //#endregion 

    //#region learningoutcome api
    const learningOutcomeRequest = axios.create({
    baseURL: 'http://'+config.get('url')+'/api/learningOutcome',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
    },
    });
    export const apiLearningOutcomeList = data => learningOutcomeRequest.get('/', JSON.stringify(data));
    export const apiLearningOutcomeGet = data => learningOutcomeRequest.get(`/${data}`);
    export const apiLearningOutcomePost = data => learningOutcomeRequest.post('/', JSON.stringify(data));
    export const apiLearningOutcomePut = data => learningOutcomeRequest.put(`/${data.outcome_id}`, JSON.stringify(data));
    export const apiLearningOutcomeDelete = data => learningOutcomeRequest.delete(`/${data}`);

    export const apiLearningOutcomeGetOutcomeType = data => learningOutcomeRequest.get('/getOutcomeType');
    export const apiLearningOutcomeGetOutcomeLevel = data => learningOutcomeRequest.get(`/getOutcomeLevel/${data}`);
    export const apiLearningOutcomeDeletComponentRelation = data => learningOutcomeRequest.delete(`/destroyComponentRelation/${data.outcome_id}/${data.component_id}`);
    // export const apiLearningOutcomeGetSTEMType = data => learningOutcomeRequest.get('/');
    //#endregion learningoutcome api

    //#region learningoutcome component api
    const learningOutcomeComponentRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/componentOutcomeRelation',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningOutcomeComponentList = data => learningOutcomeComponentRequest.get('/');
    export const apiLearningOutcomeComponentGet = data => learningOutcomeComponentRequest.get(`/${data}`);
    export const apiLearningOutcomeComponentPost = data => learningOutcomeComponentRequest.post('/', JSON.stringify(data));
    export const apiLearningOutcomeComponentPut = data => learningOutcomeComponentRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningOutcomeComponentDelete = data => learningOutcomeComponentRequest.delete(`/${data}`);
    //#endregion

    //#region learningoutcome course api
    const learningOutcomeCourseRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/courseOutcomeRelation',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningOutcomeCourseList = data => learningOutcomeCourseRequest.get('/');
    export const apiLearningOutcomeCourseGet = data => learningOutcomeCourseRequest.get(`/${data}`);
    export const apiLearningOutcomeCoursePost = data => learningOutcomeCourseRequest.post('/', JSON.stringify(data));
    export const apiLearningOutcomeCoursePut = data => learningOutcomeCourseRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningOutcomeCourseDelete = data => learningOutcomeCourseRequest.delete(`/${data}`);
    //#endregion

    //#region learningoutcometemp api
    const learningOutcomeTempRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningOutcome',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },

        });
    export const apiLearningOutcomeTempList = data => learningOutcomeTempRequest.get('/', JSON.stringify(data));
    export const apiLearningOutcomeTempGet = data => learningOutcomeTempRequest.get(`/${data}`);
    export const apiLearningOutcomeTempPost = data => learningOutcomeTempRequest.post('/', JSON.stringify(data));
    export const apiLearningOutcomeTempPut = data => learningOutcomeTempRequest.put('/', JSON.stringify(data));
    export const apiLearningOutcomeTempDelete = data => learningOutcomeTempRequest.delete('/', JSON.stringify(data));
    //#endregion

    //#region learningcomponent api
    const learningComponentRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningComponent',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },

    });
    export const apiLearningCompList = data => learningComponentRequest.get('/', JSON.stringify(data));
    export const apiLearningCompGet = data => learningComponentRequest.get(`/${data}`);
    export const apiLearningCompPost = data => learningComponentRequest.post('/', JSON.stringify(data));
    export const apiLearningCompPut = data => learningComponentRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningCompDelete = data => learningComponentRequest.delete(`/${data}`);

    export const apiLearningCompGetLearningCompByDesignType = data => learningComponentRequest.get(`/getLearningComponentByDesignType/${data}`);
    export const apiLearningCompGetPatternOpts = data => learningComponentRequest.get(`/getPatternOpts/${data}`);
    //#endregion

    //#region learningcomponenttemp api
    const learningComponentTempRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningComponentTemplate',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningCompTempList = data => learningComponentTempRequest.get('/', JSON.stringify(data));
    export const apiLearningCompTempGet = data => learningComponentTempRequest.get(`/${data}`);
    export const apiLearningCompTempPost = data => learningComponentTempRequest.post('/', JSON.stringify(data));
    export const apiLearningCompTempPut = data => learningComponentTempRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningCompTempDelete = data => learningComponentTempRequest.delete('/', JSON.stringify(data));
    //#endregion

    //#region design type api
    const designTypeRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/designType',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiDesignTypeList = data => designTypeRequest.get(`/`);
    export const apiDesignTypeGet = data => designTypeRequest.get(`/${data}`);
    //#endregion design type

    //#region learning task api
    const learningTaskRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningTask',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningTaskList = data => learningTaskRequest.get('/');
    export const apiLearningTaskGet = data => learningTaskRequest.get(`/${data}`);
    export const apiLearningTaskPost = data => learningTaskRequest.post('/', JSON.stringify(data));
    export const apiLearningTaskPut = data => learningTaskRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningTaskDelete = data => learningTaskRequest.delete(`/${data}`);
    export const apiLearningTaskGetPatternOpts = data => designTypeRequest.get(`/getLearningPatternOpts`);    
    //#endregion

    //#region learning task component api
    const learningTaskCompRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/componentTaskRelation',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningTaskCompList = data => learningTaskCompRequest.get('/');
    export const apiLearningTaskCompGet = data => learningTaskCompRequest.get(`/${data}`);
    export const apiLearningTaskCompPost = data => learningTaskCompRequest.post('/', JSON.stringify(data));
    export const apiLearningTaskCompPut = data => learningTaskCompRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningTaskCompDelete = data => learningTaskCompRequest.delete(`/${data}`);
    //#endregion

    //#region learningtask temp api
    const learningTaskTempRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningTask',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    //#endregion learningtask temp api

    //#region learning pattern api
    const learningPatternRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningPattern',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningPatternList = data => learningPatternRequest.get('/');
    export const apiLearningPatternGet = data => learningPatternRequest.get(`/${data}`);
    export const apiLearningPatternPost = data => learningPatternRequest.post('/', JSON.stringify(data));
    export const apiLearningPatternPut = data => learningPatternRequest.put(`/${data.pattern_id}`, JSON.stringify(data));
    export const apiLearningPatternDelete = data => learningPatternRequest.delete(`/${data}`);
    export const apiLearningPatternUnlock = data => learningPatternRequest.put(`/unlockPattern/${data.id}`, JSON.stringify(data))
    //#endregion

    //#region options api
    const optionsRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/opts',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiOptionsList = data => optionsRequest.get(`/`);
    //#endregion

    //#region componentanalysis api
    const componentAnalysisRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/componentanalysis',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiComponentAnalysisList = data => componentAnalysisRequest.get(`/${data}`);
    //#endregion

    //#region courseanalysis
    const courseAnalysisRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/courseanalysis',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiCourseAnalysisList = data => courseAnalysisRequest.get(`/${data}`);
    //#endregion

    //#region lessonanalysis api
    const lessonAnalysisRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/lessonanalysis',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLessonAnalysisList = data => lessonAnalysisRequest.get(`/${data}`);
    //#endregion

    //#region fileExport api
    const fileRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/file',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    })
    export const apiFileCourseImport = data => fileRequest.post(`courseImport`, JSON.stringify(data));
    export const apiFileCourseExport = data => fileRequest.get(`exportCourseJson/${data}`);
    export const apiFileCourseDownload = data => fileRequest.get(`downloadCourseJson/${data}`);

    //#region template api
    // const templateRequest = axios.create({
    //     baseURL: 'http://'+config.get('url')+'/api/template',
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //         "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
    //     },
    // })
    // export const apiTemplateDashboard = data => templateRequest.get(`/`);
    //#endregion