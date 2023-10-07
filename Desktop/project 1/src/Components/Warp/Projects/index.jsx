import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import Loading from "../../../Components/Loading";

import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [keyword, setKeyword] = useState(''); // 關鍵字搜尋

  const [filteredData, setFilteredData] = useState([]); // 過濾後的資料
  const [DataValue, setDataValue] = useState([]); //response的東西塞進來
  const [currentPage, setCurrentPage] = useState(1); // 當前頁
  const itemsPerPage = 12; // 每頁顯示項目數量

  useEffect(() => {
    axios
      .get(`http://localhost:3004/Projects`)
      .then(function (response) {
        setDataValue(response.data); //把資料丟到DataValue供FilteredData過濾使用
        setFilteredData(response.data);//炫覽但空跑,因為沒輸入東西
      })
      .catch(function (error) {
        console.error("保存失败：", error);
      });
  }, []);





  //換頁功能,此處供 filteredData 使用
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  //換頁紐
  const handlePageChange = (selectedPage) => {

    setCurrentPage(selectedPage);

    /* 滾輪效果要在DOM渲染完畢後才能進行 */
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        //behavior: 'smooth',
      });
    }, 0); //延遲0秒後進行(0秒就夠了,渲染大概0.01就完成了)
  };

  //搜尋按鈕
  let SendOut = () => {
    console.log("DataValue",keyword);
    const filteredData = DataValue.filter((item) =>
      item.sign.includes(keyword) || item.title.includes(keyword)
    );

    setFilteredData(filteredData);
    setCurrentPage(1); //回到第一頁
  }

  return (
    <div id="Projects">
      <header className="d-flex justify-content-between px-3 py-2">
        <h1>你 好不好</h1>
        <form className="d-flex mt-3" style={{ height: "30px" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e)=>setKeyword(e.target.value)}
          />
          <button className="btn btn-outline-success lh-1" type="button" onClick={()=>SendOut()}>
            Search
          </button>
        </form>
      </header>

      <section style={{ marginTop: "110px" }}>
        <nav aria-label="breadcrumb" style={{ marginLeft: "80px" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">首頁</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              (搜詢內容)
            </li>
          </ol>
        </nav>

        <div className="container">
          <div className="row mx-auto" style={{ width: "90%" }}>
           {
           
              displayedData.map((e, index) => {
                return <ProjectCard data={e} key={index} />;
              })
           }
          </div>
        </div>

        {/* 分業按鈕 跟上方container的高度配合 */}
        <div id="Pagination">
          <ul className="pagination mt-5 justify-content-center">
            {
              Array.from({ length: pageCount }, (_, index) => (
                <li
                  className={`page-item ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                  key={index}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Projects;
