import { useState } from "react";
import { eventActions } from "../store/middleware/middleware";
import { useDispatch } from "react-redux";
export const Pagination = ({ data, RenderComponent, dataLimit }) => {
  const pages = Math.ceil(data.length / dataLimit);
  let [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    if (document.querySelector("#filter").value !== "") {
      if (pages < currentPage) {
        const startIndexa = pages * dataLimit - dataLimit;
        const endIndexa = startIndexa + dataLimit;
        return data.slice(startIndexa, endIndexa);
      }
    }
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    if (document.querySelector("#filter").value !== "") {
      let start = Math.floor((currentPage - 1) / pages) * pages;
      if (pages < currentPage) {
        start = Math.floor((pages - 1) / pages) * pages;
      }
      return new Array(pages).fill().map((_, idx) => start + idx + 1);
    }
    let start = Math.floor((currentPage - 1) / pages) * pages;
    return new Array(pages).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      {/* show the posts, 10 posts at a time */}
      <div
        onClick={(event) => dispatch(eventActions(event, data))}
        className="dataContainer"
      >
        <RenderComponent data={getPaginatedData()} />
      </div>

      {/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>
        {/* show page numbers */}

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
};
