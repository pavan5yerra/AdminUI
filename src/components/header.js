import { CheckBox } from "./checkbox";
export const Header = (props) => {
  let columns = [];
  props.headers.map((val, index) => {
    if (val === "checkbox") {
      columns.push(
        <CheckBox
          class="checkbox"
          key={index}
          id={index}
          dataset="dataset-headcheck"
        />
      );
    } else {
      columns.push(
        <div className="header-col" key={index}>
          {val}
        </div>
      );
    }
    return null;
  });
  return (
    <div id="header" className="row-sub-container">
      {columns}
    </div>
  );
};
