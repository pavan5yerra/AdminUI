import "../styles.css";
export const SearchBar = (props) => {
  return (
    <input
      type="text"
      className={props.class}
      id={props.id}
      onChange={props.change}
      placeholder="Search by name email or role"
    />
  );
};
