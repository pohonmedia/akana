$(document).ready(function () {
    console.log("javascript ready!");
});

//swiper

var swiper = new Swiper('.swiper-container', {

    slidesPerView: 3,
    spaceBetween: 5,
    loop: true,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: true,
    // },

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

var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    loopedSlides: 4
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 4
});
galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;

//slider price

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [500, 4000],
    range: {
        'min': [100],
        '10%': [500, 500],
        '50%': [4000, 1000],
        'max': [10000]
    }
});

var sliderValue = document.getElementById('slider-value');

slider.noUiSlider.on('update', function (values) {
    sliderValue.innerHTML = values.join(' - ');
});

//selectize
