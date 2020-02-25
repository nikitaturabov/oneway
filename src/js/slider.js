(function (slider) {

    if (!slider) {
        return;
    }

    const btnPrev = slider.querySelector(".sp-slider__navi-btn--prev"),
        btnNext = slider.querySelector(".sp-slider__navi-btn--next"),
        slideItems = slider.querySelectorAll(".sp-slider__item"),
        ACTIVE_CLASS_SLIDER = 'sp-slider__item--active';

    //события на кнопки переключения слайдов
    btnNext.addEventListener('click', handlerBtnNext);
    btnPrev.addEventListener('click', handlerBtnNext);

    //callback событий кнопок переключения
    function handlerBtnNext(e) {

        (this.dataset.way === "next") ? toggleSlide([...slideItems]) :
            (this.dataset.way === "prev") ? toggleSlide([...slideItems].reverse()) : '';
    }

    //переключение слайдов
    function toggleSlide(arrayPhoto) {

        let index = arrayPhoto.findIndex(element => element.classList.contains(ACTIVE_CLASS_SLIDER))
        arrayPhoto[index].classList.remove(ACTIVE_CLASS_SLIDER);

        (arrayPhoto[index + 1]) ?
            arrayPhoto[index + 1].classList.add(ACTIVE_CLASS_SLIDER) :
            arrayPhoto[0].classList.add(ACTIVE_CLASS_SLIDER);
    }


    (function (colorChoice) {

        if (!colorChoice) {

            return;
        }

        const colorBtns = colorChoice.querySelectorAll(".sp-colors__item"),
            images = document.querySelectorAll(".sp-slider__img"),
            ERROR_CLASS = 'sp-colors__item--error',
            ACTIVE_CLASS_COLOR = 'sp-colors__item--active';

        //весим события на все возможные кнопки с цветами товаров
        [...colorBtns].forEach(btn => {

            btn.addEventListener('click', handlerChoiceColor)
        })

        //обработчик события выбора цвета
        function handlerChoiceColor(e) {

            e.stopPropagation();

            //узнаем индекс первой фото с соотв цветом
            let index = [...images].findIndex(element => element.dataset.color === this.dataset.color);

            (index === -1) ?
                viewTooltipWithWrong.call(this) :
                setActiveColor.call(this, index);
        }

        //показываем tooltip с предупреждением, если товара такого цвета не существует
        function viewTooltipWithWrong() {

            this.classList.add(ERROR_CLASS);
            setTimeout(() => this.classList.remove(ERROR_CLASS), 5000)
        }

        //выделяем нужный цвет черной рамкой и показываем в слайдере первое фото, соответсв цвету
        function setActiveColor(index) {

            [...colorBtns].forEach(btn => {

                btn.classList.remove(ACTIVE_CLASS_COLOR, ERROR_CLASS)
            })

            this.classList.add(ACTIVE_CLASS_COLOR);

            slideItems.forEach(item => {

                item.classList.remove('sp-slider__item--active');
            })

            images[index].parentNode.classList.add('sp-slider__item--active');
        }

    })(document.querySelector('.sp-colors'))

})(document.querySelector('.sp-slider'))