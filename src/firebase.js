import { initializeApp } from 'firebase/app'
//원래 firebase의 auth를 사용하기 위해선 'firebase/auth'를 따로 improt 해야 하지만,
//initializeApp에도 auth 메서드가 있기 때문에 이를 통해 로그인을 구현
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZFS41rbt9xkskgvYXqPpBne82OQCPWL8",
    authDomain: "react-shop-7c4f0.firebaseapp.com",
    databaseURL: "https://react-shop-7c4f0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-shop-7c4f0",
    storageBucket: "react-shop-7c4f0.appspot.com",
    messagingSenderId: "465264828094",
    appId: "1:465264828094:web:82cda330795683103bc8ef",
    measurementId: "G-VDS6R4BJYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
export default app;
