import React, {
    useEffect,
    lazy,
    Suspense,
    useMemo
} from 'react';
import { bindActionCreators } from 'redux';
import './App.css';
import { connect } from 'react-redux';
import URI from 'urijs';
import Header from '../common/Header.jsx';
import Nav from '../common/Nav.jsx';
import dayjs from 'dayjs';
import useNav from '../common/useNav';
import { h0 } from '../common/fp';
import Detail from '../common/Detail.jsx';
// import Schedule from './Schedule.jsx';
import Candidate from './Candidate.jsx';
import { trainContext } from "./context";

import {
    setDepartStation,
    setArriveStation,
    setDepartDate,
    setTrainNumber,
    setSearchParsed,
    preDate,
    nextDate,
    setDepartTimeStr,
    setArriveTimeStr,
    setArriveDate,
    setDurationStr,
    setTickets,
    toggleScheduleVisible
} from './action';

const Schedule = lazy(() => import('./Schedule.jsx'));

function App(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,

        dispatch,
    } = props;

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const {
            date,
            aStation,
            dStation,
            trainNumber
        } = queries;

        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setTrainNumber(trainNumber));

        dispatch(setSearchParsed(true));

    }, [dispatch])

    const onBack = () => {
        window.history.back();
    }

    const {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    } = useNav(departDate, dispatch, preDate, nextDate);

    useEffect(() => {
        document.title = trainNumber
    }, [trainNumber])

    useEffect(() => {
        const url = new URI('/rest/ticket')
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('trainNumber', trainNumber)
            .toString();

        fetch(url).then(response => {
            return response.json()
        }).then(result => {
            const { detail, candidates } = result;
            const {
                departTimeStr,
                arriveTimeStr,
                arriveDate,
                durationStr
            } = detail;

            dispatch(setDepartTimeStr(departTimeStr));   
            dispatch(setArriveTimeStr(arriveTimeStr));
            dispatch(setArriveDate(arriveDate));
            dispatch(setDurationStr(durationStr));
            dispatch(setTickets(candidates));
        })
    }, [departDate, dispatch, trainNumber])

    const detailCbs = useMemo(() => {
        return bindActionCreators({
            toggleScheduleVisible
        }, dispatch)
    }, [dispatch])

    if (!searchParsed) {
        return null;
    }

    return (
        <div className="app">
            <div className="header-wrapper">
                <Header
                    title={trainNumber}
                    onBack={onBack}
                />
            </div>
            <div className="nav-wrapper">
                <Nav
                    date={departDate}
                    next={next}
                    prev={prev}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                    trainNumber={trainNumber}
                    {
                        ...detailCbs
                    }
                />
            </div>
            <trainContext.Provider value={{
                trainNumber,
                departStation,
                arriveStation,
                departDate
            }}>
                <Candidate tickets={tickets} />
            </trainContext.Provider>
            {
                isScheduleVisible && (
                    <div
                        className="mask"
                        onClick={() => dispatch(toggleScheduleVisible())}
                    >
                        <Suspense fallback={<div>loading</div>}>
                            <Schedule
                                date={departDate}
                                trainNumber={trainNumber}
                                departStation={departStation}
                                arriveStation={arriveStation}
                            />
                        </Suspense>
                    </div>
                )
            }
        </div>
    )
};

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    }
)(App)