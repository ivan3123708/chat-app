import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './components/ChatApp';
import './styles/index.scss';
import './styles/themes/violet.scss';
import './styles/themes/light.scss';
import './styles/themes/dark.scss';
import './styles/themes/pink.scss';
import './styles/themes/green.scss';

ReactDOM.render(<ChatApp />, document.getElementById('app_root'));
