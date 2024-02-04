import Input from "../../components/Input";
import "./Category.css";
function Category({handleChange}) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>
      <div>
       <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value="" name="test"/>
        <span className="checkmark"></span>All
       </label>
       <Input
       handelChange={handleChange}
       value="sneakers" 
       title="Sneakers"
       name="test"
       />
       <Input
       handelChange={handleChange}
       value="falts"
       title="Falts"
       name="test"
       />
       <Input
       handelChange={handleChange}
       value="sandals"
       title="Sandals"
       name="test"
       />
       <Input
       handelChange={handleChange}
       value="hells"
       title="Hells"
       name="test"
       />
      </div>
    </div>
  );
}

export default Category;
