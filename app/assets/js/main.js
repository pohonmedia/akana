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
    }
});
