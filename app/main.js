document.addEventListener("DOMContentLoaded", () => {

const api = "http://localhost:3000/base";
const base = [];
const list = document.querySelector('.list-container');
const paginationBox = document.querySelector('.page-numbers');
const body = document.querySelector('body');
const html = document.querySelector('html');
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('#nav-list');
//searching variables:
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
//pagination variables:
let currentPage = 1;
let itemsPerPage = 8;

//rozwijanie menu
menuBtn.addEventListener('click', ()=> {
    navList.classList.contains('rolled-up') ?
    navList.classList.replace('rolled-up', 'rolled-down') : navList.classList.replace('rolled-down', 'rolled-up');
})


function createNew(el){
    return document.createElement(el);
}
function append(parent, el){
    return parent.appendChild(el);
}
//otwieranie powiązanych haseł
const showLinkedItem = (itemName) => {
    const newItem = base.find( ({name}) => name === itemName);
    showItem(newItem);
}
//co z hasłami dwuwyrazowymi?
window.showItemFromList = (itemName) => {
    console.log(itemName);
    const newItem = base.find( ({name}) => name === itemName);
    showItem(newItem);
    searchInput.value = '';
    suggestions.innerHTML = '';
}

//zamykanie popupu
const closePopup = () => {
    const openDivs = document.querySelectorAll('.popup-div');
    openDivs.forEach(eachDiv => {
        body.removeChild(eachDiv);
    })
}

//DUŻE FUNKCJE:
//fetching data from api
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
    window.onclick = function(event) {
        console.log(event.target)
    }
    append(bigDiv, closingBtn);

    //lista algorytmów
    const ul = createNew('ul');
    ul.classList.add('alg-list');
    if (item.info) {
        item.info.map(single => {
            const li = createNew('li');
            li.innerHTML = single.innerinfo;
            if (single.innerlink) {
                //tutaj odnośnik do haseł powiązanych
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
        // itemLink.classList.add('item-link');
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
        const stringified = JSON.stringify(match.name);
        return ` <li class='list-from-form'> 
                    <button  onclick=showItemFromList('${match.name}')> ${match.name} </button> 
                </li>`;
    }).join('');  
    suggestions.innerHTML = list;
}

getBase();


});