export const elements={
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results'),
    searchRes: document.querySelector('.recipe'),
    searchMessage: document.querySelector('.message'),
    searchResPages: document.querySelector('.pagination')
} 

export const renderLoader= ()=> 
{
    document.getElementById('loadSpinner').style.display="block";

} 

export const hideMessage= ()=>
{
    document.getElementById('messageSearch').style.display="none";
    // const element= document.querySelector('.message');
    // element.parentNode.removeChild(element);
}

export const clearLoader=()=>
{
    document.getElementById('loadSpinner').style.display="none";
}