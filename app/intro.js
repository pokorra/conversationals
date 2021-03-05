const firstSection = document.querySelector('.first-inner');
const secondSection = document.querySelector('.second-inner');

const halfFirst = document.querySelector('.half-first');
const halfSecond = document.querySelector('.half-second');
const siteTitle = document.querySelector('h1');


const timeline = new TimelineMax();

timeline.fromTo(halfFirst, 1, {opacity: "0"}, {opacity: "1", ease: Power0.easeNone})
    .fromTo(halfSecond, .5, {opacity: "0"}, {opacity: "1", ease: Power0.easeNone})
    .fromTo(siteTitle, 2, {opacity: "1"}, {opacity: "1"})
    .fromTo(secondSection, .2, {left: "-100vw"}, {left: "0vw" , ease: Power0.easeNone})
