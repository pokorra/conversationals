const firstSection = document.querySelector('.first-inner');
const secondSection = document.querySelector('.second-inner');
const thirdSection = document.querySelector('.third-inner');

const halfFirst = document.querySelector('.half-first');
const halfSecond = document.querySelector('.half-second');
const siteTitle = document.querySelector('h1');

const stamp = document.querySelector('.stamp');

const timeline = new TimelineMax();

timeline.fromTo(halfFirst, 1, {height: "0%"}, {height: "100%", ease: Power0.easeNone})
    .fromTo(halfSecond, .5, {height: "0%"}, {height: "100%", ease: Power0.easeNone})
    .fromTo(siteTitle, 2, {opacity: "1"}, {opacity: "1"})
    .fromTo(secondSection, .5, {left: "-100vw"}, {left: "0vw" , ease: Power0.easeNone})
    .to(secondSection, 3, {opacity: "1"})
    .fromTo(stamp, .5, {display: "none"}, {display: "block"})
    .to(stamp, 4, {display: "block"})    
    .to(stamp, .5, {display: "none"})
    .fromTo(secondSection, 1.5, {right: "0vw"}, {right: "100vw"}, "-=1")
    .fromTo(thirdSection, .5, {opacity: "0"}, {opacity: "1"} , "-=.5")
