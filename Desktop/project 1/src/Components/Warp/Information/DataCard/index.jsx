import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 导入 axios 模块
import "./style.css";
import PubSub from 'pubsub-js';


/* 這個負責普通的渲染 */
const DataCard = () => {

  const [Arry, setArry] = useState([]); // 收到 axios 的数据

  useEffect(() => {
    // 发送 Axios 请求
    axios.get('http://localhost:3004/posts')
      .then(function (response) {
        const reversedData = response.data.reverse();
        setArry(reversedData);

        // 发布数据到 PubSub
        PubSub.publish("axios", response.data);
      })
      .catch(function (error) {
        console.error('请求出错：', error);
      });

  }, []);


  return (
    <>
      {Arry.map((e) => (
        <div className='DataCard col-12' key={e.id}>
          <div className='card-box mx-3 my-3 px-5 py-3'>
            <div className='d-flex justify-content-between'>
              <h2>{e.message}</h2>
              <a href='#'>
                <i className="fa-solid fa-bars text-secondary"></i>
              </a>
            </div>
            <h6 className='fw-light'>2020 12/04</h6>
            <p>
              {e.content}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default DataCard;
