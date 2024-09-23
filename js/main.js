'use strict'




document.addEventListener('DOMContentLoaded', function () {

    // menu burger
    try {
        function burger() {
            const burger = document.querySelector('.header__burger')
            const burgerLine = document.querySelectorAll('.header__line')
            const popupMob = document.querySelector('.header__popup-mob')


            let isAnimating = false;

            burger.addEventListener('click', () => {
                if (isAnimating) {
                    return;
                }
                isAnimating = true;

                burger.classList.toggle('cross-js')
                popupMob.classList.toggle('active')
                burgerLine.forEach((line) => {
                    //анимация перекрещивания меню бургер
                    line.classList.toggle('cross-js')
                    setTimeout(() => {
                        //анимация переворота меню бургер
                        line.classList.toggle('helicopter-js')
                        isAnimating = false;
                    }, 500);
                })
            })
            burger.addEventListener('click', () => {
                if (burger.classList.contains('cross-js') !== true) {
                    burgerLine.forEach((line) => {
                        line.classList.remove('cross-js')

                    })
                }
            })

        }

        if (window.matchMedia("(max-width: 767px)").matches) {
            burger()
        }

        // слайдер в мобильной версии
        if (window.matchMedia("(max-width: 767px)").matches) {
            function initWishSwiper() {
                new Swiper(".services__swiper", {
                    autoplay: true,
                    loop: true,
                    centeredSlides: true,
                    slidesPerView: 1.4,
                    spaceBetween: 20,
                    fadeEffect: {
                        crossFade: true,
                    },
                });
            }
            initWishSwiper()
        }

    } catch (err) {
        console.log(err);

    }


    // Выпадающий список
    try {
        document.querySelectorAll('.faq__question').forEach(item => {
            item.addEventListener('click', () => {

                const arrow = item;
                const content = item.nextElementSibling;


                if (content.style.maxHeight) {
                    document.querySelectorAll('.faq__text').forEach(item => {
                        item.style.maxHeight = null;
                        item.style.opacity = null;
                    })
                    document.querySelectorAll('.faq__question').forEach(item => {
                        item.classList.remove('_active');
                    })
                } else {
                    document.querySelectorAll('.faq__text').forEach(item => {
                        item.style.maxHeight = null;
                        item.style.opacity = null;
                    })
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = 1;

                    document.querySelectorAll('.faq__question').forEach(item => {
                        item.classList.remove('_active');
                    })
                    arrow.classList.add('_active');
                }
            })
        })

    } catch (err) {
        console.log(err);
    }

    // Форма
    try {
        // Отбивка в случае отправки данных из формы
        const closeMain = document.querySelector('.pop-up-order__close');
        const popUpMain = document.querySelector('.pop-up-order');
        const backgroundMain = document.querySelector('.pop-up-background');
        const popUpNumber = document.querySelector('.pop-up-order__number');

        const popUp = document.querySelector('.pop-up-wrapper');

        function popUpIsOpen(id) {
            popUpMain.classList.add('_active')
            backgroundMain.classList.add('_active')
            popUpNumber.innerHTML = id
        }

        closeMain.addEventListener('click', () => {
            popUpMain.classList.remove('_active')
            backgroundMain.classList.remove('_active')
        });

        // При нажатии на задний фон закрыввается окно
        backgroundMain.addEventListener('mousedown', () => {
            popUpMain.classList.remove('_active')
            backgroundMain.classList.remove('_active')
            popUp.classList.remove('_active')

        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                popUpMain.classList.remove('_active')
                backgroundMain.classList.remove('_active')
            }
        });


        // сама форма
        const form = document.getElementById('form')
        const formWrapper = document.querySelector('.form__wrapper')

        // заглушка во время отправки данных формы
        function sending() {
            form.reset()
            form.classList.remove('_sending')
            formWrapper.classList.remove('_sending')
        }
        
        form.addEventListener('submit', formSend)


        async function formSend(e) {
            e.preventDefault()

            let error = formValidate(form)


            if (error === 0) {
                form.classList.add('_sending')
                formWrapper.classList.add('_sending')
                let formData = new FormData(form);

                fetch('/post.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                    'Access-Control-Allow-Origin': "*"
                    }
                })
                    .then(res => {
                        sending()
                        return res.json()
                    })

                    .then(data => {
                        popUpIsOpen(data.id)
                    })

                    .catch(err => {
                        console.log(err);
                    })

            }
        }



        function formValidate(form) {
            let error = 0
            let formReq = document.querySelectorAll('._req')

            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index]
                formRemoveError(input)

                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input)
                        error++
                    }
                } else if (
                    input.getAttribute('type') === 'checkbox' &&
                    input.checked === false
                ) {

                    formAddError(input)
                    error++
                } else if (input.classList.contains('_phone')) {
                    validatePhoneNumberInput(input)
                    if (!phoneTest(input)) {
                        formAddError(input)
                        error++
                    }
                }
                else {
                    if (input.value === '') {

                        formAddError(input)
                        error++
                    }
                }

            }
            return error

        }


        function formAddError(input) {
            input.parentElement.classList.add('_error')
            input.classList.add('_error')
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove('_error')
            input.classList.remove('_error')
        }
        function phoneTest(input) {
            return /\d{4}/.test(input.value)
        }
        function validatePhoneNumberInput(input) {
            // Удаление всех символов, кроме цифр
            input.value = input.value.replace(/\D/g, '');
        }
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
        }


    } catch (err) {
        console.log(err);
    }


    // плавная прокрутка
    try {


        const formSmooth = document.getElementById('form-wrap');
        const btnSmooth = document.getElementById('description-button');

        function mainScrolling() {
            formSmooth.scrollIntoView({ behavior: "smooth" });
        }

        btnSmooth.addEventListener("click", mainScrolling);

    } catch (err) {
        console.log(err);
    }


    // Выпадающее меню выбора города
    try {
        const selectSingle = document.querySelector('.__select');
        const selectSingle_title = selectSingle.querySelector('.__select__title');
        const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
        const documentBody = document.body;

        documentBody.addEventListener('click', function (event) {
            let isClickInsideBlock = selectSingle.contains(event.target);

            if (!isClickInsideBlock) {
                selectSingle.setAttribute('data-state', '');
            }
        });

        // Toggle menu
        selectSingle_title.addEventListener('click', () => {
            if ('active' === selectSingle.getAttribute('data-state')) {
                selectSingle.setAttribute('data-state', '');
            } else {
                selectSingle.setAttribute('data-state', 'active');
            }
        });

        // Close when click to option
        for (let i = 0; i < selectSingle_labels.length; i++) {
            selectSingle_labels[i].addEventListener('click', (evt) => {
                selectSingle_title.textContent = evt.target.textContent;
                selectSingle.setAttribute('data-state', '');
            });
        }

    } catch (err) {
        console.log(err);
    }


    // Мобильная версия — выпадающего меню выбора города 
    try {
        const selectSingleMob = document.querySelector('.__select-mob');
        const selectSingle_titleMob = selectSingleMob.querySelector('.__select__title-mob');
        const selectSingle_labelsMob = selectSingleMob.querySelectorAll('.__select__label-mob');
        const documentBody = document.body;

        documentBody.addEventListener('click', function (event) {
            let isClickInsideBlock = selectSingleMob.contains(event.target);

            if (!isClickInsideBlock) {
                selectSingleMob.setAttribute('data-state-mob', '');
            }
        });


        // Toggle menu
        selectSingle_titleMob.addEventListener('click', () => {
            if ('active' === selectSingleMob.getAttribute('data-state-mob')) {
                selectSingleMob.setAttribute('data-state-mob', '');
            } else {
                selectSingleMob.setAttribute('data-state-mob', 'active');
            }
        });

        // Close when click to option
        for (let i = 0; i < selectSingle_labelsMob.length; i++) {
            selectSingle_labelsMob[i].addEventListener('click', (evt) => {
                selectSingle_titleMob.textContent = evt.target.textContent;
                selectSingleMob.setAttribute('data-state-mob', '');
            });
        }

    } catch (err) {
        console.log(err);
    }

    try {

    } catch (error) {
        console.log(err);
    }

    // действет на странице about.html
    // try {
    //     const aboutButton = document.querySelector('.pop-up-form__button');
    //     aboutButton.addEventListener('click', () => {
    //         backgroundMain.classList.remove('_active')
    //     });

    // } catch (error) {
    //     console.log(err);
    // }

})



