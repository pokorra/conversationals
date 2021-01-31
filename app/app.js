const api = "http://localhost:3000/base";
const base = [];
const list = document.querySelector('.list-container');
const body = document.querySelector('body');

function createNew(el){
    return document.createElement(el);
}
function append(parent, el){
    return parent.appendChild(el);
}

function showMe(info){
    console.log(info);
    let div = createNew('div');
    div.classList.add('popup-div');
    let h2 = createNew('h2');
    h2.innerHTML = info.name;
    let ul = createNew('ul');
    ul.classList.add('alg-list')
    if (info.info) {
        console.log(info.info);
        info.info.map(single => {
        let li = createNew('li');
        li.innerHTML = single.innerinfo;
        if (single.innerlink) {
            single.innerlink.map(singlelink=> {
                let btnlink = createNew('button');
                btnlink.classList.add('btn-link');
                btnlink.innerHTML = singlelink;
                console.log(singlelink);
                append(li, btnlink);
                btnlink.addEventListener('click', ()=> {
                    console.log(singlelink);
                })
            })
        }
        console.log(single.innerinfo);
        append(ul, li);
    });
    } else {
        console.log('bez info');
    }
    append(div, h2);
    append(div, ul);
    append(body, div);
}

function getBase(){
    fetch(api)
    .then(res => res.json())
    .then(data => {
        return data.map(singleData => {
            let inner = singleData.name;
            let li = createNew('li');
            let btn = createNew('button');
            btn.innerHTML = inner;
            append(li, btn);
            append(list, li);
            
            btn.addEventListener('click', ()=>{
                showMe(singleData);
            })

        })

    })
};
getBase();



console.log(base);