import React from "react";
import { languages } from "../helpers/localesHelpers";

function LanguageSelector({ value, onChange, className }) {
  return (
    <select value={value} onChange={onChange} className={className}>
      {languages.map((langOption) => (
        <option key={langOption} value={langOption}>
          {langOption.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
