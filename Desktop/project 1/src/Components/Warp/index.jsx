import React, { useState, useEffect } from 'react';
import "./style.css";
import * as WarpComponents from './Import';

import PubSub from 'pubsub-js';

const Warp = () => {

  const [componentToRender, setComponentToRender] = useState(null); //儲存傳過來的模組

  useEffect(() => {

    const subscription = PubSub.subscribe("xxx", (msg, data) => {


      switch (data) { //參照List組件的ItemStr, 有什麼打甚麼case

        case "個人資料":
          setComponentToRender(<WarpComponents.About />);
          break;

        case "我的作品":
          setComponentToRender(<WarpComponents.Projects />);
          break;

        case "與我聯絡":
          setComponentToRender(<WarpComponents.Connection />);
          break;

        case "重要行事":
          setComponentToRender(<WarpComponents.Information />);
          break;

        default:
          break;
      }
    });

    return () => {
      PubSub.unsubscribe(subscription);
    };

  }, []);

  return (
    <div id='Wrap'>
      {/* {componentToRender} */}
      <WarpComponents.Projects />
    </div>
  );
}

export default Warp;
