import React, {useMemo} from 'react';
import './DepartDate.css';
import { h0 } from '../common/fp';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export default function DepartDate(props) {

    const { time, onClick } = props;

    const h0Time = h0(time);

    const departDate = new Date(h0Time);

    const isToday = h0() === h0Time

    const timeString = useMemo(() => {
        return dayjs(h0Time).format('YYYY-MM-DD');
    }, [h0Time])

    const weekString = '星期' 
        + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] 
        + (isToday ? '(今天)' : '')

    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={timeString} />
            { timeString } <span className="depart-week">{weekString}</span>
        </div>
    )
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}
