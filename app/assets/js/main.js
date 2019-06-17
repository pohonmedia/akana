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
