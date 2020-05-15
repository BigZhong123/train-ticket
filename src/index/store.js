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
        from: '北京', // 始发地
        to: '上海', // 终点站
        isCitySelectorVisible: false, // 城市选择组件是否可见
        currentSelectingLeftCity: false, // 城市选择是否是始发站
        cityData: null, // 城市数据
        isLoadingCityData: false, // 是否加载城市数据
        isDateSelectorVisible: false, // 日期选择组件是否可见
        departDate: Date.now(), // 日期
        highSpeed: false, // 是否高铁动车
    },
    applyMiddleware(thunk)
);