(function (navBar) {

    if (!navBar) {
        return;
    }

    const category = navBar.querySelector('.sp-nav__category');

    navBar.addEventListener("click", clickNavItemHandler);


    function clickNavItemHandler(e) {

        if (e.target.classList.contains("sp-nav__item--submenu") && e.target.querySelector('.sp-nav__category')) {

            category.classList.toggle("sp-nav__category--opened");
        }
    }

})(document.querySelector('.sp-nav__list'))