import { runInAction } from "mobx";

export default {
    state: {
        loading: false,
        error:false,
        errorMessage:'',
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
        },
        showError(message){
            this.error=true;
            this.errorMessage=message
        },
        hideError(){
            this.error=false;
            this.errorMessage='';
        }
    },
    actions: [
        'showLoading',
        'hideLoading',
        'showError',
        'hideError'
    ]
}