'use strict';
import ShowModal from './modules/modals';
import FormModals from './modules/formModals';
import Slider from './modules/slider';
import SmallSlider from './modules/smallSlider';
import EasySlider from './modules/easySlider';
import MoveAnimation from './modules/moveAnimation';

window.addEventListener('DOMContentLoaded', ()=>{
    new MoveAnimation('.intro__wrapper-menu', '.intro__picture').init();

    new ShowModal('.nav__login', '.modal-login', 'login', '.register__hide').init();
    new ShowModal('.nav__singup', '.modal-login', 'register', '.register__title-close img').init();
    new ShowModal('.member__button', '.modal-login', 'register', '.register__title-close img').init();

    new FormModals('.intro__menu', '.intro__menu .intro__button', '.intro__hide-menu').init();

    new Slider('.space', '.space__slides-block', '.space__left-arrow', '.space__right-arrow', 1200, '.space__slider-icons', '.space__slider-nums').init();
    new Slider ('.reviews', '.reviews__slider', '.space__left-arrow', '.space__right-arrow', 1200, '.space__slider-icons', '.space__slider-nums', 3).init();
    new SmallSlider('.gallery', '.gallery__slider-block', '.space__left-arrow', '.space__right-arrow', 352, 'gallery__slide-selected').init();
    new EasySlider('.facilities__list', '.facilities__image-block', 'facilities__list-item-selected').init();

});




