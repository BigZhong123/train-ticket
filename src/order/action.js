export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER';
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION';
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION';
export const ACTION_SET_SEAT_TYPE = 'SET_SEAT_TYPE';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE';
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR';
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR';
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR';
export const ACTION_SET_PRICE = 'SET_PRICE';
export const ACTION_SET_PASSENGERS = 'SET_PASSENGERS';
export const ACTION_SET_MENU = 'SET_MENU';
export const ACTION_SET_IS_MENU_VISIBLE = 'SET_IS_MENU_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';

export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}
export function setDepartStation(departStation) {
    return {
        type: ACTION_SET_DEPART_STATION,
        payload: departStation,
    };
}
export function setArriveStation(arriveStation) {
    return {
        type: ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}
export function setSeatType(seatType) {
    return {
        type: ACTION_SET_SEAT_TYPE,
        payload: seatType,
    };
}
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setArriveDate(arriveDate) {
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}
export function setDepartTimeStr(departTimeStr) {
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}
export function setDurationStr(durationStr) {
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}
export function setPrice(price) {
    return {
        type: ACTION_SET_PRICE,
        payload: price,
    };
}
export function setPassengers(passengers) {
    return {
        type: ACTION_SET_PASSENGERS,
        payload: passengers,
    };
}
export function setMenu(menu) {
    return {
        type: ACTION_SET_MENU,
        payload: menu,
    };
}
export function setIsMenuVisible(isMenuVisible) {
    return {
        type: ACTION_SET_IS_MENU_VISIBLE,
        payload: isMenuVisible,
    };
}
export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}
export function fetchInitial(url) {
    return (dispatch, getState) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                    price,
                } = data;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setPrice(price));
            });
    };
}

let passengerId = 0;

export function addAdult() {
    return (dispatch, getState) => {
        const { passengers } = getState();

        for(let passenger of passengers) {
            let keys = Object.keys(passenger)
            for(let key of keys) {
                if (!passenger[key]) {
                    return
                }
            }
        }

        return dispatch(setPassengers([
            ...passengers,
            {
                id: ++passengerId,
                name: '',
                ticketType: 'adult',
                licenceNo: '',
                seat: 'Z',
            }
        ]))
    }
}

export function addChild() {
    return (dispatch, getState) => {
        const { passengers } = getState();

        let followNumber = null;

        for(let passenger of passengers) {
            let keys = Object.keys(passenger)
            for(let key of keys) {
                if (!passenger[key]) {
                    return
                }
            }
            if (passenger.ticketType === 'adult') {
                followNumber = passenger.id;
            }
        }

        if (!followNumber) {
            alert('请至少添加一个随行成人!');
            return;
        }

        return dispatch(setPassengers([
            ...passengers,
            {
                id: ++passengerId,
                name: '',
                ticketType: 'child',
                seat: 'Z',
                gender: 'none',
                birthday: '',
                followAdult: followNumber,
            }
        ]))
    }
}

export function onRemove(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const newPassengers = passengers.filter(passenger => {
            return passenger.id !== id && passenger.followAdult !== id
        })

        dispatch(setPassengers(newPassengers))
    }
}

export function onUpdate(id, data, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        for(let i = 0; i < passengers.length; i++) {
            if (passengers[i].id === id) {
                const newPassengers = [...passengers];
                newPassengers[i] = Object.assign({}, passengers[i], data);

                for (let key in keysToBeRemoved) {
                    delete newPassengers[i][key]
                }

                dispatch(setPassengers(newPassengers))

                break;
            }
        }
    }
}

export function showMenu(menu) {
    return (dispatch) => {
        dispatch(setMenu(menu));
        dispatch(setIsMenuVisible(true))
    }
};

export function hideMenu() {
    return setIsMenuVisible(false);
}

export function showGenderMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();
        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        return dispatch(showMenu({
            onPress(gender) {
                dispatch(onUpdate(id, { gender }));
                dispatch(hideMenu());
            },
            options: [
                {
                    title: '男',
                    value: 'male',
                    active: 'male' === passenger.gender,
                },
                {
                    title: '女',
                    value: 'female',
                    active: 'female' === passenger.gender,
                },
            ],
        }))
    }
}

export function showFollowAdultMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();
        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(showMenu({
            onPress(followAdult) {
                dispatch(onUpdate(id, { followAdult }));
                dispatch(hideMenu());
            },
            options: passengers.filter(passenger => {
                return passenger.id !== id && passenger.ticketType === 'adult'
            }).map(adult => {
                return {
                    title: adult.name,
                    value: adult.id,
                    active: adult.id === passenger.followAdult
                }
            })
        }))
    }
}

export function showTicketTypeMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();
        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(showMenu({
            onPress(ticketType) {
                if (ticketType === 'adult') {
                    dispatch(onUpdate(id, {
                        ticketType,
                        licenceNo: ''
                    }, ['birthday', 'gender', 'followAdult']))
                } else {
                    const adult = passengers.find(passenger => {
                        return passenger.id !== id && passenger.ticketType === 'adult'
                    })
                    if(adult) {
                        dispatch(onUpdate(id, {
                            ticketType,
                            gender: 'none',
                            birthday: '',
                            followAdult: adult.id
                        }, ['licenecNo']))
                    } else {
                        alert('请至少添加一名成人乘客')
                    }
                }
                dispatch(hideMenu());
            },
            options: [
                {
                    title: '成人票',
                    value: 'adult',
                    active: 'adult' === passenger.ticketType,
                },
                {
                    title: '儿童票',
                    value: 'child',
                    active: 'child' === passenger.ticketType,
                },
            ],
            
        }))
    }
}
