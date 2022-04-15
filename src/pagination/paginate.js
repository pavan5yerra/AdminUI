import React from "react";
import Pagination from "react-paginating";

const fruits = [
  ["apple", "orange"],
  ["banana", "avocado"],
  ["coconut", "blueberry"],
  ["payaya", "peach"],
  ["pear", "plum"]
];
const limit = 2;
const pageCount = 3;
const total = fruits.length * limit;

export const Pagi = () => {
  const handlePageChange = (page, e) => {
    this.setState({
      currentPage: page
    });
  };

  const { currentPage } = this.state;
  return (
    <div>
      <ul>
        {fruits[currentPage - 1].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* Here I will display my data api content */}
      {/* <ul>
          {this.state.movieData[currentPage - 1].map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul> */}

      {/* Inside my pagination buttons, I must call my api method to get more datas */}
      <Pagination
        total={total}
        limit={limit}
        pageCount={pageCount}
        currentPage={currentPage}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          totalPages,
          getPageItemProps
        }) => (
          <div>
            <button
              {...getPageItemProps({
                pageValue: 1,
                onPageChange: this.handlePageChange
              })}
            >
              first
            </button>

            {hasPreviousPage && (
              <button
                {...getPageItemProps({
                  pageValue: previousPage,
                  onPageChange: this.handlePageChange
                })}
              >
                {"<"}
              </button>
            )}

            {/* When i click in each pagination item I nedd to call my `searchData` passing the increment `page` to my api request like:
                this.searchData(numberPage) (1, 2, 3....)
                */}
            {pages.map((page) => {
              let activePage = null;
              if (currentPage === page) {
                activePage = { backgroundColor: "#fdce09" };
              }
              return (
                <button
                  {...getPageItemProps({
                    pageValue: page,
                    key: page,
                    style: activePage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {page}
                </button>
              );
            })}

            {hasNextPage && (
              <button
                {...getPageItemProps({
                  pageValue: nextPage,
                  onPageChange: this.handlePageChange
                })}
              >
                {">"}
              </button>
            )}

            <button
              {...getPageItemProps({
                pageValue: totalPages,
                onPageChange: this.handlePageChange
              })}
            >
              last
            </button>
          </div>
        )}
      </Pagination>
    </div>
  );
};
