
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name 
        // MuiListItem: {
        //     root: {
        //         '&$selected, &$selected:hover': {
        //             backgroundColor: '#98ff9888',
        //           },
        //     }
        // },
        MuiToggleButton:{
            root:{
                '&$selected, &$selected:hover': {
                    backgroundColor: '#98ff9888',
                  },
            }
          },

        MuiListItemIcon:{
            root:{
                minWidth: "24px"
            }
        },
        MuiAccordionDetails: {
            root: {
                padding: 0
            }
        },
        MuiAccordionSummary:{
            root: {
                minHeight: "24px",
                paddingTop: 4,
                paddingBottom: 4,
                "&$expanded": {
                    minHeight: "36px"
                }
            },
            content: {
                fontSize: "0.8rem",
                fontWeight: "bold"
            }
        },
        MuiListItem:{
            root: {
                '&$selected': {
                    // background: 'linear-gradient(to right, #3f51b5 3%, rgba(0, 0, 0, 0.08) 3%)',
                    fontWeight: "bold"
                },
            },
            // selected:{
            //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            // }
        },
        MuiListItemText:{
            root: {
               textOverflow: "ellipsis"
            }
        }
        // text-overflow: ellipsis:
    },
});

const AppContainer = () => {
    return (
        <ThemeProvider theme={theme}>
            <App 
                course_id = {document.getElementById('appcontainer').dataset.courseid} 
                step = {document.getElementById('appcontainer').dataset.design_step} 
                user = {document.getElementById('appcontainer').dataset.user}
                module =  {document.getElementById('appcontainer').dataset.module}
                usergroupid = {document.getElementById('appcontainer').dataset.usergroupid? document.getElementById('appcontainer').dataset.usergroupid : -1}
                pattern_id =  {document.getElementById('appcontainer').dataset.patternid}
                component_id = {document.getElementById('appcontainer').dataset.componentid}
                designtype_id = {document.getElementById('appcontainer').dataset.designtypeid? document.getElementById('appcontainer').dataset.designtypeid : -1}
                patternbin_category_id = {document.getElementById('appcontainer').dataset.patternbin_category_id? document.getElementById('appcontainer').dataset.patternbin_category_id : -1}
            />
          </ThemeProvider>
    );
}
export default AppContainer;


if (document.getElementById('appcontainer')) {
    ReactDOM.render(<AppContainer/>, document.getElementById('appcontainer'));
}

