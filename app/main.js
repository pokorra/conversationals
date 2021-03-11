document.addEventListener("DOMContentLoaded", () => {

    const base = [];
    const list = document.querySelector('.list-container');
    const paginationBox = document.querySelector('.page-numbers');
    const body = document.querySelector('body');
    const html = document.querySelector('html');
    const menuBtn = document.querySelector('.menu-btn');
    const navList = document.querySelector('#nav-list');
    //searching variables:
    const searchInput = document.querySelector('.search-form__input');
    const suggestions = document.querySelector('.search-form__list');
    //pagination variables:
    let currentPage = 1;
    let itemsPerPage = 8;

    function createNew(el){
        return document.createElement(el);
        }
    function append(parent, el){
        return parent.appendChild(el);  
        }
        //expanding spiral menu
    menuBtn.addEventListener('click', ()=> {
        navList.classList.contains('rolled-up') ?
        navList.classList.replace('rolled-up', 'rolled-down') : navList.classList.replace('rolled-down', 'rolled-up');
    })

//opening linked items
const showLinkedItem = (itemName) => {
    const newItem = base.find( ({name}) => name === itemName);
    showItem(newItem);
}
//unsolved issue with two-word items
window.showItemFromList = (itemName) => {
    const newItem = base.find( ({name}) => name === itemName);
    showItem(newItem);
    searchInput.value = '';
    suggestions.innerHTML = '';
}
//clearing input on clicking not on input and hiding spiral menu on clicking not on it
document.addEventListener('click', function(e){
    if (!e.target.classList.contains('search')) {
        searchInput.value = '';
        suggestions.innerHTML = '';
    }
    if (!e.target.classList.contains('spiral-icon') && navList.classList.contains('rolled-down')){
        navList.classList.replace('rolled-down', 'rolled-up') ;
    }
})

//searching through the input
function findPlaces(wordToFind, base){
    return base.filter(baseItem => {
        const regex = new RegExp(wordToFind, 'gi');
        return baseItem.name.match(regex);
    })
}

function displayNamesInput(){
    const matchInBase = findPlaces(this.value, base);
    const list = matchInBase.map(match => {
        if(this.value === '') {return;}
        // const stringified = JSON.stringify(match.name);
        return ` <li class='list-from-form'> 
                    <button  onclick=showItemFromList('${match.name}')> ${match.name} </button> 
                </li>`;
    }).join('');  
    suggestions.innerHTML = list;
}

//closing modal
const closePopup = () => {
    const openDivs = document.querySelectorAll('.popup-div');
    openDivs.forEach(eachDiv => {
        body.removeChild(eachDiv);
    })
}

//bigger functions
//fetching data from api
const api = "https://api.npoint.io/e26132b4e5bfd46cdb19/base/"
function getBase(){

    fetch(api)
    .then(res => res.json())
    .then(data => {
         data.forEach(each => {
            base.push(each);
        });       
        DisplayList(base, list, itemsPerPage, currentPage);
        Pagination(base, paginationBox, itemsPerPage);
        searchInput.addEventListener('keyup', displayNamesInput);
    })
};

//displaying list
function DisplayList(items, wrapper, itemsPerPage, pageNumber) {
    wrapper.innerHTML = '';
    pageNumber--;
    let start = itemsPerPage * pageNumber;
    let end = start + itemsPerPage;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i< paginatedItems.length; i++) {
        let item = paginatedItems[i];
        let li = createNew('li');
        let button = createNew('button');
        button.innerHTML = item.name;
        append(li, button)
        append(wrapper, li);
        button.addEventListener('click',
            ()=> { showItem(item)}
        )
    }
};

//displaying modal with an entry data
window.showItem = (item) => {
    const newdiv = ` <div class="new-div">                     
                        <h2> ${item.name} </h2>    
                    </div>`;
    const bigDiv = createNew('div');
    bigDiv.classList.add('popup-div');
    bigDiv.innerHTML = newdiv;
    const closingBtn = createNew('button');
    closingBtn.classList.add('close-div');
    closingBtn.onclick = ()=> closePopup();
    append(bigDiv, closingBtn);

    //conversationals list
    const ul = createNew('ul');
    ul.classList.add('alg-list');
    if (item.info) {
        item.info.map(single => {
            const li = createNew('li');
            li.innerHTML = single.innerinfo;
            if (single.innerlink) {
                //link to related entries
                single.innerlink.map(singlelink=> {
                    const btnlink = createNew('button');
                    btnlink.classList.add('btn-link');
                    btnlink.innerHTML = `Zobacz też: ${singlelink}`;
                    append(li, btnlink);
                    btnlink.addEventListener('click', ()=> {
                        showLinkedItem(singlelink);
                    })
                })
            }
            append(ul, li);   
        })
        append(bigDiv, ul);
    };

    if (item.link) {
        const itemLink = createNew('button');
        itemLink.classList.add('btn-link', 'item-link');
        itemLink.innerHTML = `Zobacz: ${item.link}`;
        itemLink.addEventListener('click', ()=> {
            showLinkedItem(item.link);
        })
        append(bigDiv, itemLink);
     }
    append(body, bigDiv);
}

function Pagination (items, wrapper, itemsPerPage){
    wrapper.innerHTML = '';
    let pageNumber = Math.ceil(items.length / itemsPerPage);
    for (let i = 1; i<pageNumber + 1 ; i++) {
        let btn = PaginationButton(i, items);
        append(wrapper, btn);
    }  
}

function PaginationButton(page, items){
    let button = createNew('button');
    button.innerHTML = page;
    currentPage == page ? button.classList.add('active') : '';
    button.addEventListener('click', ()=> {
        currentPage = page;
        DisplayList(items, list, itemsPerPage, currentPage);
        document.querySelector('button.active').classList.remove('active');
        button.classList.add('active');
    })
    return button;
}


getBase();


});