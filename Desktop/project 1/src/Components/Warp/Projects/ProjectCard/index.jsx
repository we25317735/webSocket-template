import React, { useState, useEffect} from 'react';
import "./style.css";
import "./Record.css";

import * as CardPicture from './CardPicture/Img'; // 導入图片

import { Swiper, SwiperSlide } from 'swiper/react'; //Swiper載入

// 以下3行為一組
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

// <Swiper/>標籤效果載入
import { Autoplay, Pagination, Navigation, EffectCreative, loop, Mousewheel} from 'swiper/modules';

/* 用import的方式把圖片載入 */
const ProjectCard = (props) => {

    const ID = props.data.id;
    const CoverPicture = props.data.TitlePicture; //封面圖片

    const PictureLength = props.data.PreviewPicture.length; //輪播圖片長度
    const [imageArray, setImageArray] = useState([]); //輪播圖片
    const [CardHover, setCardHover] = useState(false); //hover開關
    
    useEffect(() => { // 在組件渲染時，根據 "輪播圖片長度" 更新 imageArray
        const newImageArray = [];
        for (let i = 1; i <= PictureLength; i++) {
            newImageArray.push(CardPicture[`img00${ID}_${i}`]);
        }
        setImageArray(newImageArray);
    }, [ID, PictureLength]);

    
    //以下2個用 "!" 寫法會出問題
    const MouseEnter = () => { 
        setCardHover(true);
    };
    const MouseLeave = () => { 
        setCardHover(false);
    };

    // console.log(imageArray)

    return (
        <div id='ProjectCard' className='col-4'>
            <a href="#">
                <div id="card-component" className='mx-auto mt-3 mb-1' onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
                    <div className="card-module">
                        <div className="title">
                            <div className="cat">{props.data.title}</div>
                                {
                                    CardHover ? (
                                        <Swiper
                                            grabCursor={true}
                                            effect={'creative'}
                                            creativeEffect={{
                                            prev: {
                                                shadow: true,
                                                translate: [0, 0, -400],
                                            },
                                            next: {
                                                translate: ['100%', 0, 0],
                                            },
                                            }}
                                            loop={true}
                                            speed={1000}
                                            autoplay={{ 
                                                delay: 1000, // 延遲時間
                                                disableOnInteraction: false, // 使用者互動後不停止自動播放
                                                waitForTransition: true, // 等待過渡效果完成
                                                reverseDirection: true, // 反轉自動播放方向
                                            }}
                                            // mousewheel={{ //用滾輪也能翻頁
                                            //     invert: true, // 滾輪的方向
                                            // }}
                                    
                                            
                                            modules={[EffectCreative, Autoplay,Mousewheel]}
                                            className="mySwiper"
                                            >
                                            {
                                                imageArray.map((image, index) => (
                                                    <SwiperSlide className='w-100' key={index}>
                                                        <div className="cover" style={{ backgroundImage: `url(${image})` }}></div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    ) : (
                                        <div className="cover" style={{ backgroundImage: `url(${CardPicture[CoverPicture]})` }}>
                                        </div>
                                    )
                                }

                        </div>
                        <div className="body">
                            <h2 className="chapter">{props.data.title}</h2>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default ProjectCard;


