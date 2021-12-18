// < Redux store에 로그인 유저정보 저장 4-4 - 타입 가져옴 >
import {
    SET_USER
    //, CLEAR_USER,
    // SET_PHOTO_URL,

} from '../actions/types';

const initialUserState = {
    // < Redux store에 로그인 유저정보 저장 4-6 - initial state정의 >
    // Reducer 함수에서 state를 처음으로 불러오면 state는 정의되어 있지 않기 때문에, 
    // undefined이 되지 않도록 Initial 초기값을 설정해주는데
    // 유저정보를 currentUser라는 property에다가 넣어줌 (아무것도 없으니 null)
    // isLoading: true 해줘서 login이 시작되면 isLoading true 라고 해주고 이 로그인이 다 끝나면 isLoading false로 바꿔질것
    currentUser: null,
    isLoading: false
}
// reducer는 state와 action을 파라미터로 받아와서 state를 변경하는 함수이다.
// action에는 액션 생성 함수에서 반환하는 객체가 들어간다.  return { type: SET_USER, payload: user }
// return 에서 다른 state값은 변경되지 않게 하기 위해 전개연산자를 사용한다.
// reducer를 작성할 때 switch 문을 자주 사용한다.

// < Redux store에 로그인 유저정보 저장 4-5 - initial state생성 reducer >
// Reducer 함수는 state를 변경할 수 있는 유일한 함수이며 
// Reducer 함수에서 return되는 값은 새로운 state 됨
// Reducer 함수는 기본적으로 2개의 인자(state,action)를 받는데 
// state는 current state를 뜻하며
// action은 state를 갱신하기 위한 정보를 담은 object
export default function (state = initialUserState, action) {
    // Action 생성하고, Dispatch를 이용하여 Reducer함수에게 View에서 발생한 Action을 송신하기의 과정 이후 
    // 현재 Reducer 함수는 수령한 Action의 정보 app.js의 dispatch(setUser(user))에 따라 state를 갱신해야 할 단계
    // Reducer함수에서 action type에 따라서 다르게 처리(state를 갱신)하기 위해 switch문 사용
    switch (action.type) {
        // SET_USER 요청이 들어올 경우
        // 수정방법 정의 : 액션.type === 수정방법이름(SET_USER)
        case SET_USER:
            return {
                // initialUserState를 넣어줌
                ...state,
                // < Redux store에 로그인 유저정보 저장 4-6 - user_action에서 보낸 user정보를 currentUser로 받음 
                // action.payload 해주면 user_action.js의 payload 정보를 여기다가 넣어주는 것
                currentUser: action.payload,
                // < Redux store에 로그인 유저정보 저장 4-7 - 이제 완료됐으니 false로 변환 (App.js로 이동)
                isLoading: false
            }
        // case CLEAR_USER:
        //     return {
        //         ...state,
        //         currentUser: null,
        //         isLoading: false
        //    }

        // case SET_PHOTO_URL:

        // return {
        //     ...state,
        //     currentUser: { ...state.currentUser, photoURL: action.payload },
        //     isLoading: false
        // }
        // reducer내 조건문 작성시 보통 마지막 else문에는 state를 그대로 return 해줌. 아무 수정요청이 없다는 거니깐
        default:
            return state;
    }
}
//이 리듀서를 createStore()안에 넣어주면 reducer 완성!