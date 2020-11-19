//scrolling
const info = document.getElementById('info');
const advantages =document.getElementById('advantages');
const contact = document.getElementById('contact');

const toInfo = document.querySelector('.sec-info');
const toAdvantages = document.querySelector('.sec-advantages');
const toContact = document.querySelector('.footer');

function Scroll(from, to){
    to.addEventListener('click', ()=> {
        from.scrollIntoView({behavior: "smooth"});
        console.log("bang");
    })
}
Scroll(toInfo, info);
Scroll(toAdvantages, advantages);
Scroll(toContact, contact);

//displaying email address
const mail = document.querySelector('.address')
mail.innerHTML = mail.dataset.par;
mail.addEventListener('click', ()=> {
    if (mail.innerHTML === mail.dataset.par) {
        mail.innerHTML = mail.dataset.mail
    } else {
        mail.innerHTML = mail.dataset.par
    }
})