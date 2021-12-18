// store : index.js | dispatch : app.js | reducer : user_reducer.js | action : user_action.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// create-react-app 버전이 올라가서 import * as serviceWorker from './serviceWorker'; 사용 안하고 대신 reportWebVitals 씀
import reportWebVitals from './reportWebVitals';

// < redux 1 - 초기 설정 >
//Redux-React는 상태관리를 하기위해 React에 Redux를 연결해주는 역할을 해준다.
//Provider는 하나의 컴포넌트. react로 작성된 컴포넌트들을 Provider안에 넣으면 하위 컴포넌트들이 Provider를 통해 redux store에 접근이 가능해진다
import { Provider } from 'react-redux';

// <redux 3 - mideelware (redux-promise-middleware사용) >
// store는 데이터가 저장되는 가상 공간이다.
// combineReducers()를 통해 통합된 reducer와 initState(state 초기값)를 준비한다.
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

// <reducer 2 -redux->reducer >
import Reducer from './redux/reducers';

// <router 페이지 이동 >
import {
  BrowserRouter as Router,
} from "react-router-dom";

// <bootstrap />
import 'bootstrap/dist/css/bootstrap.min.css';
// <redux 4 -promiseMiddleware 사용/>
// createStore를 redux에서 가져온걸로 생성해준후 생성된걸 store에 넣어줌
//이 미들웨어는, 프로미스가 payload로 전달되면, 요청이 시작, 성공, 실패 할 때 액션의 뒷부분에 _PENDING, _FULFILLED, _REJECTED를 반환함 (커스터마이징 가능)
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <React.StrictMode> 
    {/* Redux의 구성 요소
        Store: 애플리케이션의 state를 저장하는 곳. Store 내에 Reducer 함수가 존재함.
        Dispatch: Reducer 함수에게 Action을 송신하는 역할을 하는 함수
        Action: 유저로부터 발생된 이벤트와 API로부터의 데이터 수신 등 state(상태)를 갱신하기 위한 정보를 담은 object(객체)
        Reducer: Dispatch통해 받은 Action을 토대로, state를 변경할 수 있는 유일한 함수
        View: 애플리케이션의 유저 인터페이스(UI)

      ⭐️Redux의 3원칙 (Three Principles)⭐️
        1. Single source of truth  
          애플리케이션 내에 Store는 반드시 1개만 존재
        2. State is read-only
          state의 변경은 Reducer만 할 수 있다. Reducer 이외의 공간에서는 state는 읽기 전용이기에 state를 직접 변경해서는 안됨
          state를 변화시키는 유일한 방법은 Action을 Reducer에 dispatch(송신, 전달)하는 것
        3. Changes are made with pure functions
          Reducer는 순수 함수여야만 한다.
          parameter로 기존 state와 Action을 받는데 직접 변경하지 않고 새로운 state object를 작성해서 return해야한다.
    */}

    {/* React의 props처럼 redux로 만든 store를 Provider에 적용하고 App 컴포넌트, Router를 provider로 감싸주면 App 컴포넌트, Router는 Store에 접근이 가능하다 */}
    {/* store을 적용하기 위해서 'index.js'를 아래와 같이 수정해 주어야한다.
store 옵션을 설정한 <Provider> 태그로 App component를 감싸준다. */}
    {/* <redux 2 = {5} > 
        provider안에 store를 넣어줄 때 미들웨어를 같이 넣어주어 object 객체만 받을 수 있는 리덕스를 '함수, promise'도 받을 수 있게함
        미들웨어는 store를 생성 할 때 redux 모듈 안에 들어있는 createStoreWithMiddleware 를 사용하여 설정함 
        미들웨어가 여러개인경우에는 파라미터로 여러개를 전달해주면 되고 순서는 여기서 전달한 파라미터의 순서대로 지정됨
    */}
    <Provider store={createStoreWithMiddleware(
      // <reducer 1 - reducer 생성 -> redux>reducers>index.js 파일 생성 >
      Reducer,
      // <reducer 3 - redux extension 사용 위함 >
      //F12 -> 메뉴에서 Redux를 찾아 들어감 -> 왼쪽은 어떤 액션이 차례대로 사용되었는지 나오 오른쪽에서는 state와 Action이 불러지면서 어떤 값들이 들어왔는지 확인가능
      //중복 렌더링 방지 , 효율적으로 State값 관리, 좋은 Redux 코드 작성 가능
      // yarn add redux-devtools-extension
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <Router >
            <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
reportWebVitals();

