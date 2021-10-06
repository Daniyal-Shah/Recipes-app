
import axios from 'axios';
import { async } from 'regenerator-runtime';
import Search from './models/Search';
import { elements, renderLoader,hideMessage,clearLoader } from './views/base';
import * as searchView from './views/searchView'

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
    console.log(query);

    if(query)
    {
        // 2- now search object and add to state
        state.search = new Search(query);

        // 3-Prepare results for UI
        searchView.clearInput();
        searchView.clearResults();
        hideMessage();
        renderLoader(elements.searchRes);


        // 4- Search for recipies
        await state.search.getResults();
        clearLoader();
        

        // 5-renders results on UI
        console.log(state.search.result)
        searchView.renderResults(state.search.result);   
    }
}

elements.searchForm.addEventListener('submit', e=>
{    
    e.preventDefault();
    controlSearch();
});

