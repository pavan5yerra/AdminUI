import { CheckBox } from "./checkbox";
import { Button } from "./button";
import { Header } from "./header";
import "../styles.css";

// Row component  will generate dynamic div  based on data
export const Row = (props) => {
  const header = ["checkbox", "NAME", "EMAIL", "ROLE", "EDIT", "DELETE"];
  let rows;
  if (props.data == null) {
    rows = <div> Loading ....</div>;
  } else {
    rows = props.data.map((val) => {
      const columns = [];
      let index = val["id"];
      columns.push(<CheckBox key={index} id={index} />);
      for (let [key, vals] of Object.entries(val)) {
        key === "id" ? null : columns.push(<div id={index}>{vals}</div>);
      }
      columns.push(<Button id={index} class="button-inverse" name="Edit" />);
      columns.push(<Button id={index} class="button-inverse" name="Delete" />);
      return (
        <div className="row-sub-container" key={index}>
          {columns}
        </div>
      );
    });
  }

  return (
    <div className="row-container">
      <Header headers={header} />
      {rows}
    </div>
  );
};
