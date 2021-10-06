import { elements } from "./base";

export const getInput= ()=> elements.searchInput.value;

const limitRecipeTitle=(title, limit=17)=>{
    const newTitle=[];
    if(title.length> limit)
    {
        title.split(' ').reduce((acc,curr)=>{
                if(acc+ curr.length<=limit)
                {
                    newTitle.push(curr);
                }
                return acc + curr.length;
        },0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
};


const renderRecipe= recipe =>{
    const markup=
    `<li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
            <figure class="preview__fig">
                <img src="${recipe.imageUrl}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${limitRecipeTitle(recipe.title)}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li> `;
        elements.searchResList.insertAdjacentHTML('beforeend', markup);
};


export const clearResults =()=>{
    elements.searchResList.innerHTML='';
};
 
export const clearInput=()=>{
    elements.searchInput.value='';
};

export const renderResults= recipes =>
{
    recipes.forEach(renderRecipe)
}