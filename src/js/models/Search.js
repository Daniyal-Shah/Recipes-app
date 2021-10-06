import axios from 'axios';
const { async } = require("regenerator-runtime");


export default class Search
{
    constructor(query)
    {
        this.query=query;
        this.result=null;        
    }

    async getResults()
    {
        try 
        {
            const res = await axios(`https://recipesapi.herokuapp.com/api/v2/recipes?q=${this.query}&page=1`);
             this.result = res.data.recipes;      
        } 
        catch (error) 
        {
            alert(error)
        }
    }
}

