import { autorun } from "mobx";
import { Observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { getApi } from "../../common/request";
import Store from "../../store/mobx";
import store from "../../store/store";
// import { observable, autorun } from "mobx";
// let obNumber = observable.box(10);
// autorun(() => {
//     console.log('get num',obNumber.get());
// });

// setTimeout(()=>{
// obNumber.set(30);
// },3000)
function TestMobx() {
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    console.log('use effect');
    let clean=autorun(() => {
      console.log("showName", Store.isShowName);
      setShowName(Store.isShowName);
    });
    return clean;
  },[]);
  const name = Store.name;
  return (
    <div>
      <div>{showName && <Child name={name} />}</div>
      <button
        onClick={() => {
          Store.setIsShowName();
          // Store.isShowName=!Store.isShowName;
        }}
      >
        toggle
      </button>
    </div>
  );
}
interface IChild{
    name:string
}
//
function  Child({name}:IChild){
    useEffect(()=>{
        console.log('child');
        return ()=>{
            console.log('child removed');
        }
    },[name])
    return <h3>{name}</h3>
}

function NoState() {
  useEffect(()=>{
    // Store.getList();
  },[]);

  const click=()=>{
    getApi('/products/list').then(res=>{
      console.log('res',res);
    });
  }
  return (
    <div>
      <Observer>
        {() => {
          return (
            <div>
              <button
                onClick={() => {
                  Store.setIsShowName();
                }}
              >
                Click
              </button>
              {Store.isShowName && Store.name}

              <button onClick={click}>
                get APi
              </button>
            </div>
          );
        }}
      </Observer>
    </div>
  );
}

export default NoState;
