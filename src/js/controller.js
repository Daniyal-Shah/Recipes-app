
import axios from 'axios';
import { async } from 'regenerator-runtime';
import Search from './models/Search';
import { elements, renderLoader,hideMessage,clearLoader, clearRecipies } from './views/base';
import * as searchView from './views/searchView'
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView'

// Global state object
// -search object
// -recipe object
// -shopping list object
// -liked recipies
const state={}

const controlSearch= async()=>
{
    // 1- get the query from the view
    const query= searchView.getInput();
    // console.log(query);

    if(query)
    {
        // 2- now search object and add to state
        state.search = new Search(query);

        // 3-Prepare results for UI
        searchView.clearInput();
        searchView.clearResults();
        hideMessage();
        renderLoader(elements.searchRes);

        try {
            // 4- Search for recipies
            await state.search.getResults();
            clearLoader();
            

            // 5-renders results on UI
            // console.log(state.search.result)
            searchView.renderResults(state.search.result);               
        } catch (error) {
            alert('something went wrong with search');
            clearLoader();

        }

    }
    else{

    }
}

elements.searchForm.addEventListener('submit', e=>
{ 
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn--inline');
    if(btn)
    {
        const goToPage= parseInt(btn.dataset.goto,10) ;
        // console.log(goToPage);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);   
    }

});

// const recip =new Recipe(36498);
// recip.getRecipe();
// console.log(recip)

const controlRecipe= async()=>{
    //Get ID from URL
    const id = window.location.hash.replace('#','');
    console.log(id)

    if(id)
    { 

        renderLoader();
        // clearRecipies();
        try {
            //Prepare UI for changes


            //create new recipe object
            state.recipe = new Recipe(id); 

            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            hideMessage();
            recipeView.renderRecipe(state.recipe);
            // console.log(state.recipe)
            
        } catch (error) {
            alert('Reciper processing error')            
        }

    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange','load'].forEach(event=> window.addEventListener(event,controlRecipe));