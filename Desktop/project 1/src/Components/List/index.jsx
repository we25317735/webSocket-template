import React, { useState } from 'react';
import "./style.css";
import PubSub from 'pubsub-js';

const List = () => {

  let [ItemStr, setItemStr] = useState([
    "個人資料",
    "我的作品",
    "場內人員",
    "重要行事",
    "與我聯絡"
  ])

  //把訊息傳給主畫面
  const ItemClick = (event) => {

    PubSub.publish("xxx", event.target.innerText); //抓取ItemStr的文字
  }

  return (
    <div id="List">
      <div className="list-wrap">
        
        <header>
            <a className='mt-3' href='#'>
              <i className="fa-solid fa-bars text-secondary"></i>
            </a>
        </header>

        <section>
          <ul className="list-group">
            {
              ItemStr.map((e, index) => (
                <li key={index} className="list-group-item" onClick={ItemClick}>
                  <div className='my-1 ms-2 fs-4'>
                    <i className="fa-solid fa-user"></i>
                    <span className='ms-3'>{e}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        </section>

      </div>
    </div>
  );
}

export default List;
