import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // 导入 uuid

const ChangeCard = () => {
    const [InputValue, setInputValue] = useState(null);
    const [TextareaValue, setTextareaValue] = useState(null);

    const inputValue = (e) => {
        setInputValue(e.target.value);
    }

    const textareaValue = (e) => {
        setTextareaValue(e.target.value);
    }

    //新增內容
    const handleSave = () => { 

        if(InputValue == null || TextareaValue == null){

            if(InputValue == null){
                alert("請輸入標題");
                return;
            }else if(TextareaValue == null){
                alert("請輸入內容");
                return;
            }

            return;

        }else{

            const uniqueId = uuidv4();// 使用 uuidv4() 生成唯一的 UUID

            const updatedData = {
                id: uniqueId, // 將 UUID 賦值给 id 属性
                message: InputValue,
                content: TextareaValue,
            };

            axios.post(`http://localhost:3004/posts/`, updatedData)
            .then(function (response) {
                console.log("保存成功:", response);
                
                alert("保存成功");
            })
            .catch(function (error) {
                console.error('保存失败：', error);
                // 可以在这里执行一些失败后的操作，比如显示错误消息
            });

        }

        
    };

    return (
        <div className='col-10 col-md-7 mx-auto mt-md-5 bg-white'>
            <div className="mb-3 mt-2">
                <label htmlFor="exampleFormControlInput1" className="form-label fs-4">標題</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={inputValue} value={InputValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-5">內容</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" onChange={textareaValue} value={TextareaValue}></textarea>
            </div>
            <button className="btn btn-primary mb-2" onClick={handleSave}>保存</button>
        </div>
    );
}

export default ChangeCard;
