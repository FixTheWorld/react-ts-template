import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


//need to return a promise
const loadDataRequest = () => {
    return fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48').then((res) => {
        const data = res.json();
        return data;
    });
}

/**
 * 导出异步的action,第一个参数是actionType名称，第二个传入一个异步方法，这个方法最终返回的数据放在payload中，
 * 最终会使用createAsyncThunk生成一个异步的action，页面直接掉这个action
**/
export const loadDataAction = createAsyncThunk('loadData', async () => {
    const data = await loadDataRequest();
    return data;
});

export interface MovieState {
    list: Array<any>,
    loading: Boolean
}
const initialState: MovieState = {
    list: [],
    loading: false
};
export const movieSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        //针对两种状态
        builder.addCase(loadDataAction.fulfilled, (state, { payload }) => {
            console.log('ful filled', payload);
            state.list = payload.data.list;
            state.loading = false;
        }).addCase(loadDataAction.pending, (state, action) => {
            state.loading = true;
            console.log('pending', action);
        }).addCase(loadDataAction.rejected, (state, err) => {
            state.loading = false;
            console.log('err', err);
        })
    },
});
//导出reducer和创建出来的actions，名称就是reducers的key名称
export default movieSlice.reducer;