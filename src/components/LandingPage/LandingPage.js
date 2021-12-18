import React, { useState, useEffect } from 'react'
import { Button, Card} from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../index.css';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { collection, getDocs } from "firebase/firestore";
import app from '../../firebase';
import jquery from 'jquery';
import $ from 'jquery';
import ModalPage from '../ModalPage/ModalPage';
//import Modal from '../ModalPage/ModalPage';
import MyModal from './MyModal';

//자주 변경되지 않는 실시간 db 읽기
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

function LandingPage() {
    //const [modal, modal변경] = useState(false);  //모달창 UI의 일종의 on/off 스위치 역할
    const [modalShow, setModalShow] = React.useState(false);
    // const handleClick = () => {
    //     modal변경(true);
    // };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    const [loading, setLoading] = useState(false);
    //실시간 db -> get()을 사용하여 데이터 한 번 읽기
    const dbRef = ref(getDatabase());
    useEffect(() =>{
        //setLoading은 useEffect밖에 있으면 안됨.
    setLoading(true)    
        //${userId}
        
    get(child(dbRef, `users/`)).then((snapshot) => {
        console.log('진입');
        if (snapshot.exists()) {
            
            snapshot.forEach((doc) => {
                //doc.data().상점명 (x) -> doc.val().상점명 (O)
                //실시간 데이터베이스 -> 데이터 목록다루기 -> 값 이벤트 수신 대기
                //console.log('doc: ',doc)
                console.log('snapshop: ',doc.val())
                //새로운 엘리먼트를 생성하고 이를 ReactDOM.render()로 전달하는 것입니다.
                //Babel은 JSX를 React.createElement() 호출로 컴파일해 React 엘리먼트라는 객체 생성
                    //const element = {
                    //     type: 'h1',
                    //     props: {
                    //       className: 'greeting',
                    //       children: 'Hello, world!'
                    //     }
                    //   };
                var list_group = `<div class="col">
                    <div class="card">
                        <div class="img-box">
                            <img src='${doc.val().photoURL}' class="card-img-top" accept="image/jpeg, image/png" alt="..." />
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${doc.val().상점명}</h3>
                            <p class="card-text">응답자수 : 🤍${doc.val().응답자수}</p>
                            <p class="card-text">업종: ${doc.val().업종}</p>
                        </div>
                    </div>
                </div>`;
                $('.row-cols-1').append(list_group)
                
                setLoading(false)
        });
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
        //function tick(){...}setInterval(tick, 1000); setInterval() 콜백을 이용해 초마다 ReactDOM.render()를 호출합니다.
        }).catch((error) => {
            setErrorFromSubmit(error.message)
            setLoading(false)
            setTimeout(() => {
                setErrorFromSubmit("")
            }, 5000);
        });

    },[]);

    return (
        <div className="landing-body">   
            
            {/* <button className="vote_Button" onClick={handleClick}> 투표하러 가기 </button>  */}
            {/* 기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프 하므로, 애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않습니다. 모든 항목은 렌더링 되기 전에 문자열로 변환됩니다. 이런 특성으로 인해 XSS (cross-site-scripting) 공격을 방지할 수 있습니다. */}
            {/* JSX에서 class는 className가 되고 tabindex는 tabIndex가 됨 -> const element = <div tabIndex="0"></div>; */}
            <Button className="vote_Button" variant="outline-dark" onClick={() => setModalShow(true)}>
                투표하러 가기 
            </Button>

                <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            {/* onClick={ ()=>{ modal변경(true) } }> 투표하러 가기 </button> */}

            {/* { 
                modal === true 
                ? <Modal />
                : null  
                // null 자료형: 리액트에서 텅빈 HTML을 의미
            } */}

            <div className="auth-wrapper">
                <div style={{ textAlign: 'center' }}>
                    <h3> 우리 동네 상권 현황</h3>
                </div>
                <div class="container mt-3">
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                    </div>
                </div>
                <Link style={{ color: 'gray', textDecoration: 'none', textAlign: 'center' }} to="register"> 우리동네 인기상권 더보기 </Link>
            </div>
        </div>   
    )
}
export default LandingPage

