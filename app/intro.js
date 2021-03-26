const firstSection = document.querySelector(".intro__inner--first");
const secondSection = document.querySelector(".intro__inner--second");

const halfFirst = document.querySelector(".half-first");
const halfSecond = document.querySelector(".half-second");
const siteTitle = document.querySelector("h1");

const timeline = new TimelineMax();

timeline
    .fromTo(
        halfFirst,
        1,
        { opacity: "0" },
        { opacity: "1", ease: Power0.easeNone }
    )
    .fromTo(
        halfSecond,
        0.5,
        { opacity: "0" },
        { opacity: "1", ease: Power0.easeNone }
    )
    .fromTo(siteTitle, 2, { opacity: "1" }, { opacity: "1" })
    .fromTo(
        secondSection,
        0.2,
        { left: "-100vw" },
        { left: "0vw", ease: Power0.easeNone }
    );
