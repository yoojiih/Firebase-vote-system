// < 인증된 이후의 페이지 이동 & useHistory 2 - import use Effect >
import React, { useEffect } from "react";

//< 인증된 이후의 페이지 이동 & useHistory 4 - useHistory> 
import { Switch, Route, useHistory } from "react-router-dom";

// <switch><Route> - React Router Dom
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UploadPage from "./components/UploadPage/UploadPage";

// < 인증된 이후의 페이지 이동 & useHistory 3 - firebase 불러옴 >
import { getAuth, onAuthStateChanged } from "firebase/auth";

// < Redux store에 로그인 유저정보 저장 2 - Dispatch를 funtional component에서 사용하려면 react-redux에서 가져옴 >
// dispatch로 action을 발생시키기 위함
import { useDispatch, useSelector } from "react-redux";

// < Redux store에 로그인 유저정보 저장 5 - setUser 정의한 거 불러옴 >
import { setUser } from "./redux/actions/user_action";


function App(props) {

  // < 인증된 이후의 페이지 이동 & useHistory - 5. history 객체 생성 >
  // 개발환경의 미리보기에서만 state이 리셋되는 현상 일시적으로 막기 위해 history.push 등의 라우터 함수를 이용해 강제로 페이지 이동시킴
  let history = useHistory();
  
  // <Redux store에 로그인 유저정보 저장 3 - useDispatch를 이용해 변수로 저장>
  // Reducer 함수에게 Action을 송신하는 역할
  // useDispatch : 생성한 action을 useDispatch를 통해 발생시킬 수 있음, 만들어둔 액션생성 함수를 import { setUser } from "./redux/actions/user_action"
  let dispatch = useDispatch();

  // < Redux store에 로그인 유저정보 저장 6 - user_reducer.js의 isLoading을 useSelector로 가져옴 >
  //  useSelector: state를 조회하기 위해 사용 - connect함수를 이용하지 않고 리덕스의 state를 조회할 수 있음
  const isLoading = useSelector((state) => state.user.isLoading);
  console.log(isLoading)

  // < 인증된 이후의 페이지 이동 & useHistory 1 - useEffect 이용 >
  useEffect(() => {

    // < 인증된 이후의 페이지 이동 & useHistory 3 - auth서비스에 접근 후 onAuthStateChanged의 콜백함수로 user를 넣어주어 observe 계속 지켜봄  >
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
     // onAuthStateChanged test : console.log('user',user)
    
     // < 인증된 이후의 페이지 이동 & useHistory 6 - 유저에 대한 정보를 가져와서 user가 있으면 로그인이 된 상태 > 
      // 로그인 된 상태
      if (user) {
        
        //로그인된 유저는 redirect 시켜 강제로 페이지 이동 (react-router-dom에서 제공하는 기능 history.push("경로"))
        // history 쓰려면 useHistory 객체생성 & import 해야됨
        history.push("/");
        
        // <Redux store에 로그인 유저정보 저장 1 - 유저정보 받은 걸 redux store에 넣어줘야함 
        //리덕스를 funtional componont에서 사용하려면 리덕스도 Hook이 있기 때문에 import

        // < Redux store에 로그인 유저정보 저장 4 - Dispatch를 이용해 유저정보 받은 걸 redux store에 넣어주면 됨  >
        // 1. dispatch()날려주고
        // 2. 이름이 setUser라는 함수를 받음
        // 3. store에 유저정보를 담을 거기 때문에 firebase에서 전달해준 유저정보(user)를 setUser안에 넣어주고 
        // src> redux > action > user_action.js 에다가 funtion 만들어주고 이걸 사용하기 위해선 여기서 import 해줌
        // -> 로그인이 된 상태일 때 로그인된 user의 정보를 setUser redux store에 잘 넣어주게 된 것
        dispatch(setUser(user));
      
      //로그인 되지 않은 상태
      } else {
        // < 인증된 이후의 페이지 이동 & useHistory - 7. 유저가 없을 때 로그인 페이지로 이동>
        history.push("/login");
      }
    });
  }, []);
// < Redux store에 로그인 유저정보 저장 7 - user_reducer.js의 isLoading을 활용해 
// isLoading은 redux store에 있기 때문에 redux store에서 useSelector로 가져와서 사용
// isLoading이 ture면 로딩 중임을 화면에 나타내고
  if (isLoading) {
    return <div>...loading</div>;
  } else {
    // isLoading이 false면 원래 화면들을 랜더링해줌
    return (
    <div>
      <NavBar />
        {/* useHistory 쓰기 위해선 main component 에 Reat Router Context 가 있어야지 Sub component 에서 useHistory 사용 가능
         index.js 에서 App.js를 BrowserRouter로 감싸줘야함 (더 위로 가있어야 App.js안에서 history 사용가능) */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/upload" component={UploadPage} />
        </Switch>
    </div>
    );
  }
}

export default App;
