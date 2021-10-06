
import axios from 'axios';
import { async } from 'regenerator-runtime';
import Search from './models/Search';

// Global state object
// -search object
// -recipe object
// -shopping list object
// -liked recipies
const state={}

const controlSearch= async()=>
{
    // 1- get the query from the view
    const query="pizza";

    if(query)
    {
        // 2- now search object and add to state
        state.search = new Search(query);
        // 3-Prepare results for UI

        // 4- Search for recipies
        await state.search.getResults();

        // 5-renders results on UI

        console.log(state.search.result)   
    }
}

document.querySelector('.search').addEventListener('submit', e=>
{    
    e.preventDefault();
    controlSearch();
});

