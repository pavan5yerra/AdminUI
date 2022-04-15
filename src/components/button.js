//button component
export const Button = (props) => {
  return (
    <div>
      <button id={props.id} className={props.class} onClick={props.click}>
        {props.name}
      </button>
    </div>
  );
};
