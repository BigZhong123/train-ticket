import React, { useCallback, useEffect, useMemo } from 'react';
import './App.css';
import URI from 'urijs';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import Ticket from './Ticket.jsx';
import Passengers from './Passengers.jsx';
import Choose from './Choose.jsx';
import Account from './Account.jsx';
import Header from '../common/Header.jsx';
import Detail from '../common/Detail.jsx';
import Menu from './Menu.jsx'

import {
    setTrainNumber,
    setDepartStation,
    setArriveStation,
    setSeatType,
    setDepartDate,
    setSearchParsed,
    fetchInitial,
    addAdult,
    addChild,
    onRemove,
    onUpdate,
    hideMenu,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,
} from './action';
import { bindActionCreators } from 'redux';

function App(props) {
    const {
        trainNumber,
        departStation,
        arriveStation,
        seatType,
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        durationStr,
        price,
        passengers,
        menu,
        isMenuVisible,
        searchParsed,
        dispatch,
    } = props;

    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);

        const { trainNumber, dStation, aStation, type, date } = queries;

        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setSeatType(type));
        dispatch(setDepartDate(dayjs(date).valueOf()));
        dispatch(setSearchParsed(true));
    }, [dispatch]);

    useEffect(() => {
        if (!searchParsed) {
            return;
        }

        const url = new URI('/rest/order')
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', seatType)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
        dispatch(fetchInitial(url));
    }, [searchParsed, departStation, arriveStation, seatType, departDate, dispatch]);

    const passengerCbs = useMemo(() => {
        return bindActionCreators({
            addAdult,
            addChild,
            onRemove,
            onUpdate,
            showGenderMenu,
            showFollowAdultMenu,
            showTicketTypeMenu,
        }, dispatch)
    }, [dispatch])

    const menuCbs = useMemo(() => {
        return bindActionCreators(
            {
                hideMenu,
            },
            dispatch
        );
    }, [dispatch]);

    const chooseCbs = useMemo(() => {
        return bindActionCreators({
            onUpdate
        }, dispatch)
    }, [dispatch])
    
    if (!searchParsed) {
        return null;
    }

    return (
        <div className="app">
            <div className="header-wrapper">
                <Header title="订单填写" onBack={onBack} />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                >
                    <span style={{display: 'block'}} className="train-icon"></span>
                </Detail>
            </div>
            <Ticket price={price} type={seatType} />
            <Passengers passengers={passengers} {...passengerCbs} />
            {
                passengers.length > 0 && (
                    <Choose
                        passengers={passengers}
                        {
                            ...chooseCbs
                        }
                    />
                )
            }
            <Account
                price={price}
                length={passengers.length}
            />
            <Menu
                show={isMenuVisible}
                {...menu}
                {...menuCbs}
            />
        </div>
    )
};

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    },
)(App);