const api = "http://localhost:3000/base";
const base = [];
const body = document.querySelector('body');

function createNew(el){
    return document.createElement(el);
}
function append(parent, el){
    return parent.appendChild(el);
}

fetch(api)
    .then(res => res.json())
    .then(data => {
        return data.map(singleData => {
            console.log(singleData.name);
            let name = singleData.name;
            let h2 = createNew('h2');
            console.log(singleData.info);
            h2.innerHTML = name;
            append(body, h2);
        })

    })


// function getBase() {
//     const base = [];

//     const promise = fetch(api)
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         base.push(data);
//         console.log(base);
//     })
//     .catch(err => console.log('pojawił się error', err));

//     return Promise.all(base);
// }
// getBase();

console.log(base);