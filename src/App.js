import React, {useEffect, useState} from 'react';
import "./App.css"
import Recipie from "./Recipie"


const App = () => {

  const APP_ID = 'ffde8bb5'
  const APP_KEY = 'f2fd43e1e34e04aa79a2c9e6719fbde9'

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('lemon')

  useEffect(() => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data = await response.json()
    setRecipes(data.hits)
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search)
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }



  return (
    <div className="App">
      <form onSubmit = {getSearch} className="search-form">
        <input 
          className="search-bar" 
          type="text"
          value={search}
          onChange = {updateSearch}
          />
        <button 
          className="search-button"
          type="submit"
          >
          Search
        </button>

        {recipes.map(recipe => 
          <Recipie 
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
        )}
      </form>
    </div>
  )
}


export default App;
