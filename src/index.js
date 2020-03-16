import './styles/main.scss';
import 'bootstrap';

import {TestController} from './app/controllers/TestController';
import {TestModel} from './app/models/TestModel';
import {TestView} from './app/views/TestView';

new TestController(new TestModel(), new TestView());