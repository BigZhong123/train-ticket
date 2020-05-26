import { ORDER_DEPART, ORDER_DURATION } from './constant';

export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_TRAIN_LIST = 'SET_TRAIN_LIST';
export const ACTION_SET_ORDER_TYPE = 'SET_ORDER_TYPE';
export const ACTION_SET_ONLY_TICKETS = 'SET_ONLY_TICKETS';
export const ACTION_SET_TICKET_TYPES = 'SET_TICKET_TYPES';
export const ACTION_SET_CHECKED_TICKET_TYPES = 'SET_CHECKED_TICKET_TYPES';
export const ACTION_SET_TRAIN_TYPES = 'SET_TRAIN_TYPES';
export const ACTION_SET_CHECKED_TRAIN_TYPES = 'SET_CHECKED_TRAIN_TYPES';
export const ACTION_SET_DEPART_STATIONS = 'SET_DEPART_STATIONS';
export const ACTION_SET_CHECKED_DEPART_STATIONS = 'SET_CHECKED_DEPART_STATIONS';
export const ACTION_SET_ARRIVED_STATIONS = 'SET_ARRIVED_STATIONS';
export const ACTION_SET_CHECKED_ARRIVED_STATIONS = 'SET_CHECKED_ARRIVED_STATIONS';
export const ACTION_SET_DEPART_TIME_START = 'SET_DEPART_TIME_START';
export const ACTION_SET_DEPART_TIME_END = 'SET_DEPART_TIME_END';
export const ACTION_SET_ARRIVE_TIME_START = 'SET_ARRIVE_TIME_START';
export const ACTION_SET_ARRIVE_TIME_END = 'SET_ARRIVE_TIME_END';
export const ACTION_SET_IS_FILTER_VISIBLE = 'SET_IS_FILTER_VISIBLE';
export const ACTION_SET_SEARCH_PARSE = 'SET_SEARCH_PARSE';

export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from
    }
}

export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to
    }
}

export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate
    }
}

export function setHighSpeed(highSpeed) {
    return {
        type: ACTION_SET_HIGH_SPEED,
        payload: highSpeed
    }
}

export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed} = getState();
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed
        })
    }
}

export function setTrainList(trainList) {
    return {
        type: ACTION_SET_TRAIN_LIST,
        payload: trainList
    }
}

export function toggleOrderType() {
    return (dispatch, getState) => {
        const { orderType } = getState();
        if (orderType === ORDER_DEPART) {
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DURATION
            })
        } else {
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DEPART
            })
        }
    }
}

export function toggleOnlyTickets() {
    return (dispatch, getState) => {
        const { onlyTickets } = getState();
        dispatch({
            type: ACTION_SET_ONLY_TICKETS,
            payload: !onlyTickets
        })
    }
}

export function setTicketTypes(ticketTypes) {
    return {
        type: ACTION_SET_TICKET_TYPES,
        payload: ticketTypes
    }
}

export function setCheckedTicketTypes(checkedTicketTypes) {
    return {
        type: ACTION_SET_CHECKED_TICKET_TYPES,
        payload: checkedTicketTypes
    }
}

export function setTrainTypes(trainTypes) {
    return {
        type: ACTION_SET_TRAIN_TYPES,
        payload: trainTypes
    }
}

export function setCheckedTrainTypes(checkedTrainTypes) {
    return {
        type: ACTION_SET_CHECKED_TRAIN_TYPES,
        payload: checkedTrainTypes
    }
}

export function setDepartStations(departStations) {
    return {
        type: ACTION_SET_DEPART_STATIONS,
        payload: departStations
    }
}

export function setCheckedDepartStations(checkedDepartStations) {
    return {
        type: ACTION_SET_CHECKED_DEPART_STATIONS,
        payload: checkedDepartStations
    }
}

export function setArrivedStations(arrivedStations) {
    return {
        type: ACTION_SET_ARRIVED_STATIONS,
        payload: arrivedStations
    }
}

export function setCheckedArrivedStations(checkedArrivedStations) {
    return {
        type: ACTION_SET_CHECKED_ARRIVED_STATIONS,
        payload: checkedArrivedStations
    }
}

export function setDepartTimeStart(departTimeStart) {
    return {
        type: ACTION_SET_DEPART_TIME_START,
        payload: departTimeStart
    }
}

export function setDepartTimeEnd(departTimeEnd) {
    return {
        type: ACTION_SET_DEPART_TIME_END,
        payload: departTimeEnd
    }
}

export function setArriveTimeStart(arriveTimeStart) {
    return {
        type: ACTION_SET_ARRIVE_TIME_START,
        payload: arriveTimeStart
    }
}

export function setArriveTimeEnd(arriveTimeEnd) {
    return {
        type: ACTION_SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd
    }
}

export function toggleIsFiltersVisible() {
    return (dispatch, getState) => {
        const { isFilterVisible } = getState();
        dispatch({
            type: ACTION_SET_IS_FILTER_VISIBLE,
            payload: !isFilterVisible
        })
    }
}

export function setSearchParse(searchParse) {
    return {
        type: ACTION_SET_SEARCH_PARSE,
        payload: searchParse
    }
}

export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();
        dispatch(setDepartDate(departDate + 86400 * 1000))
    }
}

export function preDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();
        dispatch(setDepartDate(departDate - 86400 * 1000))
    }
}
