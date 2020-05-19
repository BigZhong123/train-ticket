import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from './reducers.js';
import thunk from 'redux-thunk';

import { ORDER_DEPART } from './constant';

import { h0 } from '../common/fp';

export default createStore(
    combineReducers(reducers),
    {
        from: null, // 出发城市
        to: null, // 到达城市
        departDate: h0(Date.now()), // 出发时间
        highSpeed: false, // 是否高铁动车
        trainList: [], // 动车列表
        orderType: ORDER_DEPART, // 排序根据，出发早到晚，耗时短到长
        onlyTickets: false, // 只显示有票
        ticketTypes: [], // 坐席类型
        checkedTicketTypes: {}, // 选中的坐席类型
        trainTypes: [],  // 车次类型
        checkedTrainTypes: {}, // 选中的车次类型
        departStations: [], // 出发车站
        checkedDepartStations: {}, // 选中的出发车站
        arrivedStations: [], // 到达车站
        checkedArrivedStations: {}, // 选中的到达车站
        departTimeStart: 0, // 起始出发时间
        departTimeEnd: 24, // 末尾出发时间
        arriveTimeStart: 0, // 起始到达时间
        arriveTimeEnd: 24, // 末尾到达时间
        isFilterVisible: false, // 筛选组件是否可见
        searchParse: false, // 信息是否解析完成
    },
    applyMiddleware(thunk)
);