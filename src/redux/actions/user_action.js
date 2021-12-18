//(actions>user_action -> types.js -> user_reducer -> index.js)
import {
    SET_USER
    //, CLEAR_USER,
    //SET_PHOTO_URL
    
} from './types';

// < Redux store에 로그인 유저정보 저장 4-1 - 확장 -App.js >
// App.js에서 dispatch(setUser(user)); 이렇게 인자로 user 넣었기 때문에 파라미터로 user가져올 수 있고
// 1. type는 actions > types.js에 다 구현해뒀기 때문에 불러옴 import
//    type.js에 있는 SET_USER 라는 type 가져옴
// 2. setUser정의 해준 것을 App.js에서 가져와야함 
// 2. 타입이 현재는 하나뿐이지만 많아질 걸 대비해 타입에 따라서 다르게 처리하기 위해 case문 작성
// 3. initialUserState는 유저정보를 currentUser라는 property 에다가 넣어줌
//     - currentUser : 처음엔 값이 아무 것도 없을 테니 null 넣어줌
//     - isLoading : 로그인이 시작되면 로딩하고 있다는 걸 나타냄
// 4. user_action.js- firebase에서 가지고 온 유저정보를 reducer에서 받을 때 currentUser: action.payload 해주면 user_action.js의 payload정보를 넣어주는 것 
// 5. 로딩끝났으니 isLoading: false
// 액션을 반환하는 action creators(액션 생성 함수)
export function setUser(user) {
    // firebase에서 로그인된 유저정보가 들어온 상태 -> user_reducer로 가서 user정보를 currentUser로 받음
    // 액션 생성자 수정후 액션 생성자를 payload에서 user로
    return {
        type: SET_USER,
        payload: user
    }
}

// export function clearUser() {
//     return {
//         type: CLEAR_USER
//     }
// }

// export function setPhotoURL(photoURL) {
//     return {
//         type: SET_PHOTO_URL,
//         payload: photoURL
//     }
// }


