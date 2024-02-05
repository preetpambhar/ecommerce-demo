import Buttons from "../components/Buttons";
import "./Recommended.css";
import '../Navigation/Nav.css'

function Recommended({handleClick, handleInputChange, query}) {
  return <>
  <div>
    <h2 className="recommended-title">Recommended</h2>
    <div className="recommended-flex">
      <Buttons onClickHandler={handleClick} value="" title="All"/>
      <Buttons onClickHandler={handleClick} value="Nike" title="Nike"/>
      <Buttons onClickHandler={handleClick} value="Adidas" title="Adidas"/>
      <Buttons onClickHandler={handleClick} value="Puma" title="Puma"/>
      <Buttons onClickHandler={handleClick} value="Vans" title="Vans"/>
      <div className="nav-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter your shoes search."
          onChange={handleInputChange}
          value={query}
        />
      </div>
    </div>
    </div>
    </>
}

export default Recommended;
