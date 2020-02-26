(function (btn) {

    if (!btn) {
        return;
    }


    const headerNav = document.querySelector('.sp-header__nav');

    btn.addEventListener("click", function (e) {

        headerNav.classList.toggle('sp-header__nav--active');
        this.classList.toggle('sp-header__btn-burger--close');

        if (headerNav.classList.contains('sp-header__nav--active')) {

            document.body.style.overflow = 'hidden';
        }
        else {

            document.body.style.overflow = 'auto';
        }


    })

})(document.querySelector('.sp-header__btn-burger'))