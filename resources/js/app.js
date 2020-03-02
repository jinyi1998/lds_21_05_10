import config from 'react-global-configuration';
import configuration from './config';
config.set(configuration);

require('./components/welcome');
require('./container/registerForm');
require('./container/loginForm');

require('./container/design');
require('./container/appContainer');
require('./container/testContainer');
