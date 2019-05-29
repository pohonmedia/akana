$(document).ready(function () {
    console.log("javascript ready!");
});

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 5,
    // centeredSlides: true,
    // slidesPerGroup: 3,
    loop: true
    // loop: true,
    // Navigation arrows
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // }
});
