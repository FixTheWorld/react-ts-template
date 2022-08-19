import axios from 'axios';
import { runInAction } from 'mobx';
export default {
    state: {
        name: 'test',
        isShowName: false,
        list: [],
        setIsShowName() {
            console.log('set is show')
            this.isShowName = !this.isShowName
        },
        getList() {
            axios.get("/ajax/filterCinemas?ci=10&optimus_uuid=7C7A63F0192A11ED97E2CB3B6951DCE48B79ED1D54BC49A99EBDB23EEF27CAD8&optimus_risk_level=71&optimus_code=10").then(res => {
                runInAction(() => {
                    console.log('res of axios', res);
                    this.list = res;
                })
            });
        }
    },
    actions: ['setIsShowName', 'getList']
}