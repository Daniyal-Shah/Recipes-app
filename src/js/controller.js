
import axios from 'axios';
import Search from './models/Search';

async function getResults()
{
  try 
  {
    const result = await axios(`https://recipesapi.herokuapp.com/api/v2/categories`);
    // const data = await result.json();
    console.log(result);
  } 
  catch (error) 
  {
    console.log(error)
  }
}

//  getResults();

const obj = new Search('pizza');
obj.getResults();

