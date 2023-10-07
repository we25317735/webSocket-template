import React, { useState } from 'react';
import axios from 'axios';

const ChangeCard = (props) => {

    const ChangeContent = props.data;

    // 使用 useState 钩子来管理输入框的值
    const [InputValue, setInputValue] = useState(ChangeContent.message);
    const [TextareaValue, setTextareaValue] = useState(ChangeContent.content);

    // 更新输入框的值
    const inputValue = (e) => {
        setInputValue(e.target.value);
    }

    // 更新文本区域的值
    const textareaValue = (e) => {
        setTextareaValue(e.target.value);
    }

    // 按钮点击事件
    const handleSave = () => {
        
        const updatedData = {
          id: ChangeContent.id, // porps 传来的 id 不改
          message: InputValue,
          content: TextareaValue,
        };
      
        // 发送 PUT 请求
        axios.put(`http://localhost:3004/posts/${ChangeContent.id}`, updatedData)
        .then(function (response) {
            console.log("保存成功:", response);
            
            alert("更改成功");
        })
        .catch(function (error) {
            console.error('保存失败：', error);
            // 可以在这里执行一些失败后的操作，比如显示错误消息
        });
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
