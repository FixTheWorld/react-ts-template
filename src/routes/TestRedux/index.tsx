import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import store, { RootState, AppDispatch } from "../../store/store";
import { increase } from "../../store/counter";
import { loadDataAction } from "../../store/movieSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ReduxTest(props: any) {
  const location = useLocation();
  const history = useNavigate();
  const params = useParams();
  console.log({ location, params });
  const [count, setCount] = useState(0);
  const reduxCount = useSelector((state: RootState) => state.counter.count);
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);
  const addCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  useEffect(() => {
    console.log("count changed", count);
  }, [count]);

  let obj:any = { name: "zc", age: 12 };
  Object.defineProperty(obj, "test", {
    get() {
      console.log("get used",this.age);
      return this.age;
    },
    set(v) {
      console.log("set  used");
      this.age = v;
    },
  });
  console.log(obj.test);
  obj.test=22;
  return (
    <div className="App">
      <main className="cont">
        <h1>{reduxCount}</h1>
        <h1>{count}</h1>
        {movies.loading && <h2>loading</h2>}
        <div className="button-toolbar">
          <button onClick={() => addCount()}>ADD</button>
          <button onClick={() => dispatch(increase())}>redux ADD</button>
          <button onClick={() => dispatch(loadDataAction())}>loadData</button>
          <button onClick={() => history(-1)}>refresh</button>
        </div>
        <ol>
          {movies.list.map((item) => {
            return <li key={item.tvId}>{item.name}</li>;
          })}
        </ol>
      </main>
    </div>
  );
}

export default ReduxTest;
