import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import Header from '../common/Header.jsx';
import DepartDate from '../common/DepartDate.jsx';
import HighSpeed from '../common/HighSpeed.jsx';
import Jounery from '../common/Jounery.jsx';
import Submit from '../common/Submit.jsx';

function App(props) {
    return (
        <div>
            <Header />
            <Jounery />
            <DepartDate />
            <HighSpeed />
            <Submit />
        </div>
    )
};

export default connect(
    function mapStateToProps(state) { },
    function mapDispatchToProps(dispatch) { },
    App
)