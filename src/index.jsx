import React from 'react';
import ReactDOM from 'react-dom';

import LoginPage from 'components/LoginPage.jsx';
import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    ReactDOM.render(
        <div>
            <LoginPage />
        </div>,
        document.getElementById('root')
    );
};
