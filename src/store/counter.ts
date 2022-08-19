import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export interface CounterState {
    count: number,
    list: Array<any>
}
const initialState: CounterState = {
    count: 0,
    list: []
};
export const countSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increase: (state: CounterState) => { state.count += 1 },
        decrease: (state: CounterState) => { state.count = state.count - 1 },
        loadDataEnd: (state, { payload }) => { state.list = payload }
    },
    extraReducers(builder) {
        builder.addCase(loadDataAction.fulfilled, (state, action) => {
            console.log('ful filled', action.payload);
            state.list=[1,2,3];
        }).addCase(loadDataAction.pending, (state, action) => {
            console.log('pending', action);
        })
    },
});

const loadDataRequest = () => {
    fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48').then((res) => {
        
        const data=res.json();
        console.log('fetch res', data);
        return data;
    });
}
export const loadDataAction = createAsyncThunk('loadData', async () => {
    const data = await loadDataRequest();
    console.log('loadDataAction', data);
    return data;
});

//导出reducer和创建出来的actions，名称就是reducers的key名称
export const { increase, decrease ,loadDataEnd} = countSlice.actions;
export default countSlice.reducer;