(function (subscribe) {

    if (!subscribe) {
        return;
    }

    //отправляем данные из формы
    subscribe.addEventListener("submit", (e) => {

        e.preventDefault()

        let inputEmail = subscribe.querySelector('.sp-subscribe__email-input');

        let promise = fetch(subscribe.action, {
            method: subscribe.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${inputEmail.value}`
        })

        promise.then(response => response.json()).then(emails => {

            if (emails.email == inputEmail.value) {

                alert("Спасибо, что подписались на нашу рассылку");
                inputEmail.value = "";
            }
            else {

                alert("Произошла ошибка")
            }
        }).catch(err => console.log(`Произошла ошибка ${err}`))
    })

})(document.querySelector('.sp-subscribe'))