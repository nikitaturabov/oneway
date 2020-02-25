(function (detailDescription) {

    if (!detailDescription) {

        return;
    }

    const tabs = document.querySelectorAll('.sp-detail-description__tab'),
        content = document.querySelectorAll('.sp-detail-description__content'),
        ACTIVE_CONTENT_CLASS = 'sp-detail-description__content--active',
        ACTIVE_TAB_CLASS = 'sp-detail-description__tab--active',
        btnOpenText = document.querySelector('.sp-detail-description__btn-opening');

    [...tabs].forEach(tab => {

        tab.addEventListener('click', handlerClickTab)
    })

    btnOpenText.addEventListener('click', handlerClickOpenTextBtn)

    function handlerClickTab(e) {

        [...tabs].forEach(tab => {

            tab.classList.remove(ACTIVE_TAB_CLASS);
        })

        this.classList.add(ACTIVE_TAB_CLASS)

        setActiveDescription(this.dataset.tabName);
    }

    function handlerClickOpenTextBtn(e) {

        console.log(this.previousElementSibling.style, this.previousElementSibling.scrollHeight)

        this.previousElementSibling.style.height = this.previousElementSibling.scrollHeight + "px";
        this.closest('.sp-detail-description__content').classList.remove('sp-detail-description__content--semi-hidden');

        this.remove()
    }

    function setActiveDescription(dataAttribute) {

        [...content].forEach(element => {

            (element.classList.contains(dataAttribute)) ?
                element.classList.add(ACTIVE_CONTENT_CLASS) :
                element.classList.remove(ACTIVE_CONTENT_CLASS)

        })

    }



})(document.querySelector('.sp-product-story__detail-description'))