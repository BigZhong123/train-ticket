import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from './reducers.js';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {
        departDate: Date.now(), // 出发日期
        arriveDate: Date.now(), // 到达日期
        departTimeStr: null, // 出发时间 小时分钟
        arriveTimeStr: null, // 到达时间 小时分钟
        departStation: null, // 出发车站
        arriveStation: null, // 到达车站
        trainNumber: null, // 车次号码
        durationStr: null, // 运行时长
        tickets: [], // 票信息数组
        isScheduleVisible: false, // 悬浮框是否打开
        searchParsed: false, // 页面url是否解析完成
    },
    applyMiddleware(thunk)
);