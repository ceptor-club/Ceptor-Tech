const Select = ({ options, value, onChange, style }) => (
  <select value={value} onChange={onChange} style={style}>
    {options.map((option, index) => (
      <option key={index} value={option.value}>{option.label}</option>
    ))}
  </select>
);