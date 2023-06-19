import React from "react";

const Button = (props) => {
  return (
    <button className="mt-3 w-48 rounded-full bg-sky-500 py-3 text-white hover:bg-sky-700">
      {props.title}
    </button>
  );
};

export default Button;
