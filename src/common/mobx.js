import { runInAction } from "mobx";

export default {
    state: {
        loading: false,
        showLoading() {
            if (!this.loading) {
                this.loading = true;
            }
        }, hideLoading() {
            if (this.loading) {
                this.loading = false;
            }

            // setTimeout(() => {
            //     if (this.loading) {
            //         runInAction(() => {
            //             this.loading = false;
            //         })
            //     }
            // }, 500);
        }
    },
    actions: [
        'showLoading',
        'hideLoading'
    ]
}