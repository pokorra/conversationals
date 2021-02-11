const firstSection = document.querySelector('.first-inner');
const secondSection = document.querySelector('.second-inner');
const thirdSection = document.querySelector('.third-inner');

const halfFirst = document.querySelector('.half-first');
const halfSecond = document.querySelector('.half-second');
const siteTitle = document.querySelector('h1');

const stamp = document.querySelector('.stamp');

const timeline = new TimelineMax();

timeline.fromTo(halfFirst, 1, {height: "0%"}, {height: "100%", ease: Power2.linear})
    .fromTo(halfSecond, 1, {height: "0%"}, {height: "100%", ease: Power2.easeIn})
    .fromTo(siteTitle, 2, {opacity: "0"}, {opacity: "1"})
    .fromTo(secondSection, 1.5, {left: "-100vw"}, {left: "0vw"})
    .to(secondSection, 5, {opacity: "1"})
    .fromTo(stamp, .5, {display: "none"}, {display: "block"})
    .to(stamp, 2, {display: "block"})
    .fromTo(thirdSection, .5, {opacity: "0"}, {opacity: "1"})
    .fromTo(stamp, .5, {display: "block"}, {display: "none"}, "-=.5")
    .fromTo(secondSection, 1.5, {right: "0vw"}, {right: "100vw"}, "-=.5")
