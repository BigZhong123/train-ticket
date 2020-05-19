import React, {
    useCallback,
    useMemo
} from 'react';
import { bindActionCreators } from 'redux'
import './App.css';
import { connect } from 'react-redux';
import { h0 } from '../common/fp';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector from '../common/CitySelector.jsx';
import DateSelector from '../common/DateSelector.jsx';

import {
    showCitySelector,
    exchangeFromTo,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed
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
        departDate,
        isDateSelectorVisible,
        highSpeed
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

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector
        }, dispatch)
    }, [dispatch])

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators({
            toggle: toggleHighSpeed
        }, dispatch)
    }, [dispatch])

    const dateSelectAction = useCallback(day => {
        const now = h0();

        if (!day) {
            return;
        }

        if (day < now) {
            return;
        }

        dispatch(setDepartDate(day))
        dispatch(hideDateSelector())
    }, [dispatch])

    return (
        <div>
            <div className="header-wrapper">
                <Header title={'火车票'} onBack={onBack} />
            </div>
            <form className="form" action="./query.html">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed
                    highSpeed={highSpeed}
                    {...highSpeedCbs}
                />
                <Submit />
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
                // onBack={() => dispatch(hideCitySelector())}
            />
            <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
                onSelect={dateSelectAction}
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