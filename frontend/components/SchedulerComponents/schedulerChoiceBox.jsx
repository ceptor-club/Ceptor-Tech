const ChoiceBox = ({ title, subtitle, description, onClick, style }) => (
  <div onClick={onClick} style={style}>
    <h2>{title}</h2>
    <p>{subtitle}</p>
    <p>{description}</p>
  </div>
);