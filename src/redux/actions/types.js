//USER TYPES 정의 user_action으로 내보냄
// 액션 타입 만들어 줌 
//액션 선언  (대부분 대문자로 선언) 후에 액션을 반환하는 action creators(액션 생성 함수)
//액션은 무슨일이 일어났는지 설명해주는 객체이다. 예를 들어 user라는 state를 수정해 주는 역할을 하는 액션은 SET_USER와 같이 선언하고, setUser(user)라는 함수형태의 action creator을 만들어 주면 된다.
// < Redux store에 로그인 유저정보 저장 4-2 - 확장 - App.js >
export const SET_USER = "set_user";
export const CLEAR_USER = "clear_user";
export const SET_PHOTO_URL = "set_photo_url";

//CHAT ROOM TYPES
// export const SET_CURRENT_CHAT_ROOM = "set_current_chat_room";
// export const SET_PRIVATE_CHAT_ROOM = "set_priate_chat_room";
// export const SET_USER_POSTS = "set_user_posts";

