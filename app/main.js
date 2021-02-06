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
// Pagination(base, paginationBox, itemsPerPage);


function DisplayList(items, wrapper, itemsPerPage, pageNumber) {
    wrapper.innerHTML = '';
    pageNumber--;
    let start = itemsPerPage * pageNumber;
    let end = start + itemsPerPage;
    let paginatedItems = items.slice(start, end);
    // console.log(paginatedItems);
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
    
        // const h2 = createNew('h2');
    // h2.innerHTML = item.name;
    const closingBtn = createNew('button');
    closingBtn.classList.add('close-div');
    closingBtn.onclick = function(closingBtn){
        body.removeChild(closingBtn.target.parentNode);
    }
    window.onclick = function(event) {
        if (event.target === html) {
            //to działa przy założeniu, że bigDiv popup-div pozostaje ostatnim dzieckiem body
            body.removeChild(body.lastChild);
        }
    }
    append(bigDiv, closingBtn);
    // append(div, h2);

    const ul = createNew('ul');
    ul.classList.add('alg-list');
    if (item.info) {
        item.info.map(single => {
            const li = createNew('li');
            li.innerHTML = single.innerinfo;
            if (single.innerlink) {
                
                single.innerlink.map(singlelink=> {
                    const btnlink = createNew('button');
                    btnlink.classList.add('btn-link');
                    btnlink.innerHTML = singlelink;
                    console.log(singlelink);
                    append(li, btnlink);
                    btnlink.addEventListener('click', ()=> {
                        console.log(singlelink);
                    })
                })
            }
            append(ul, li);
        })
    } else {
        console.log('bez infa');
    }

    append(bigDiv, ul);
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