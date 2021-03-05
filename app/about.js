const openingButtons = document.querySelectorAll('.collapse');

for (let i = 0; i < openingButtons.length; i++) {
    openingButtons[i].addEventListener('click', function(){
        this.classList.toggle("about-active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
}