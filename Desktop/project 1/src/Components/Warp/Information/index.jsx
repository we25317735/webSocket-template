import React, { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';
import PubSub from 'pubsub-js';

import DataCard from './DataCard';
import EditContentCard from './EditContentCard';
import AddDataCard from "./AddDataCard"


/*
  總開關為true時,會有<一般>跟<編輯>項目,
  總開關為false時,可進入<新增>還有<更改>項目

  白話文:
  true = 1 ; fales = 0
  1 : 1 = 主畫面
  1 : 0 = 編輯畫面

  0 : 1 = 新增畫面
  0 : 0 = 更改畫面
*/

const Information = () => {

   
    const [AllSwitch, setAllSwitch] = useState(false); //總開關,關閉時為編輯或新增
    const [EditContent, setEditContent] = useState(false); //編輯按鈕

    const [EditBtn, setEditBtn] = useState(true); //編輯按鈕開關(一開始打開)


    //新增按鈕
    const AddData = () => {
      setAllSwitch(!AllSwitch); //總開關關閉
      setEditBtn(!EditBtn); //關閉最右方按鈕

      
    }

    //編輯內容
    const EditData = () => {
      setEditContent(!EditContent);
    }




    return (
      <div id='Information'>
        <header>
          
            {
              EditContent ? (
                <button type="button" className="btn btn-primary me-3" onClick={() => AddData()}>{AllSwitch ? "儲存" : "新增"}</button> ) : null
            }
            {
              EditBtn ? (<button type="button" className="btn btn-primary" onClick={() => EditData()}>
              {EditContent ?  "完成" : "編輯"}
            </button>) : null
            }
            
          
        </header>
        <section style={{ marginTop: '90px'}}>
          <div className='container'>
            <div className="row">
              {AllSwitch ? ( 
                <AddDataCard/> //新增
              ) : (
                EditContent ? (
                   // 新增更改刪除項目
                   <EditContentCard/>
                ) : (
                  <DataCard/> //資料炫覽
                )
              )}
            </div>
          </div>
        </section>
      </div>
    );
    
}

export default Information;
