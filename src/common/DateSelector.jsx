import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './DateSelector.css';

import { h0 } from '../common/fp';

import Header from '../common/Header.jsx';

function Day(props) {
    const { day, onSelect } = props;

    if (!day) {
        return (
            <td className="null"></td>
        )
    }

    const now = h0();

    const classes = [];

    if (day < now) {
        classes.push('disabled');
    }

    if ([0, 6].includes(new Date(day).getDay())) {
        classes.push('weekend')
    }

    const dayeString = now === day ? '今天' : new Date(day).getDate()

    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            { dayeString }
        </td>
    )
}

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
}

function Week(props) {
    const { week, onSelect } = props;
    
    return (
        <tr className="date-table-days">
            {
                week.map((day, index) => {
                    return (
                        <Day
                            key={index}
                            day={day}
                            onSelect={onSelect}
                        />
                    )
                })
            }
        </tr>
    )
}

Week.propTypes = {
    week: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
}

function Month(props) {
    const { startingTimeInMonth, onSelect } = props;

    let flagDay = new Date(startingTimeInMonth);
    let currentDay = new Date(startingTimeInMonth);

    let days = []

    while (currentDay.getMonth() === flagDay.getMonth()) {
        days.push(new Date(currentDay).getTime());
        currentDay.setDate(currentDay.getDate() + 1)
    }

    days = new Array(new Date(days[0]).getDay() ? new Date(days[0]).getDay() - 1 : 6).fill(null).concat(days)

    days = days.concat(new Array(new Date(days[days.length - 1]).getDay() ? 7 - new Date(days[days.length - 1]).getDay() : 0).fill(null))

    let weeks = [];

    for (let row = 0; row < days.length / 7; row ++) {
        weeks.push(days.slice(row * 7, (row + 1) * 7))
    }    

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {flagDay.getFullYear()}年{flagDay.getMonth() + 1}月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                    weeks.map((week, index) => {
                        return (
                            <Week
                                key={index}
                                week={week}
                                onSelect={onSelect}
                            />
                        )
                    })
                }
            </tbody>
        </table>
    )

}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default function DateSelector(props) {
    const { show, onSelect, onBack } = props;

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    now.setDate(1);

    let dateSequence = [now.getTime()];

    now.setMonth(now.getMonth() + 1);
    dateSequence.push(now.getTime());

    now.setMonth(now.getMonth() + 1);
    dateSequence.push(now.getTime());

    return (
        <div className={classnames('date-selector', {hidden: !show})}>
            <Header
                title="日期选择"
                onBack={onBack}
            />
            <div className="date-selector-tables">
                {
                    dateSequence.map(month => {
                        return (
                            <Month key={month} startingTimeInMonth={month} onSelect={onSelect} />
                        )
                    })
                }
            </div>
        </div>
    )
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    // onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
}