import config from 'react-global-configuration';
import configuration from './config';
config.set(configuration);

require('./bootstrap');
require('./components/welcome');
require('./container/registerForm');
require('./container/loginForm');

require('./container/appContainer');
require('./container/design');
require('./container/designContainer');
// require('./container/appContainer');
// require('./components/appLayout');
require('./design/printable/printableContainer');
require('./components/sideMenu');
require('./components/topMenu');
require('./container/app');
require('./dashboard/container/myDesignContainer');
require('./dashboard/container/publicDesignContainer');
require('./usergroup/container/usergroupsListViewContainer');
require('./usergroup/container/usergroupContainer');


window.$ = window.jQuery = require('jquery');
// require('bootstrap-sass');

$.ajaxSetup({
    headers: {
      Authorization: 'Bearer:' + $('meta[name="api-token"]').attr("content")
    }
}); 