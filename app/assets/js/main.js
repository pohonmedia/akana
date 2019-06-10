$(document).ready(function () {
    console.log("javascript ready!");
});

var swiper = new Swiper('.swiper-container', {

    slidesPerView: 3,
    spaceBetween: 5,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },

    //responsive breakpoints 

    breakpointsInverse: true,
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        600: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        800: {
            slidesPerView: 3,
            spaceBetween: 5,
        }
    }
});