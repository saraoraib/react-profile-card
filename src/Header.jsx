import { useColor } from './ColorContext';

function Header() {
  const { bgColor, setBgColor } = useColor();

  return (
    <header className="app-header">
      <h2>My React App</h2>
      <div className="header-color-picker">
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Header;