(function (navBar) {

    if (!navBar) {
        return;
    }

    const category = navBar.querySelector('.sp-nav__category');

    document.addEventListener("click", clickNavItemHandler);

    //открываем подменю в шапке
    function clickNavItemHandler(e) {

        if (e.target.classList.contains("sp-nav__item--submenu") || e.target.closest('.sp-nav__category')) {

            category.classList.toggle("sp-nav__category--opened");
        }
        else {

            category.classList.remove("sp-nav__category--opened");
        }
    }

})(document.querySelector('.sp-nav__list'))