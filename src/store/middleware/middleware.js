import {
  filterArrayObjects,
  deleteArrayObjects
} from "../../utils/modifyarrayobjects";

import {
  filterData,
  deleteData,
  empty,
  getData,
  EditData
} from "../actions/actions";

//middleware functions

//filtering data  as per user Input
export const getFilterData = async (userInput, data) => {
  const dataAfterFilter = filterArrayObjects(userInput, data);
  return (dispatch) => {
    dispatch(filterData(dataAfterFilter));
  };
};

//delete multicheckbox tick data
export const deleteGroupData = (data) => {
  //intiating delete actions
  let keyarr = [];
  const checked = document.querySelector(".row-container");
  for (let [key, value] of Object.entries(checked.childNodes)) {
    if (key !== "0") {
      if (value.childNodes[0].checked === true) {
        keyarr.push(value.childNodes[0].id);
      }
    }
  }
  checked.childNodes[0].childNodes[0].checked = false;
  const groupData = data.filter((val) => !keyarr.includes(val.id));
  return (dispatch) => {
    dispatch(deleteData(groupData));
  };
};

/*
    Taking advantage of event bubbling instead of adding eventlistners
on each and every component applying it only on parent component , 
so that when event bubbling phase comes the below method catches and filter all the
events fired from child component.
*/

export const eventActions = (event, data) => {
  //checking if delete button is clicked
  if (event.target.innerText === "Delete") {
    const dataAfterFilter = deleteArrayObjects(event.target.id, data);
    return (dispatch) => {
      dispatch(deleteData(dataAfterFilter));
    };
  }

  //checking and unchecking all checkboxes using dom methods for multiple deletion
  if (event.target.id === "0") {
    const element = document.querySelector(".row-container");
    for (let [key, value] of Object.entries(element.childNodes)) {
      if (key !== "0") {
        if (event.target.checked) {
          value.childNodes[0].checked = true;
        } else {
          value.childNodes[0].checked = false;
        }
      }
    }
    return (dispatch) => {
      dispatch(empty);
    };
  }
  //performing actions , once  edit button is clicked and make the content editable
  if (event.target.innerText === "Edit") {
    console.log("inside Edit", event.target.innerText);
    const element = document.querySelector(".row-container");
    for (let [, value] of Object.entries(element.childNodes)) {
      if (event.target.id === value.childNodes[1].id) {
        value.childNodes[1].contentEditable = true;
        value.childNodes[2].contentEditable = true;
        value.childNodes[3].contentEditable = true;
        value.childNodes[4].firstChild.innerText = "Save";
      }
    }
    return (dispatch) => {
      dispatch(empty);
    };
  }
  //performing actions , once contecnt is edited.
  if (event.target.contentEditable) {
    const element = document.querySelector(".row-container");
    const editedData = {};
    let [name, email, role] = ["", "", ""];
    for (let [, value] of Object.entries(element.childNodes)) {
      if (event.target.id === value.childNodes[1].id) {
        name = value.childNodes[1].innerText;
        email = value.childNodes[2].innerText;
        role = value.childNodes[3].innerText;

        if (event.target.innerText === "Save") {
          value.childNodes[1].contentEditable = false;
          value.childNodes[2].contentEditable = false;
          value.childNodes[3].contentEditable = false;
          value.childNodes[4].firstChild.innerText = "Edit";
          editedData.id = value.childNodes[1].id;
          editedData.name = name;
          editedData.email = email;
          editedData.role = role;
        }
      }
    }
    return (dispatch) => {
      dispatch(EditData(editedData));
    };
  } else {
    return (dispatch) => {
      dispatch(empty);
    };
  }
};

//getting data from backend
export const getApiData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return (dispatch) => {
    dispatch(getData(data));
  };
};
