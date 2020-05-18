import React, {
    useCallback,
    useMemo
} from 'react';
import { bindActionCreators } from 'redux'
import './App.css';
import { connect } from 'react-redux';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector from '../common/citySelector.jsx'

import {
    showCitySelector,
    exchangeFromTo,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector
} from './action.js'

function App(props) {

    const onBack = useCallback(() => {
        window.history.back();
    }, [])

    const {
        from,
        to,
        dispatch,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        departDate
    } = props

    const cbs = useMemo(() => {
        return bindActionCreators({
            showCitySelector,
            exchangeFromTo
        }, dispatch)
    }, [dispatch])

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity
        }, dispatch)
    }, [dispatch])

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector
        }, dispatch)
    }, [dispatch])

    return (
        <div>
            <div className="header-wrapper">
                <Header title={'火车票'} onBack={onBack} />
            </div>
            <form className="form">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed />
                <Submit />
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
                // onBack={() => dispatch(hideCitySelector())}
            />
        </div>
    )
};

export default connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    }
)(App)