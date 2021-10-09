import axios from "axios";

export default class Recipe{
    constructor(id)
    {
        this.id=id;
    }

    async getRecipe()
    {
        try 
        {
            const res =await axios(`https://recipesapi.herokuapp.com/api/v2/recipes/${this.id}`);    
            this.title= res.data.recipe.title;
            this.author=res.data.recipe.publisher;
            this.img= res.data.recipe.imageUrl;
            this.url= res.data.recipe.sourceUrl;
            this.ingredients= res.data.recipe.ingredients;
            // console.log(res);
        } catch (error) 
        {
            // console.log(error);   
            alert('something went wrong')
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng /3);
        this.time = periods*3;
    }
    calcServings()
    {
        this.servings=4;
    }

    parseIngredients()
    {
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons', 'teaspoon','cups','pounds']
        const unitsShort=['tbsp','tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']

        const newIngredients = this.ingredients.map(el=>{
        //Uniform units 
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit,i)=>{
            ingredient=ingredient.replace(unit,unitsShort[i]);
        });

        //remove parenthesis 
        ingredient = ingredient.replace(/ *\([^)]*\) */g, "")

        //parse ingredients into count,unit and ingredient
        const arrIng =ingredient.split(' ');
        const unitIndex= arrIng.findIndex(el2=>{
            unitsShort.includes(el2);
        })

        let objIng;
        if(unitIndex>-1)
        {
            // there is a unit
            const arrCount= arrIng.slice(0,unitIndex);
            let count;
            if(arrCount.length===1){
                count= eval(arrIng[0].replace('-','+'));
            }
            else{
                count= eval(arrIng[0].slice(0,unitIndex).join('+'));                
            }
        }
        else if(parseInt(arrIng[0],10))
        {
        //there is no unit but first element is number
            objIng= {
                count:parseInt(arrIng[0],10),
                unit: ' ',
                ingredient : arrIng.slice(1).join(' ')                    
            }
        }
        else if (unitIndex===-1)
        {
            objIng= {
                count:1,
                unit: ' ',
                ingredient  
            }
        }


        return objIng;
        });
        this.ingredients=newIngredients;
    }   
}