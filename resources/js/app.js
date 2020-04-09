import config from 'react-global-configuration';
import configuration from './config';
config.set(configuration);

require('./bootstrap');
require('./components/welcome');
require('./container/registerForm');
require('./container/loginForm');

require('./container/design');
require('./container/designContainer');
require('./container/appContainer');
// require('./components/appLayout');
require('./components/sideMenu');
require('./components/topMenu');
require('./container/testContainer');
require('./container/test');
require('./dashboard/myDesign');
require('./dashboard/publicDesign');


window.$ = window.jQuery = require('jquery');
// require('bootstrap-sass');