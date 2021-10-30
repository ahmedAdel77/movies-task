import './App.css';
import AddCategoryForm from './components/addCategoryForm';
import CategoriesList from './components/categoriesList';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="">
      <Navbar />

      <div className="container">
        <AddCategoryForm formType={'category'} />
        <CategoriesList />
      </div>
    </div>
  );
}

export default App;
