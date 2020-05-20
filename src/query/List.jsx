import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './List.css';
import URI from 'urijs';

const ListItem = memo(function ListItem(props) {
    const {
        dTime, // 出发时间
        aTime, // 到达时间
        dStation, // 出发地点
        aStation, // 到达地点
        trainNumber, // 车次信息
        date, // 出发日期
        time, // 时间
        priceMsg, // 价格
        dayAfter, // 是否跨越一天
    } = props;

    const url = useMemo(() => {
        return new URI('ticket.html')
            .setSearch('aStation', aStation)
            .setSearch('dStation', dStation)
            .setSearch('trainNumber', trainNumber)
            .setSearch('date', date)
            .toString();
    }, [aStation, dStation, date, trainNumber])

    return (
        <li className="list-item">
            <a href={url}>
            <span className="item-time">
                <em>{ dTime }</em>
                <br/>
                <em className="em-light">{ aTime } <i className="time-after">{ dayAfter }</i></em>
            </span>
            <span className="item-stations">
                <em>
                    <i className="train-station train-start">始</i>
                    { dStation }
                </em>
                <br/>
                <em className="em-light">
                    <i className="train-station train-end">终</i>
                    { aStation }
                </em>
            </span>
            <span className="item-train">
                <em>{ trainNumber }</em>
                <br/>
                <em className="em-light">{ time }</em>
            </span>
            <span className="item-ticket">
                <em>{ priceMsg }</em>
                <br/>
                <em className="em-light-orange">可抢票</em>
            </span>
            </a>
        </li>
    )

})

ListItem.propTypes = {
    dTime: PropTypes.string.isRequired,
    aTime: PropTypes.string.isRequired,
    dStation: PropTypes.string.isRequired,
    aStation: PropTypes.string.isRequired,
    trainNumber: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    dayAfter: PropTypes.string.isRequired,
}

const List = memo(function List(props) {
    const { list } = props;

    return (
        <ul className="list">
            {
                list.map(item => {
                    return (
                        <ListItem {...item} key={item.trainNumber} />
                    )
                })
            }
        </ul>
    )
})

export default List;

List.propTypes = {
    list: PropTypes.array.isRequired,
}