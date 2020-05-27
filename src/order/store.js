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
        trainNumber: null, // 车次号码
        departStation: null, // 出发车站
        arriveStation: null, // 到达车站
        seatType: null, // 坐席类型
        departDate: Date.now(), // 出发日期
        arriveDate: Date.now(), // 到达日期
        departTimeStr: null, // 出发时间 小时-分钟
        arriveTimeStr: null, // 到达时间 小时-分钟
        durationStr: null, // 运行时间
        price: null, // 票价信息
        passengers: [], // 乘客信息
        menu: null, // 底部菜单
        isMenuVisible: false, // 底部菜单是否可见
        searchParsed: false, // 页面是否解析完成
    },
    applyMiddleware(thunk)
);