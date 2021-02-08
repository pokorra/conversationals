document.addEventListener("DOMContentLoaded", () => {

const api = "http://localhost:3000/base";
const base = [];
const list = document.querySelector('.list-container');
const paginationBox = document.querySelector('.page-numbers');
const body = document.querySelector('body');
const html = document.querySelector('html');
//pagination variables:
let currentPage = 1;
let itemsPerPage = 8;

function createNew(el){
    return document.createElement(el);
}
function append(parent, el){
    return parent.appendChild(el);
}
//otwieranie powiązanych haseł
function showLinkedItem (itemName, items) {
    const newItem = items.find( ({name}) => name === itemName);
    showItem(newItem, items);
}

//zamykanie popupu
const closePopup = () => {
    const openDivs = document.querySelectorAll('.popup-div');
    openDivs.forEach(eachDiv => {
        body.removeChild(eachDiv);
    })
}

//duże funkcje:

//fetching data from api
function getBase(){
    fetch(api)
    .then(res => res.json())
    .then(data => 
        {
         data.forEach(each => {
            base.push(each);
        });
       
        DisplayList(base, list, itemsPerPage, currentPage);
        Pagination(base, paginationBox, itemsPerPage);
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
            ()=> { showItem(item, items)}
        )
    }
};


const showItem = (item, items) => {
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
        if (event.target === html) {
            closePopup();
        }
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
                        showLinkedItem(singlelink, items);
                    })
                })
            }
            append(ul, li);
            
        })
        append(bigDiv, ul);
    };

    if (item.link) {
        const itemLink = createNew('button');
        itemLink.classList.add('item-link');
        itemLink.innerHTML = `Zobacz też: ${item.link}`;
        itemLink.addEventListener('click', ()=> {
            showLinkedItem(item.link, items);
        })
        bigDiv.appendChild(itemLink);
     }
    // append(bigDiv, ul);
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