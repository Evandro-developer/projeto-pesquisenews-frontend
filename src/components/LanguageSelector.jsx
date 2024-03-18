function LanguageSelector({
  value,
  onChange,
  className,
  renderOptions,
  iconType,
}) {
  return (
    <select value={value} onChange={onChange} className={className}>
      <option value="" aria-label="Select Language">
        {iconType === "globe" ? "🌐" : "🌍"}
      </option>
      {typeof renderOptions === "function" ? renderOptions() : renderOptions}
    </select>
  );
}

export default LanguageSelector;
