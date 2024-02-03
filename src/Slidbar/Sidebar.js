import Category from'./Category/Category'
import './Sidebar.css'

function Sidebar() {
  return (
  <section className='sidebar'>
    <div className='logo-container'>
        <h1>
        🛒
        </h1>
    </div>
    <Category/>
  </section>
  )
}

export default Sidebar;
