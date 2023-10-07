import React, { useState, useEffect } from 'react';
// import "./style.css";
import axios from 'axios';

import ChangeCard from '../ChangeCard';



/* 進入編輯頁面 */
const EditContentCard = () => {


    const [Arry, setArry] = useState([]); // 收到 axios 的数据
    const [EditPage, setEditPage] = useState(false); // 設定頁面
    const [ChangeContent, setChangeContent] = useState(null); //需要更改的那筆數據

    useEffect(() => {
       
        axios.get('http://localhost:3004/posts')
          .then(function (response) {
            const reversedData = response.data.reverse();
            setArry(reversedData);
          })
          .catch(function (error) {
            console.error('请求出错：', error);
          });
  
    }, [Arry]);


    //更改內容
    const ChangeData = (id) => {
        let data = Arry.find(item => item.id === id);
        setEditPage(!EditPage)
        setChangeContent(data);
    }


    const DeleteData = (id) => {

        console.log("d", Arry.find(item => item.id === id));

        axios.delete(`http://localhost:3004/posts/${id}`)
        .then(function (response) {
            console.log("删除成功:", response);
        })
        .catch(function (error) {
            console.error('删除失败：', error);
        });
    }
        




    return (
        <>
            {EditPage ? (
                <ChangeCard data={ChangeContent}/>
            ) : (
                Arry.map((e) => (
                    <div className='DataCard col-12' key={e.id}>
                        <div className='card-box mx-3 my-3 px-5 py-3'>
                        <div className='d-flex justify-content-between'>
                            <h2>{e.message}</h2>
                            <div className="options-btn">
                            {/* 編輯選項 */}
                            <a href='#' onClick={() => ChangeData(e.id)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </a>
                            {/* 刪除選項 */}
                            <a href='#' className='ms-3' onClick={() => DeleteData(e.id)}>
                                <i className="fa-solid fa-xmark"></i>
                            </a>
                            </div>
                        </div>
                        <h6 className='fw-light'>2020 12/04</h6>
                        <p>
                            {e.content}
                        </p>
                        </div>
                    </div>
                )))
            }
        </>
    );
}

export default EditContentCard;
