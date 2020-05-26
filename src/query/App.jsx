import React, { useEffect, useCallback, useMemo } from 'react';
import './App.css';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import URI from 'urijs';
import { h0 } from '../common/fp';

import { bindActionCreators } from 'redux';

import Header from '../common/Header.jsx';
import List from './List.jsx';
import Bottom from './Bottom.jsx';
import Nav from '../common/Nav.jsx';

import useNav from '../common/useNav';

import {
    setFrom,
    setTo,
    setHighSpeed,
    setDepartDate,
    setSearchParse,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setArrivedStations,
    setDepartStations,
    nextDate,
    preDate,
    toggleHighSpeed,
    toggleOrderType,
    toggleOnlyTickets,
    toggleIsFiltersVisible,

    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArrivedStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
} from './action';

function App(props) {
    const {
        from,
        to,
        highSpeed,
        departDate,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArrivedStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        searchParse,
        dispatch,
        trainList,
        isFilterVisible,

        ticketTypes,
        trainTypes,
        departStations,
        arrivedStations,

    } = props;

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    useEffect(() => {
        const queries = new URI(window.location.href).search(true);
        const {
            from,
            to,
            date,
            highSpeed
        } = queries

        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setHighSpeed(highSpeed === 'true'))
        dispatch(setDepartDate(h0(dayjs(date).valueOf())))

        dispatch(setSearchParse(true))
    }, [dispatch])

    useEffect(() => {
        if (!searchParse) {
            return;
        }
        const url = new URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
            .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
            .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
            .setSearch('checkedArriveStations', Object.keys(checkedArrivedStations).join())
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString();

        fetch(url)
            .then(response => response.json())
            .then(result => {
            const {
                dataMap: {
                    directTrainInfo: {
                        trains,
                        filter: {
                            ticketType,
                            trainType,
                            depStation,
                            arrStation,
                        },
                    },
                },
            } = result;

            dispatch(setTrainList(trains));
            dispatch(setTicketTypes(ticketType));
            dispatch(setTrainTypes(trainType));
            dispatch(setDepartStations(depStation));
            dispatch(setArrivedStations(arrStation));
        })
    }, [
        arriveTimeEnd,
        arriveTimeStart,
        checkedArrivedStations,
        checkedDepartStations,
        checkedTicketTypes,
        checkedTrainTypes,
        departDate,
        departTimeEnd,
        departTimeStart,
        dispatch,
        from,
        highSpeed,
        onlyTickets,
        orderType, 
        searchParse,
        to
    ])

    const {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    } = useNav(departDate, dispatch, preDate, nextDate)

    const BottomCbs = useMemo(() => {
        return bindActionCreators({
            toggleHighSpeed,
            toggleOrderType,
            toggleOnlyTickets,
            toggleIsFiltersVisible,
            setCheckedTicketTypes,
            setCheckedTrainTypes,
            setCheckedDepartStations,
            setCheckedArrivedStations,
            setDepartTimeStart,
            setDepartTimeEnd,
            setArriveTimeStart,
            setArriveTimeEnd,
        }, dispatch)
    }, [dispatch])

    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from}--${to}`} onBack={onBack}
                />
            </div>
            <Nav
                date={departDate}
                next={next}
                prev={prev}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
            />
            <List list={trainList} />
            <Bottom
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                isFilterVisible={isFilterVisible}
                {...BottomCbs}
                checkedTicketTypes={checkedTicketTypes}
                checkedTrainTypes={checkedTrainTypes}
                checkedDepartStations={checkedDepartStations}
                checkedArrivedStations={checkedArrivedStations}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                ticketTypes={ticketTypes}
                trainTypes={trainTypes}
                departStations={departStations}
                arrivedStations={arrivedStations}
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
    },
)(App)