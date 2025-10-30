let sliders = [];

function debounce(func, delay = 200) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function initSliders() {
    const swiperElements = document.querySelectorAll(".swiper");

    swiperElements.forEach((el) => {
        if (el.classList.contains("swiper-initialized")) return;

        const swiper = new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: el.querySelector(".swiper-pagination"),
                clickable: true,
            },
            navigation: {
                nextEl: el.querySelector(".swiper-button-next"),
                prevEl: el.querySelector(".swiper-button-prev"),
            },
            breakpoints: {
                1200: {
                    slidesPerView: 1,
                },
            },
        });

        sliders.push(swiper);
    });
}

function destroySliders() {
    sliders.forEach((swiper) => {
        if (swiper && swiper.initialized) {
            const el = swiper.el;

            const pagination = el.querySelector(".swiper-pagination");
            const next = el.querySelector(".swiper-button-next");
            const prev = el.querySelector(".swiper-button-prev");

            if (pagination) pagination.style.display = "none";
            if (next) next.style.display = "none";
            if (prev) prev.style.display = "none";

            swiper.destroy(true, true);
        }
    });
    sliders = [];
}

function showControls() {
  document.querySelectorAll(".swiper").forEach((el) => {
    const pagination = el.querySelector(".swiper-pagination");
    const next = el.querySelector(".swiper-button-next");
    const prev = el.querySelector(".swiper-button-prev");

    if (pagination) pagination.style.display = "";
    if (next) next.style.display = "";
    if (prev) prev.style.display = "";
  });
}

const handleResize = debounce(() => {
    const width = window.innerWidth;

    if (width < 1200 && sliders.length) {
        destroySliders();
    } else if (width >= 1200 && !sliders.length) {
        showControls()
        initSliders();
    }
}, 75);

window.addEventListener("load", () => {
    if (window.innerWidth >= 1200) initSliders();
});

window.addEventListener("resize", handleResize);
