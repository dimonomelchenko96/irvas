const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              calcModal= document.querySelector('.popup_calc'),
              calcModalProfile = document.querySelector('.popup_calc_profile'),
              scroll = calcScroll();
        // открытие модалки

        function calcValid(text, tar, errorCalcSelector) {
            let calcText = document.createElement('div');
            calcText.classList.add(errorCalcSelector.replace(/\./, ''));
            calcText.style.marginBottom = '20px';
            if (!document.querySelector(errorCalcSelector)) {
                calcText.innerText = text;
                tar.before(calcText);
            }            
        }
        
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                });         
                let target = e.target;

                if(target.classList.contains('popup_calc_button') && 
                ((parseInt(state.width) <= 500  || state.width === '') || 
                (parseInt(state.height) <= 500 || state.height === '') ? true : false )) {
                    calcModal.style.display = 'block';
                    calcValid('Введите ваши параметры(Минимальные размеры 500мм * 500мм)', target, '.calcErrorText');
                } else if(target.classList.contains('popup_calc_profile_button') && state.profile === undefined) {
                    calcModalProfile.style.display = 'block';
                    calcValid('Выберите все параметры', target, '.profileErrorText');
                } else{
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                }   
            });
        });

        // закрытие модалки
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });

        // клик по оверлею
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = '';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn','.popup_engineer','.popup_engineer .popup_close' );     
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;