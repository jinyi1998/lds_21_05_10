import React from "react";

import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import config from 'react-global-configuration';

export const TourGuideContext = React.createContext({
    // setMode: ()=>{},
    // setStep: ()=>{},
    // setStepIndex: ()=>{},
    // nextStep: ()=>{},
    // setRun: ()=>{}
});

const TourGuide = (props) => {  
    const [mode, setMode] = React.useState(props.mode);
    const [run, setRun] = React.useState(props.run);
    const [steps, setStep] = React.useState([]);
    const [stepIndex, setStepIndex] = React.useState(props.stepIndex);

    React.useEffect(()=>{
        if(props.displayGuideTour){
            setRun(false);
            setMode('')
            setMode(props.mode);
            setRun(props.run);
            setStepIndex(props.stepIndex);
        }else{
            setRun(false);
        }
    
    }, [props]);

    

    React.useEffect(()=>{
        props.setStepIndex(0);
        switch(mode){
            default:
                setStep([])
                break;
            case "design_type":
                setStep(steps_design_type)
                break;
            case "course_info":
                setStep(steps_course_info)
                break;
            case "ulo":
                setStep(steps_ulo)
                break;
            case 'component_step':
                setStep(steps_component_step)
                break;
            case 'unit_design_component':
                setStep(steps_unit_design_component);
                break;
            case 'unit_design_lesson':
                setStep(steps_unit_design_lesson);
                break;
        }
     
        props.setRun(true);
        props.setStepIndex(0);
    }, [mode])

    async function setUserDisplayTourGuide(enable) {
        const res = await fetch(
            'http://'+config.get('url')+'/api/user/tourguide',
            {
                method: "PUT",
                body:  JSON.stringify({
                    "display_tourguide": enable
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then(res => res.json())
            .then(response => {
                props.setDisplayGuideTour(enable);
            })
        .catch(error => console.log(error));
    }

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data;
        if ([EVENTS.STEP_AFTER].includes(type)) {
            // props.setStepIndex(index+1);
            // Update state to advance the tour
            if([ACTIONS.NEXT].includes(action)){
                props.setStepIndex(index+1);
            }else if([ACTIONS.PREV].includes(action)){
                props.setStepIndex(index-1);
            }
        }
        else if ([EVENTS.TARGET_NOT_FOUND].includes(type)){
            console.log('tour guide target not fonund');
            props.setRun(false);
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        // Need to set our running state to false, so we can restart if we click start again.
            props.setStepIndex(0);
            props.setRun(false);
            if(mode == 'unit_design_lesson'){
                setUserDisplayTourGuide(false)
            }
        }

        if([ACTIONS.SKIP].includes(action)){
            // setUserDisplayTourGuide(false)
            props.setStepIndex(0);
            props.setRun(false);
        }
    }

    const steps_design_type = [
       //#region design type
      {
        target: '[data-tour= "designtype_list"]',
        placement: 'top',
        content: (
            <React.Fragment>
                <Typography variant="caption" >
                A learning design starts with defining the targeted learning outcomes.
                <br />
                The aim of STEM education is to equip students with knowledge and skills in the four STEM disciplines, 
                for example, scientific inquiry, application of technological knowledge, design thinking, logical thinking, and so on. 
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "designtype_list"]',
        placement: 'top',
        content: (
            <React.Fragment>
                 <img src = "/asset/image/SDL.png" style = {{maxWidth: "350"}}/>
                <Typography variant="caption" >
                In order to strengthen students’ ability to integrate knowledge and experiences like the experts in the fields of STEM, 
                the learning design needs to provide students with opportunities to experience an authentic practice format in STEM areas. 
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "designtype_list"]',
        placement: 'top',
        content: (
            <React.Fragment>
                <Typography variant="caption" >
                <img src = "/asset/image/SDL_detail.png" style = {{maxWidth: "650px"}}/>
                In general, LDS suggest you start brainstorming from two points: the types of STEM lessons which we refer to as 
                disciplinary practice, and the general methods you would like to use in your teaching, which we call pedagogical approach.
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        styles:{
            options: {    
              width: 700,
            }
        }
      },
      {
        target: '[data-tour= "designtype_list"]',
        placement: 'top',
        content: (
            <React.Fragment>
                <Typography variant="caption" >
                There are two authentic practice formats in STEM, engineering design and scientific investigation.
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        styles:{
            options: {    
              width: 700,
            }
        }
      },
      {
        target: '[data-tour= "designtype_title_1"]',
        content: (
            <React.Fragment>
                <Typography variant="caption" >
                    <img src = "/asset/image/ED.png" style = {{maxWidth: "350px"}}/>
                    <br />
                    “Engineering design” refers to STEM lessons that provide students with opportunities to construct some products
                </Typography>
            </React.Fragment>
        ),
        spotlightClicks: true
      },
      {
        target: '[data-tour= "designtype_title_2"]',
        content: (
            <React.Fragment>
                
                <Typography variant="caption" >
                    <img src = "/asset/image/SI.png" style = {{maxWidth: "350px"}}/>
                    “Scientific investigation” refers to lessons in which students design and conduct a scientific investigation to address a scientific problem. 
                    <br />
                    We refers to these two authentic practice formats in STEM as disciplinary practice.
                </Typography>
            </React.Fragment>
        ),
        spotlightClicks: true
      },
      {
        target: '[data-tour= "designtype_list"]',
        placement: 'right',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                    And now, please select your course design type.
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        hideFooter: true,
        spotlightClicks: true,
        
      },
      //#endregion
    ];
    
    const steps_course_info = [
          //#region course info
      {
        target: '[data-tour= "course_info"]',
        placement: 'bottom',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                    Then the design proceeds to the second step, which requires teachers to input some basic information of the unit, 
                    including the unit title, grade level targeted, no. of lessons and curriculum unit description.
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "course_info"]',
        placement: 'bottom',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                This free form of input invites teachers’ to start thinking about the lesson design. 
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "unit_title"]',
        placement: 'bottom',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                    At the begining, teachers should enter the unit title first.
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "level"]',
        placement: 'bottom',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                For example, teachers are expected to complete the blank “level” by adding the grade level of targeted students. Teachers may consider learners’ characteristics, like Grade 5 students,
                when filling this blank. It is always important for teachers to think from a learner’s perspective when designing a unit.
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "description"]',
        placement: 'bottom',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                    In the field of unit description, perhaps teachers don’t know what to do because they do not have a clear plan for the curriculum unit yet. 
                    Learning design is an iterative process. 
                    As a starting point, we would advise teachers to put down some keywords there, which may be elaborated or modified later. 
                    These keywords can be related to the teaching content, learning experiences, pedagogical approach and so on. 
                    <br />
                    Also if this were to be done by a collaborative team, then different members can contribute different keywords. 
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "no_of_lesson"]',
        placement: 'bottom',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                    For the no. of lessons, teachers should think about whether it is realistic to ask students to design and construct a product in, say, four lessons.
                </Typography>
            </React.Fragment>
        ),
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      {
        target: '[data-tour= "course_info_save"]',
        placement: 'bottom',
        content: (
            <React.Fragment>
                <Typography variant="caption">
                    Please click the save button once you finished.
                </Typography>
            </React.Fragment>
        ),
        spotlightClicks: true,
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
      },
      //#endregion

    ]

    const steps_ulo = [
        {
            target: '[data-tour= "ulo_display_view"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    The third step is to think about the details of learning outcomes of this unit. Learning design starts with the identification of learning outcomes
                    , followed by a backward design of learning tasks and assessments to achieve and assess the intended learning outcomes. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "ulo_display_view"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    LDS will prompt teachers to pay attention to specific learning outcomes by pre-loading some learning outcomes based on teachers’ selection of “Engineering Design and SDL”. 
                    The disciplinary skill is pre-loaded as facilitating students’ design thinking and the generic skills as self-directed learning. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_type"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Types of LO
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_type"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    We categorized the learning outcomes at the Unit level into three types. They are disciplinary knowledge, disciplinary skills and generic skills.
                    <br />
                    Disciplinary knowledge generally refers to the facts, concepts, theories, and principles that are taught and learned in specific subjects/disciplines.
                    <br />
                    Disciplinary skills deal with the ability to perform a task, such as reading, writing, and calculating.
                    <br />
                    Generic skills: often referred to as 21st century skills, includes communication, collaboration, critical thinking, 
                    creativity, problem solving, and self-directed learning.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_description"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                     Description of LO
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_stem_type"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    STEM domain
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_level"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    Bloom taxonomy that makes LO more explicit and measurable 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_edit"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    Teachers may edit these pre-loaded learning outcomes when not needed.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_delete"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    Teachers may remove these pre-loaded learning outcomes when not needed.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "ulo_add_button"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Then click “add learning outcomes” in order to add the unit level learning outcome   
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true,
            hideFooter: true
        },
        {
            target: '[data-tour= "lo_edit_type"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        LDS will guide you think about the category of learning outcomes when adding a new LO for the unit.   
                        <br />
                        Teachers may have in mind the learning outcomes as required by the curriculum, 
                        such as understanding the concept of electric circuit and the function of a sensor. 
                        These are belongs to disciplinary knowledge. So we add a disciplinary knowledge outcome first. 
                        Say, understand the concept of electric circuit.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true,
            hideFooter: true
        },
        {
            target: '[data-tour= "lo_edit_level"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    It is also very important to make learning outcomes realistic and can be assessed. 
                    “Understand the concept of electric circuit” is not a specified learning outcome. 
                    LDS prompts teachers to not only pinpoint the concepts or skills intended for the students to learn, 
                    but also to consider the level of achievement to be reached. 
                    <br />
                    LDS uses the Bloom’s Taxonomy to help teachers specify the level of outcome targeted.  
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_edit_STEM"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    As STEM education requires integration of four disciplinary domains. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lo_edit_description"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        After defining the types of LOs, LDS will guide you think about the domain of learning outcomes when adding a new LO for the unit. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true,
        },
        {
            target: '[data-tour= "next"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Now the teacher has specified the learning outcomes for this unit. Then let’s proceed to the next step.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },

    ]

    const steps_component_step = [
        {
            target: '[data-tour= "component_step"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <img src = "/asset/image/structure.png" style = {{maxWidth: "650px"}}/>
                    <Typography variant="caption">
                    After the learning outcomes are determined, the next step is to design what kinds of learning focus and experiences 
                    that students should go through to build up the necessary knowledge and skills as learning outcomes.  
                    <br />
                    Therefore, the learning outcomes, disciplinary practice and pedagogical approach determine specifies a sequence of “curriculum components”. 
                    Each component provides a set of learning experiences for the learner to achieve specific learning outcomes, 
                    which may be disciplinary knowledge, disciplinary skills, and/or generic skills. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            styles:{
                options: {    
                  width: 700,
                }
            }
        },
        {
            target: '[data-tour= "component_step"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <img src = "/asset/image/structure.png" style = {{maxWidth: "650px"}}/>
                    <Typography variant="caption">
                    Designing the curriculum components is too difficult for teachers as they may not be knowledgeable 
                    about the engineering design process and the pedagogy used in each step of the process. 
                    <br />
                    But LDS will suggest a set of curriculum components based on teachers’ choice of the disciplinary practice and pedagogy. 
                    <br />
                    In this case, “Engineering design” is selected as disciplinary practice and thus LDS suggest five curriculum components as shown here. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            styles:{
                options: {    
                  width: 700,
                }
            }
        },
        {
            target: '[data-tour= "component_step_drag"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Teachers can re-order the curriculum components by simple drag and drop if necessary.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_step_duplicate"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Teachers can duplicate the curriculum components here if necessary.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_step_delete"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Teachers can delete the curriculum components here if necessary.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_step_add"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Teachers can add the pre-defined curriculum components here.
                    </Typography>
                </React.Fragment>
            ),
            hideFooter: true,
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true
        },
        {
            target: '[data-tour= "designtype_select"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        At the begining, teachers should select the curriculum components type first.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_select"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        The system will load the curriculum components based what you select.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "next"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    Then click "next" to the next step
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true,
          },
    ];


    const steps_unit_design_component = [
        {
            target: '[data-tour= "component_expand_panel"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        In this step, teachers will design learning activities for each component. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_header"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        This is a title of the first component.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_time"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        This is the total time of the current component.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "clo_display_view"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        LDS has suggested the sequence of learning outcomes(component level) for this component.
                        <br />
                        As this component requires students to experience how to identify design problems, 
                        LDS has pre-loaded two design thinking skills “empathize with users” and “define design problems” which can be considered as learning outcomes for this component. 
                        Students are also required to do goal-setting by themselves, 
                        thus one of the SDL skills “goal-setting” will also be the learning outcomes addressed in this component. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "clo_ulo_header"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Each component learning outcome must be under a parent unit-level learning outcome.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "clo_add_button"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Teachers can allocate unit-level disciplinary knowledge and other types of learning outcomes 
                        for this component by clicking “add learning outcome”. 
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_pattern_title"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        LDS has suggested the sequence of learning activities for this component under the component learning outcomes.
                        This is the title (summary) of the sequence.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        //#region task relation
        {
            target: '[data-tour= "component_pattern_task"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        LDS has suggested the sequence of learning activities for this component under the component learning outcomes.
                        These are the activties for this component. You cannot edit these sequence activities.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_title"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        This is a brief description of this learning activity.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_type"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    The color bar shown in the left-hand side of each learning activities indicates the types of learning task. 
                    We have developed a task taxonomy to provide teachers with information about the nature of the learning experiences students will have.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_lo"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                    Assessment design is an important step in the design of learning activities. 
                    <br />
                    You may consider what assessment method is appropriate to assess students’ achievement on the component level learning outcomes. 
                    <br />
                    In this case, the learning activity called “students present their findings on user needs to the whole class” is 
                    assessment pre-loaded by the platform. This activity is to evaluate students’ achievement on empathize with users, 
                    define design problem and goal setting.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_time"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        This is the activity time.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_classtype"]',
            placement: 'left',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        This is the activity class type. Where will this activity take place? Out class? Or in class?
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_classtarget"]',
            placement: 'right',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        This is the activity class target. Is it a group work or individual work?
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_resource"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        These are the resource that the activity might use.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_task_eresource"]',
            placement: 'top',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        These are the e-learning resource that the activity might use.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },

        {
            target: '[data-tour= "component_task_description"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        This is a description of this learning activity with more details.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        //#endregion
        {
            target: '[data-tour= "component_pattern_unlock"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Obviously, the pre-loaded learning activities and tasks may not be implemented directly as it does not fit to the local context of the classroom. 
                        So the next step will lead us to design on more details that make the plan feasible for classroom implementations.
                        <br />
                        If you want to edit the tasks freely, please unlock the pattern.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "component_pattern_change"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        The current component has two different set of tasks, you can click this button to change the pre-loaded tasks.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },

    ];

    const steps_unit_design_lesson = [
        {
            target: '[data-tour= "lesson_lesson_list"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        After the completion of the detailed design on the learning activities, 
                        we will arrange those activities into each class period. As mentioned in Step 1, 
                        we have four class periods. For example, how can I arrange Component 1 to the class period?
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lesson_lesson_list"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        In LDS, when you complete designing all the learning activities, 
                        you can move to “Lesson plan” to allocate the activities into different class period. 
                        <br />
                        In this list, it lists all the lessons you set up with the parameter "no of lessson" in the previous step.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lesson_lesson_all"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        In this section you can select this section to view the whole lessons in course.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lesson_lesson_delete"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                       You can delete the lesson by clicking this button
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lesson_lesson_add"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        If you feel the number of lessons is not enough, you can add the empty lesson by clicking this button.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lesson_lesson_0"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        You can select the specific lesson to view the detail in that lesson.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true,
            hideFooter: true,
        },
        {
            target: '[data-tour= "lesson_lesson_select"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Teachers can arrange those activities into each class period by clicking this button.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true,
            hideFooter: true,
        },
        {
            target: '[data-tour= "lesson_component_select"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Choose the curriculum component to be scheduled in current lesson.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            spotlightClicks: true,
            hideFooter: true,
        },
        {
            target: '[data-tour= "lesson_task_select"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Choose the learning activities to be completed in Lesson 1.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
        {
            target: '[data-tour= "lesson_task_add"]',
            placement: 'bottom',
            content: (
                <React.Fragment>
                    <Typography variant="caption">
                        Click the button and save what activities the teachers select. 
                        <br />
                        Repeat this process, and the teachers can allocate all the activities into eact lesson.
                    </Typography>
                </React.Fragment>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
        },
    ];

    return (
        <React.Fragment>
             <Joyride
                callback={handleJoyrideCallback}
                stepIndex={stepIndex}
                steps={steps}
                showProgress={true}
                run = {run}
                continuous={true}
                showSkipButton = {true}
                scrollToSteps={true}
                styles={{
                    options: {
                        arrowColor: '#fff',
                        backgroundColor: '#fff',
                        beaconSize: 36,
                        overlayColor: 'rgba(0, 0, 0, 0.5)',
                        primaryColor: '#f04',
                        spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                        textColor: '#333',
                        width: undefined,
                        zIndex: 1500,
                    },
                    tooltipContainer: {textAlign: 'left'}
                }}
                //   stepIndex= {stepIndex}
            />
        </React.Fragment>
    );
}
export default TourGuide;
