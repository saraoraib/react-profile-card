function Header({ color, onChange }) {
  return (
    <header className="app-header">
      <h2>My React App</h2>
      <div className="header-color-picker">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Header;