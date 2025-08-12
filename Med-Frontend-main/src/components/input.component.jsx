import { useState } from "react";

const InputBox = ({ name, type, value, placeholder, id, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type === "password" ? (passwordVisible ? "text" : "password") : type} // Corrected the ternary logic
        placeholder={placeholder}
        defaultValue={value} // Corrected 'defaulvalue' to 'defaultValue'
        id={id}
        className="input-box"
      />

      <i className={"fi " + icon + " input-icon"}></i> {/* Correct class name concatenation */}

      {/* Toggle password visibility */}
      {type === "password" && (
        <i
          className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
          onClick={() => setPasswordVisible((currentVal) => !currentVal)}
        ></i>
      )}
    </div>
  );
};

export default InputBox;
