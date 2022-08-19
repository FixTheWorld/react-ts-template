import { observable, configure, action } from "mobx"
import TestMobx from '../routes/TestMobx/mobx';
import common from '../common/mobx';

configure({
    enforceActions: 'always'//必须以action的方式来修改状态
})
const stateData = { ...TestMobx.state, ...common.state };
const actionData = [...TestMobx.actions, ...common.actions];
let actions = {};
actionData.map((value) => {
    actions = { ...actions, ...{ [value]: action } };
});
export default observable(stateData, actions);