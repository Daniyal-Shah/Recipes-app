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


const renderRecipe= recipe =>
{
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
    elements.searchResPages.innerHTML='';
};
 
export const clearInput=()=>{
    elements.searchInput.value='';
};

const createButton=(page,type)=>
       `<button class="btn--inline pagination__btn--${type}" data-goto=${type==='prev'? page-1: page+1}>
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-${type==='prev'? 'left': 'right'}"></use>
            </svg>
            
            <span>Page ${type==='prev'? page-1: page+1}</span>        
        </button>`;


const renderButtons= (page, numResults, resPerPage)=>{
    const pages= Math.ceil (numResults/resPerPage);
    let button;

    if(page==1 && pages>1)
    {
        //button to next page
       button= createButton(page, 'next');
    }
    else if(page<pages)
    {
        //both buttons
        button=`
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }
    else if(page===pages && pages>1)
    {
        //button to previous pages
        button= createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
    // console.log(button)

}

export const renderResults= (recipes,page=1,resPerPage=10) =>
{
    const start=(page-1)*resPerPage;
    const end= page * resPerPage;
    recipes.slice(start,end).forEach(renderRecipe)

    renderButtons(page, recipes.length,resPerPage);
}