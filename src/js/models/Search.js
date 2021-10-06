import axios from 'axios';
const { async } = require("regenerator-runtime");


export default class Search
{
    constructor(query)
    {
        this.query=query;        
    }

    async getResults()
    {
        try 
        {
            const res = await axios(`https://recipesapi.herokuapp.com/api/v2/recipes?q=${this.query}&page=1`);
            // const data = await result.json();
            this.result = res.data.recipes;
            console.log(this.result);
        } 
        catch (error) 
        {
            alert(error)
        }
    }
}

