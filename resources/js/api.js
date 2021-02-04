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
  export const apiUserChangePassword =  data => userRequest.post('/changepassword', JSON.stringify(data));
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
  export const apiLessonPut = data => lessonRequest.put(`/${data.id}`, JSON.stringify(data));
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
    export const apiLearningOutcomePut = data => learningOutcomeRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningOutcomeDelete = data => learningOutcomeRequest.delete(`/${data}`);

    export const apiLearningOutcomeDeletComponentRelation = data => learningOutcomeRequest.delete(`/destroyComponentRelation/${data.outcome_id}/${data.component_id}`);
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
        baseURL: 'http://'+config.get('url')+'/api/learningOutcomeTemplate',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },

        });
    export const apiLearningOutcomeTempList = data => learningOutcomeTempRequest.get('/', JSON.stringify(data));
    export const apiLearningOutcomeTempGet = data => learningOutcomeTempRequest.get(`/${data}`);
    export const apiLearningOutcomeTempPost = data => learningOutcomeTempRequest.post('/', JSON.stringify(data));
    export const apiLearningOutcomeTempPut = data => learningOutcomeTempRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningOutcomeTempDelete = data => learningOutcomeTempRequest.delete(`/${data.id}`);
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
    export const apiLearningCompTempDelete = data => learningComponentTempRequest.delete(`/${data.id}`);
    
    export const apiLearningCompTempGetInstructions =  data => learningComponentTempRequest.get(`/getInstructions/${data}`); 
    export const apiLearningCompTempGetPatternOpts = data => learningComponentTempRequest.get(`/getPatternOpts/${data}`);
    export const apiLearningCompTempAddPattern = data => learningComponentTempRequest.post(`addPatternRelation/${data.component_id}`, JSON.stringify(data));
    export const apiLearningCompTempDeletePattern = data => learningComponentTempRequest.put(`deletePatternRelation/${data.component_id}`, JSON.stringify(data));
    //#endregion

    //#region learningcomponenttempinstruction api
    const learningComponentInstructionRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/componentInstruction',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningCompInstructionList = data => learningComponentInstructionRequest.get('/', JSON.stringify(data));
    export const apiLearningCompInstructionGet = data => learningComponentInstructionRequest.get(`/${data}`);
    export const apiLearningCompInstructionPost = data => learningComponentInstructionRequest.post('/', JSON.stringify(data));
    export const apiLearningCompInstructionPut = data => learningComponentInstructionRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningCompInstructionDelete = data => learningComponentInstructionRequest.delete(`/${data.id}`);
    
    export const apiLearningCompInstructionUploadImg = data => learningComponentInstructionRequest.post('/uploadImg', JSON.stringify(data));
    //#endregion

    //#region learningpatterntemp api
    const learningPatternTempRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningPatternTemplate',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningPattTempList = data => learningPatternTempRequest.get('/', JSON.stringify(data));
    export const apiLearningPattTempGet = data => learningPatternTempRequest.get(`/${data}`);
    export const apiLearningPattTempPost = data => learningPatternTempRequest.post('/', JSON.stringify(data));
    export const apiLearningPattTempPut = data => learningPatternTempRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningPattTempDelete = data => learningPatternTempRequest.delete(`/${data.id}`);
    export const apiLearningPattTempUploadImg = data => learningPatternTempRequest.post('/uploadImg', JSON.stringify(data));
    //#endregion


    //#region patternbin category api
    const patternbinCategoryRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/patternbinCategory',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiPatternbinCategoryList = data => patternbinCategoryRequest.get('/', JSON.stringify(data));
    export const apiPatternbinCategoryGet = data => patternbinCategoryRequest.get(`/${data}`);
    export const apiPatternbinCategoryPost = data => patternbinCategoryRequest.post('/', JSON.stringify(data));
    export const apiPatternbinCategoryPut = data => patternbinCategoryRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiPatternbinCategoryDelete = data => patternbinCategoryRequest.delete(`/${data.id}`);
    //#endregion

    //#region patternbin api
    const patternbinRequest =  axios.create({
        baseURL: 'http://'+config.get('url')+'/api/patternbin',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiPatternbinList = data => patternbinRequest.get('/', JSON.stringify(data));
    export const apiPatternbinGet = data => patternbinRequest.get(`/${data}`);
    export const apiPatternbinPost = data => patternbinRequest.post('/', JSON.stringify(data));
    export const apiPatternbinPut = data => patternbinRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiPatternbinDelete = data => patternbinRequest.delete(`/${data.id}`);
    export const apiPatternbinAddPattern = data => patternbinRequest.post(`addPatternRelation/${data.patternbin_id}`, JSON.stringify(data));
    export const apiPatternbinDeletePattern = data => patternbinRequest.put(`deletePatternRelation/${data.patternbin_id}`, JSON.stringify(data));
    //#endregion

    //#region learningtasktemp api
    const learningTaskTempRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/learningTaskTemplate',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiLearningTaskTempList = data => learningTaskTempRequest.get('/', JSON.stringify(data));
    export const apiLearningTaskTempGet = data => learningTaskTempRequest.get(`/${data}`);
    export const apiLearningTaskTempPost = data => learningTaskTempRequest.post('/', JSON.stringify(data));
    export const apiLearningTaskTempPut = data => learningTaskTempRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiLearningTaskTempDelete = data => learningTaskTempRequest.delete(`/${data.id}`);
    //#endregion learningtasktemp api

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
    export const apiDesignTypePost = data => designTypeRequest.post('/', JSON.stringify(data));
    export const apiDesignTypePut = data => designTypeRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiDesignTypeDelete = data => designTypeRequest.delete(`/${data.id}`);
    export const apiLearningCompGetLearningCompByDesignType = data => designTypeRequest.get(`/getLearningComponentByDesignType/${data}`);
    export const apiGetDesignTypeInstruction = data => designTypeRequest.get(`/getDesignTypeInstruction/${data}`);
    export const apiDesignTypeUploadImg = data => designTypeRequest.post('/uploadImg', JSON.stringify(data));
    //#endregion design type

    //#region 
        //#region lesson api
  const designTypeComponentTempRequest = axios.create({
    baseURL: 'http://'+config.get('url')+'/api/designTypeComponentTemplate',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
    },
  });
  export const apiDesignTypeCompTempList = () => designTypeComponentTempRequest.get(`/`);
  export const apiDesignTypeCompTempGet = data => designTypeComponentTempRequest.get(`/${data.id}`);
  export const apiDesignTypeCompTempDelete = data => designTypeComponentTempRequest.delete(`/${data.id}`);
  export const apiDesignTypeCompTempPost = data => designTypeComponentTempRequest.post('/', JSON.stringify(data));
  export const apiDesignTypeCompTempPut = data => designTypeComponentTempRequest.put(`/${data.id}`, JSON.stringify(data));
  //#endregion
    //#endregion


    //#region design type instruction
    const designTypeInstructionRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/designTypeInstruction',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiDesignTypeInstructionList = data => designTypeInstructionRequest.get(`/`);
    export const apiDesignTypeInstructionGet = data => designTypeInstructionRequest.get(`/${data}`);
    export const apiDesignTypeInstructionPost = data => designTypeInstructionRequest.post('/', JSON.stringify(data));
    export const apiDesignTypeInstructionPut = data => designTypeInstructionRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiDesignTypeInstructionDelete = data => designTypeInstructionRequest.delete(`/${data.id}`);
    export const apiDesignTypeInstructionUploadImg = data => designTypeInstructionRequest.post('/uploadImg', JSON.stringify(data));
    //#endregion

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
    export const apiLearningPatternPut = data => learningPatternRequest.put(`/${data.id}`, JSON.stringify(data));
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

    //#region moodle mod
    const moodleModRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/moodleMod',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiMoodleModList = data => moodleModRequest.get(`/`);
    export const apiMoodleModGet = data => moodleModRequest.get(`/${data}`);
    export const apiMoodleModPost = data => moodleModRequest.post('/', JSON.stringify(data));
    export const apiMoodleModPut = data => moodleModRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiMoodleModDelete = data => moodleModRequest.delete(`/${data.id}`);
    //#endregion

     //#region Taxonomy Category
     const taxCategoryRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/taxonomyCategory',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiTaxCategoryList = data => taxCategoryRequest.get(`/`);
    export const apiTaxCategoryGet = data => taxCategoryRequest.get(`/${data}`);
    export const apiTaxCategoryPost = data => taxCategoryRequest.post('/', JSON.stringify(data));
    export const apiTaxCategoryPut = data => taxCategoryRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiTaxCategoryDelete = data => taxCategoryRequest.delete(`/${data.id}`);
    //#endregion

     //#region Taxonomy Category Task Type Relation
     const taxCategoryTaskRelationRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/taxonomyCategoryTasktypeRelation',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiTaxCategoryTaskRelationList = data => taxCategoryTaskRelationRequest.get(`/`);
    export const apiTaxCategoryTaskRelationGet = data => taxCategoryTaskRelationRequest.get(`/${data}`);
    export const apiTaxCategoryTaskRelationPost = data => taxCategoryTaskRelationRequest.post('/', JSON.stringify(data));
    export const apiTaxCategoryTaskRelationPut = data => taxCategoryTaskRelationRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiTaxCategoryTaskRelationDelete = data => taxCategoryTaskRelationRequest.delete(`/${data.id}`);
    //#endregion


    //#region class size opts
     const classSizeOptsRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/classSize',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiClassSizeOptsList = data => classSizeOptsRequest.get('/', JSON.stringify(data));
    export const apiClassSizeOptsGet = data => classSizeOptsRequest.get(`/${data}`);
    export const apiClassSizeOptsPost = data => classSizeOptsRequest.post('/', JSON.stringify(data));
    export const apiClassSizeOptsPut = data => classSizeOptsRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiClassSizeOptsDelete = data => classSizeOptsRequest.delete(`/${data.id}`);
    //#endregion

    //#region class target opts
    const classTargetOptsRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/classTarget',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiClassTargetOptsList = data => classTargetOptsRequest.get('/', JSON.stringify(data));
    export const apiClassTargetOptsGet = data => classTargetOptsRequest.get(`/${data}`);
    export const apiClassTargetOptsPost = data => classTargetOptsRequest.post('/', JSON.stringify(data));
    export const apiClassTargetOptsPut = data => classTargetOptsRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiClassTargetOptsDelete = data => classTargetOptsRequest.delete(`/${data.id}`);
    //#endregion


    //#region class type opts
    const classTypeOptsRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/classType',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiClassTypeOptsList = data => classTypeOptsRequest.get('/', JSON.stringify(data));
    export const apiClassTypeOptsGet = data => classTypeOptsRequest.get(`/${data}`);
    export const apiClassTypeOptsPost = data => classTypeOptsRequest.post('/', JSON.stringify(data));
    export const apiClassTypeOptsPut = data => classTypeOptsRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiClassTypeOptsDelete = data => classTypeOptsRequest.delete(`/${data.id}`);
    //#endregion

    //#region tasks type opts
      const taskTypeOptsRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/taskType',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiTaskTypeOptsList = data => taskTypeOptsRequest.get('/', JSON.stringify(data));
    export const apiTaskTypeOptsGet = data => taskTypeOptsRequest.get(`/${data}`);
    export const apiTaskTypeOptsPost = data => taskTypeOptsRequest.post('/', JSON.stringify(data));
    export const apiTaskTypeOptsPut = data => taskTypeOptsRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiTaskTypeOptsDelete = data => taskTypeOptsRequest.delete(`/${data.id}`);
    //#endregion

    //#region resource opts
      const resourceOptsRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/resource',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiResourceOptsList = data => resourceOptsRequest.get('/', JSON.stringify(data));
    export const apiResourceOptsGet = data => resourceOptsRequest.get(`/${data}`);
    export const apiResourceOptsPost = data => resourceOptsRequest.post('/', JSON.stringify(data));
    export const apiResourceOptsPut = data => resourceOptsRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiResourceOptsDelete = data => resourceOptsRequest.delete(`/${data.id}`);
    //#endregion

    //#region elearning opts
      const elearningToolOptsRequest = axios.create({
        baseURL: 'http://'+config.get('url')+'/api/elearningTool',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' +$('meta[name="apitoken"]').attr('content')
        },
    });
    export const apiElearningToolOptsList = data => elearningToolOptsRequest.get('/', JSON.stringify(data));
    export const apiElearningToolOptsGet = data => elearningToolOptsRequest.get(`/${data}`);
    export const apiElearningToolOptsPost = data => elearningToolOptsRequest.post('/', JSON.stringify(data));
    export const apiElearningToolOptsPut = data => elearningToolOptsRequest.put(`/${data.id}`, JSON.stringify(data));
    export const apiElearningToolOptsDelete = data => elearningToolOptsRequest.delete(`/${data.id}`);
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