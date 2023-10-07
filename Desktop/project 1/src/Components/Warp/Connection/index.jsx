import React, { useState } from 'react';
import './style.css';

const Connection = () => {

    const [EmailInput, setEmailInput] = useState(true);

    //嘗試登入
    const AccountLogin = () => {
        setEmailInput(!EmailInput);
    }

    const Login = () => {
        console.log("你好")
    }

    return (
        <div id='connection'>

            <form>
                {
                    EmailInput ? (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" class="form-text">請輸入電子郵件</div>
                        </div>
                    ) : (
                        <div class="mb-5 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
                            </div>
                        </div> 
                    )
                }

                <label for="inputPassword5" class="form-label">Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />

                <div id="passwordHelpBlock" class="form-text">
                    您的密碼長度必須為 8-20 個字符，包含字母和數字，並且不得包含空格、特殊字符或表情符號。
                </div>

                <div class="mb-3 mt-4 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>

                {
                    EmailInput ? (
                        <button type="submit" class="btn btn-primary" onClick={AccountLogin}>送出</button>
                    ) : (
                        <button type="submit" class="btn btn-primary" onClick={Login}>登入</button>
                    )
                }
                
                

            </form>
        </div>
    );
}

export default Connection;
