// <reducer 1 - reducer 합쳐줌 src>index.js>
// < Redux store에 로그인 유저정보 저장 4-3 - 확장 -App.js >
import { combineReducers } from 'redux';
import user from './user_reducer';
// import chatRoom from './chatRoom_reducer';

//각 컴포넌트 별로 리듀서를 작성했다면 이를 통합해야 한다. 이때 combineReducers()를 사용한다.
// 앞으로 만들 reducer 2개 합쳐주는 역할 (상태를 저장할 state 추가시)
// reducer를 여러개 사용하기위해 combineReducers 함수 사용하고
// combineReducers 안에 모든 리듀서를 object형식으로 담음

const rootReducer = combineReducers({

    user
    // , chatRoom
})

export default rootReducer;