import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';  //+
import mime from 'mime-types';
import { useForm } from 'react-hook-form';
import '../../index.css';
import { useHistory } from "react-router-dom";

// 인증 -> 사용자 관리 -> 사용자 프로필 업데이트
import { getAuth, updateProfile } from "firebase/auth";

import firebase from '../../firebase';

//_firebase__WEBPACK_IMPORTED_MODULE_3__.default.storage is not a function
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import { getStorage, ref as strRef, uploadBytesResumable, getDownloadURL, storage } from "firebase/storage";

function UploadPage() {
    const [상점명, 상점명변경] = useState('');
    const 업종list = [ "카페 / 디저트", "음식점 / 주점", "편의점 / 마트", "생활 / 교육", "보건 / 복지", "의류 / 잡화", "문화 / 체육", "자동차 / 주유", "가전 / 통신", "가구 / 인테리어", "부동산 / 임대", "건축 / 철물", "디자인 / 인쇄", "여행 / 숙박", "기업 / 기관", "기타" ];
    const [업종, 업종변경] = useState('기타');
    const [응답자수, 응답자수변경] = useState('');
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch(); //+
    const inputOpenImageRef = useRef();
    let history = useHistory();
    const { handleSubmit } = useForm();
    const [errorFromSubmit, setErrorFromSubmit] = useState("")
    const [progress, setprogress] = useState("")

    const handleUploadImage = async () => {

        try {
            setLoading(true)
            const auth = getAuth();
            const db = getDatabase();
            const file = document.querySelector('#image').files[0];

            const storage = getStorage();
            //+
            const filePath = `users/${file.name}`;
            console.log('filepath: ',filePath)
            //+

            // const metadata = {
            //     contentType: 'image/jpeg'
            // };
            
            //+
            const metadata = { contentType: mime.lookup(file.name) }
            //+


            const storageRef = strRef(storage, filePath);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            // https://firebase.google.com/docs/storage/web/upload-files#full_example
            // console.log('storage', storage)

            // const storageRef = storage().ref();
            // console.log('파일이름 : ',storageRef)
            // ` 와 ' 는 다름 !
            //const storage_upload = storageRef.child('image/' + file.name).put(file, metadata);
            // console.log('storage_upload: ', storage_upload);

            //+
            //const uploadTask = uploadBytesResumable(strRef(storage, 'image/' + file.name), file, metadata)     
            
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setprogress('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            setprogress('Upload is paused');
                            break;
                        case 'running':
                            setprogress('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    console.log(업종);
                    //같은 상품이 이미 state에 존재하면 수량만 증가시켜주게 구현
                        // ture저장 = 상점명 같은지 비교 연산
                        // if(ture저장) -> 응답자수 변경(응답자수 + 1)
                        // else -> 그대로 update 진행
                    응답자수변경(응답자수 + 1)
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const postData = {
                            상점명 : 상점명,
                            업종 : 업종,
                            응답자수 : 응답자수,
                            photoURL : downloadURL
                        };
                        console.log('postData: ',postData);
                        const newPostKey = push(child(ref(db), 'users')).key;
        
                        // Write the new post's data simultaneously in the posts list and the user's post list.
                        const updates = {};
                        updates['/users/' + newPostKey] = postData;
        
                        update(ref(db), updates);
        
                        const metadata = { contentType: mime.lookup(file.name) }
        
                        setLoading(false)

                    });
                }
            );
            // console.log('uploadTaskSnapshot', uploadTaskSnapshot)

            } catch (error) {
                setErrorFromSubmit(error.message)
                setLoading(false)
                setTimeout(() => {
                setErrorFromSubmit("")
            }, 5000);
        }
}
    

    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h3> Upload </h3>
            </div> 
            <form handleUploadImage={handleSubmit(handleUploadImage)}>
                <div class="container mt-3">
                    <input name="storename" type="text" class="form-control mt-2" placeholder="상점명" onChange={ (e)=>{ 상점명변경(e.target.value)}} />
                    {/* <textarea class="form-control mt-2" id="content"></textarea> */}
                    <select class="form-select form-select-sm"  aria-label=".form-select-sm example" onChange={ (e)=>{ 업종변경(e.target.value)}}>
                        <option selected>업종 선택</option>
                        {업종list.map((item) => (
                            <option value={item} key={item}>
                            {item}
                            </option>
                        ))}
                    </select>
                    {/* <input name="date" type="date" class="form-control" placeholder="date" id="date-update" onChange={ (e)=>{ 등록일변경(e.target.value)}}/> */}
                    <div>
                        <input
                            class="form-control mt-2"
                            accept="image/jpeg, image/png"
                            // style={{ display: 'none' }}
                            type="file"
                            ref={inputOpenImageRef}
                            id= "image"
                            onChange={handleUploadImage}
                        />
                    </div>
                    {progress &&
                        <p>{progress}</p>
                    }
                </div>
                {/* < 에러메시지 출력 4 - try & catch문에서 오류떠 catch문에 걸리면
                (state) errorFromSubmit이 있다면 콘솔창의 오류문구중 "message"부분만 <p>태그에 랜더링해줌  */}
                {errorFromSubmit &&
                    <p>{errorFromSubmit}</p>
                }
                {/* < Button 누르지 못하게 막기 5 - 로딩이 true일 때(프로세스가 진행중) 못누르게 해줘야함 disabled={loading} > */}
                <input type="submit" disabled={loading} placeholder="upload"/>
            </form>
        </div>
    
    )
}

export default UploadPage