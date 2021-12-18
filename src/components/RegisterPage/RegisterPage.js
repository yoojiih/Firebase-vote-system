// < 유효성 체크 UI 1 - 기본 셋팅> , < UseRef - 3 > import useRef 라이브러리에서 가져옴
import React, { useRef, useState } from 'react'
// < 이미 아이디가 있다면 부분 1 > 
import { Link } from 'react-router-dom';
// < 유효성 체크 1 - react-hook-form 사용 이유 : 간단하게 폼의 유효성을 검사가능 (state 대체) > < auth >
import { useForm } from 'react-hook-form';
// < 유저 추가 상세 정보 입력 3 - 유니크한 값 가지기 위해 md5 모듈 이용 random 함수랑 비슷 var md5 = require('md5'); console.log(md5('message')); > 
import md5 from 'md5';

// < auth 5 - firebase에서 이메일과 비밀번호로 유저 생성 - src > firebase.js를 불러옴 >
// 이부분 삭제시 에러 Firebase: No Firebase App '[DEFAULT]' has been created - call Firebase App.initializeApp() (app/no-app).
import firebase from '../../firebase';

import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function RegisterPage() {
    // <유효성 체크 2 - 사용자가 입력할때마다 추척함 (register, watch, formState)>
    // watch. register를 가지고 있어야 추적 가능 하기 때문에 import useForm을 통해 가져옴
    // 입력시 즉각적으로 유효성 체크 에러표시 해줌
    // const { register, watch, formState: { errors }} = useForm({mode: "onChange"});
    // submit button누르기 전까진 유효성 체크 안하는 version
    // < auth 2 - handleSubmit - firebase에서 이메일로 유저 생성 >
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    // < 에러메시지 출력 1 - 에러시 에러메시지 담아줄 state생성 > 오류시 catch문 state로 저장해서 UI에 출력하기 위함
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    // < Button 누르지 못하게 막기 1  - 눌렀을 때 firebase에서 유저생성 처리중이기 때문 >
    const [loading, setLoading] = useState(false);
       //< UseRef 2 > import React, { useRef } from 'react'
        const password = useRef();
        //< UseRef 3 > < password라는 이름의 element를 관찰 -> input의 이름을 이용해 watch라는 메소드로 리액트 폼에서 계속 지켜볼 수 있음 />
        password.current = watch("password");
        //실시간 입력되는지 테스트 : console.log('password.current', password.current)

        {/* < auth 3 - firebase에서 이메일로 유저 생성 - onSubmit> 
            (Form태그 안에서 파라미터 형식으로 handleSubmit(onSubmit) 불러옴)
            여기다가 함수 정의 후 firebase의 이메일과 비번을 이용해서 유저 생성
            + 비동기 처리를 위해 async 해줌*/}

        // < auth 6 - firebase에서 이메일과 비밀번호로 유저 생성 - (data)>
        // 'react-hook-form'이용시 state가 없기 때문에 react-hook-form 쓸 땐 
        // 모든 유저정보가 담긴 data라는 파라미터를 이용해 특정 요소만 뽑기 가능 ex) data.email
        // 테스트 : console.log('data', data) 모든 유저 데이터 다 불러옴
       
        // 비동기 redux -> async await 이 작동하는 이유는 create-react-app 으로 만든 프로젝트에는 bable의 
        // async to generator transform 플러그인이 적용 되어있기 때문
        // 요청 완료후 or 에러 발생 시 추가작업을 위해 async 와 await를 사용
        // 이 키워드들은 우리가 액션생성자 함수에서 반환한 Promise 를 기다려줌    
        const onSubmit = async (data) => {

            // < 에러메시지 출력 2 - 오류 message UI상에 띄우기 >
            // 비동기 요청시 try & catch문 안에서 해서 오류를 콘솔창이 아닌 브라우저 화면상에 출력하게 구현  
            try {

                // < Button 누르지 못하게 막기 2 - 처음 submit 버튼 눌렀을 땐 현재 프로세스가 진행중인 거니까 버튼 못누르게 = ture가 되게>
                setLoading(true)

                const auth = getAuth();

            // < auth 4 - firebase에서 이메일과 비밀번호로 유저 생성 - createUserWithEmailAndPassword > 
            // .auth() : firebase auth 서비스에 접근하기 위해 import firebase로 불러옴
            // createUserWithEmailAndPassword()에 이메일과 패스워드를 인자로 넣어줘야함 
            // input에 Email을 넣었을 때 value 가져와야하는데 

            // < auth 7 - 유저를 이메일과 패스워드로 생성 한 상태  - data.email, data.password > 
            // 위에서 받아온 data 라는 파라미터를 이용해서 이메일과 패스워드를 넣어주면 
            // 이렇게 비동기로 요청을 줬을때(await) firebase에서 id생성한 다음에 결과값을 createdUser에 주게됨
            // 테스트 : console.log('createdUser', createdUser) 
            // createdUser를 firebase에서 전달을 해준 상태!
            let createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password)

            // < 유저 추가 상세 정보 입력 1 >
            // realtime DB - react-shop > users(테이블 이름) > row > displayName, email
            // firebase에서 전달해 준 update 하는 메소드: .updateProfile 을 이용해 authentication 서비스에 유저를 만들어준거에 
            // displayName과 photoURL을 넣어주기
            // await updateProfile(auth.currentUser, {
            //     displayName: data.name,
            //     // < 유저 추가 상세 정보 입력 2 > photoURL은 유니크한 값인 user.email을 이용함으로써 각 유저의 유니크한 이미지를 넣어줌 
            //     photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            // })
            // < 유저 추가 상세 정보 입력 2  - 생성된 유저 Firebase 데이터베이스에 저장하는 방법 displayName, photoURL)>
            // firebase Database 서비스에 접근해 접근하고자하는 DB위치(users/)와 유저(row)의 아이디인 uid(유저의 유니크한 아이디) 넣어줌 
            // uid 아래에 name, image 정보를 넣어주는데 createUser -> user에 가서 update해주고 싶은 property를 넣어줌 
            // users 테이블 없으면 생성해줌
            // set(ref(getDatabase(), `users/${createdUser.user.uid}`), {
            //     name: createdUser.user.displayName,
            //     image: createdUser.user.photoURL
            // })
            // </추가 생성한 유저에 추가 상세 정보 입력>
            // <  Button 누르지 못하게 막기 3 - 마지막엔 false로 state변환 >
            setLoading(false)
        
        } catch (error) {
            // < 에러메시지 출력 3 - 에러시 에러메시지 담아줄 state인 setErrorFromSubmit에다가 "message"부분만 에러메시지 저장
            setErrorFromSubmit(error.message)

            // < Button 누르지 못하게 막기 4 -firebase에서 에러를 전달해 주더라도 false로 state변환 >
            setLoading(false)

            //  < 에러메시지 출력 5 - 오류메시지 5초후에 사라지게 >
            setTimeout(() => {
                setErrorFromSubmit("")
            }, 5000);
        }
    }

    
    return (
        //https://react-hook-form.com/kr/get-started/ 에서 유효성 체크를 쉽게 도와주는 모듈 UI 가져다가 씀 (code sandbox)
        // login, register페이지만 따로 독립적으로 스타일 지정해주기 위해 classname 지정 (index.css)
        // scss 쓰면 하나하나 다 안바꿔주고 auth-wrapper로 하나로 묶어버릴 수 있음
        <div className="auth-wrapper">
            
            {/* 제목 부분 */}
            <div style={{ textAlign: 'center' }}>
                <h3>Register</h3>
            </div>
            
            {/* < auth 1 - firebase에서 이메일로 유저 생성 >
                firebase console에서 authentication → sign-in method → Email/Password를 사용할 수 있게 Enabled로 설정
                Submit버튼 눌렀을 때 onSubmit 이벤트에 따른 함수처리
                이메일과 비밀번호를 firebase에 넘겨서 유저 만들기 
                react-hook-form' 이용하니까 useForm에서 handleSubmit이라는 코드를 가져와서 form에 넣은 다음 여기다가 함수를 넣어줘야함
            */}
            <form onSubmit={handleSubmit(onSubmit)}>

                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    // <유효성 체크 required: true로 이메일은 not null값이라는 뜻 필수입력 + pattern은 이메일에 맞는 정규식 > 
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {/* 위 required 위반시 에러문구 */}
                {errors.email && <p>This email field is required</p>}
                
                <label>Name</label>
                <input
                    name="name"
                    // 유효성 체크 종류 2가지 required,maxLength 니까 각각에 맞게 에러문구도 작성해줘야함
                    {...register("name", { required: true, maxLength: 10 })}
                />
                {/* 조건 2개중 required 에 관한게 위반 시 */}
                {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
                {/* 조건 2개중 maxLength 에 관한게 위반 시 */}
                {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>}

                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    // 관찰할 때 register로 등록해줘야함 & 걸어줌 유효성 체크 방식 조건 걸어줌
                    {...register("password", { required: true, minLength: 6 })}
                />
                {/* 유효성 체크 걸렸을 때 에러문구 설정 */}
                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}
                
                {/* UseRef를 이용해 Password와 Password Confirm 일치 여부 구현 */}
                <label>Password Confirm</label>
                <input
                    name="password_confirm"
                    type="password"
                    {...register("password_confirm", {
                        required: true,
                        // < useRef 1 - Useref를 이용해서 어떻게 password와 password_confirm이 같은지 알 수 있는지? >
                        // 여긴 password랑 password_confirm이 같아야 하니까 조건문 vaildate 작성 
                        // (현재 react-hook-form 모듈을 사용하고 있기때문에 state이용해서 비교하는 이벤트로 구현방식을 사용하지 않고 useRef로 비교해줌)
                        // 1. useRef를 이용해서 ref 생성 -> const password = useRef();
                        // 2. useRef를 이용해서 password를 정의
                        // 3. password.current라는 property안에다가password라는 이름을 가진 input에 value를 입력할때마다 password.current로 들어감
                        //    -> password.current = watch("password");
                        // 4. password.current를 넣어주면 password라는 이름을 가진 input에 value를 넣은것과 password_confirm에 value를 입력한 것이 같은지 안같은지를 체크해줄 수 있음 
                        // 5. 서로의 vaule가 같으면 validate 됐다고 함
                        validate: (value) =>
                            value === password.current
                    })}
                />
                {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
                {/* < useRef 5 >*/}
                {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}
    
                {/* < 에러메시지 출력 4 - try & catch문에서 오류떠 catch문에 걸리면
                (state) errorFromSubmit이 있다면 콘솔창의 오류문구중 "message"부분만 <p>태그에 랜더링해줌  */}
                {errorFromSubmit &&
                    <p>{errorFromSubmit}</p>
                }
                {/* < Button 누르지 못하게 막기 5 - 로딩이 true일 때(프로세스가 진행중) 못누르게 해줘야함 disabled={loading} > */}
                <input type="submit" disabled={loading} />

                {/* < 이미 아이디가 있다면 부분 2 - 링크 걸어줌 
                    color-> 글자색 | textDecoration -> 밑줄 삭제 | to= -> 경로 설정 */}
                <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">이미 아이디가 있다면...  </Link>
            </form>
        </div>
    )
}

export default RegisterPage
