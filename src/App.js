import "./styles.css";
import { SearchBar } from "./components/searchBar";
import { Button } from "./components/button";
import { Row } from "./components/row";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getApiData,
  getFilterData,
  deleteGroupData
} from "./store/middleware/middleware";
import { Pagination } from "./pagination/pagination";

export default function App() {
  //using Selector Hook for getting updated states from store
  let data = useSelector((state) => state.rd1.data);
  const temp = useSelector((state) => state.rd1.tempData);
  //dispatch hook is used to triggger action to reducer
  const dispatch = useDispatch();
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  let pagination = null;

  //using useEffect  for loading the data at the intial stage
  useEffect(() => {
    async function fetchData() {
      //triggering  API actions for intial laoding of data
      dispatch(await getApiData(url));
    }
    fetchData();
  }, [dispatch]);

  if (data != null) {
    //pagination components is using here for displaying the data in multiple pages
    pagination = (
      <Pagination data={data} RenderComponent={Row} dataLimit={10} />
    );
  }

  //triggering getFilterData for if user try to search
  const filterData = async (userInput) => {
    if (userInput.length === 0) {
      data = temp;
    }
    dispatch(await getFilterData(userInput, data));
  };

  return (
    <div className="App">
      {/*Search bar is reusable component*/}
      <SearchBar
        class="search"
        id="filter"
        change={(event) => filterData(event.target.value)}
      />
      <div id="footer">
        {/*Button is reusable component*/}
        <Button
          class="button"
          id="deleteSelected"
          click={() => dispatch(deleteGroupData(data))}
          name="Delete Selected"
        />
      </div>
      {pagination}
    </div>
  );
}
