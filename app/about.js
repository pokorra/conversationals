const openingButtons = document.querySelectorAll(".collapse");

openingButtons.forEach((openingButton) => {
    openingButton.addEventListener("click", function () {
        this.classList.toggle("about-active");
        let content = this.nextElementSibling;
        content.style.maxHeight
            ? (content.style.maxHeight = null)
            : (content.style.maxHeight = content.scrollHeight + "px");
    });
});
