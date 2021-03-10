import React from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';  
// import jsPDF from 'jspdf';  

import {apiPrintableGet,
    apiOptionsList, apiPrintableGetPatternOpts, 
} from '../../api';

import PrintableContent from './printableContent';

export const PrintableStore = React.createContext({
});

const PrintableContainer = (props) => {
    const isPrint = typeof props.isPrint !== 'undefined'? props.isPrint: true;
    const courseid = initCourseID();

    function initCourseID(){
        if(props.courseid){
            return props.courseid;
        }else{
            if (document.getElementById('printablecontainer')) {
                return document.getElementById('printablecontainer').dataset.courseid;
            }else{
                return -1;
            }
        }
    }

    const [course, setCourse] = React.useState({
        unit_title: "",
        level: "",
        no_of_lesson: "",
        description: 1,
        componentid: [],
        components: [],
        outcomes: [],
        outcomeid: [],
        lessons: [],
        isinited: false,
        created_by: -1
    });

    const [optionsInit, setOptions] = React.useState({
        "designType": [],
        "taskType": [],
        "taskClassType": [],
        "taskSize": [],
        "taskTarget": [],
        "taskResource": [],
        "taskElearingResource": [],
        "bloomLvlOpts": [],
        "outcomeTypeOpts": [],
        "STEMTypeOpts": []
    });

    const [taskTypeColorValue, setTaskTypeColorValue] = React.useState({});

    const taskTypeColor = (task_type)=>{

        try{
            var color = taskTypeColorValue.find(x => x.id == task_type);
            return ({
                backgroundColor:  color.color,
                height: "100%",
                width: "12px"
            });
        }catch{
            return ({
                backgroundColor:  "#194d33",
                height: "100%"
            });
        }
    }

    async function fetchlearningPatternOptsData() {
        await apiPrintableGetPatternOpts().then(
            response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "learningPatternOpts": response.data
                }));
            }
        )
    }

    async function fetchlearningOptsData() {

        await apiOptionsList().then(response=>{
            setOptions(optionsInit=> ({
                ...optionsInit,
                "designType": response.data.designType,
                "taskType": response.data.learningTasktypeOpts,
                "taskClassType": response.data.classTypeOpts,
                "taskSize": response.data.classSizeOpts,
                "taskTarget": response.data.classTargetOpts,
                "taskResource": response.data.resourceOpts,
                "taskElearingResource": response.data.elearningtoolOpts,
                "bloomLvlOpts": response.data.bloomLvlOpts,
                "outcomeTypeOpts": response.data.outcomeTypeOpts,
                "STEMTypeOpts": response.data.STEMTypeOpts
            }))
            setTaskTypeColorValue(response.data.learningTasktypeOpts)
        })
        .catch(error => console.log(error));
    }



    async function InitDesignOption() {

        await fetchlearningOptsData();
        await fetchlearningPatternOptsData();
    }

    React.useEffect(()=>{
        apiPrintableGet({id: courseid})
                .then((repsonse)=> {
                    setCourse(repsonse.data)
                    InitDesignOption();
                    // printDocument();
                    if(isPrint){
                        setTimeout(()=> {window.print()}, 3000)  
                    } 
                })
       
       
    }, [])

    // const printDocument = () => {  
    //     const input = document.getElementById('pdfdiv');  
    //     html2canvas(input)  
    //       .then((canvas) => {  
    //         var imgWidth = 200;  
    //         var pageHeight = 290;  
    //         var imgHeight = canvas.height * imgWidth / canvas.width;  
    //         var heightLeft = imgHeight;  
    //         const imgData = canvas.toDataURL('image/png');  
    //         const pdf = new jsPDF('p', 'mm', 'a4')  
    //         var position = 0;  
    //         var heightLeft = imgHeight;  
    //         // pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
    //         // pdf.save("download.pdf");  

    //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //         heightLeft -= pageHeight;

    //         while (heightLeft >= 0) {
    //             position = heightLeft - imgHeight;
    //             pdf.addPage();
    //             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //             heightLeft -= pageHeight;
    //         }
    //         pdf.save("download.pdf");  
    //       });  
    //   }  

    return (
        <PrintableStore.Provider
        value={{
            course: course,
            options: optionsInit,
            taskTypeColor: taskTypeColor,

        }}
        >   
            <PrintableContent />  
        </PrintableStore.Provider>
    );
}

export default PrintableContainer;

if (document.getElementById('printablecontainer')) {
    ReactDOM.render(<PrintableContainer/>, document.getElementById('printablecontainer'));
}


