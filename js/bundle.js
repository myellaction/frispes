/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/easySlider.js":
/*!**************************************!*\
  !*** ./src/js/modules/easySlider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class EasySlider {
  constructor(listBlock, images, activeClassSpan) {
    this.listBlock = document.querySelector(listBlock);
    this.images = document.querySelector(images);
    this.slideIndex = 3;
    this.activeClassSpan = activeClassSpan;
  }
  clearAllSpans = () => {
    Array.from(this.listBlock.children).forEach(item => {
      item.querySelector('span').classList.remove(this.activeClassSpan);
    });
  };
  init() {
    this.images.children[this.slideIndex - 1].style.top = '0px';
    Array.from(this.listBlock.children).forEach((item, index) => {
      item.addEventListener('click', () => {
        if (this.slideIndex - 1 != index && !this.animation) {
          this.clearAllSpans();
          item.querySelector('span').classList.add(this.activeClassSpan);
          this.images.children[this.slideIndex - 1].style.top = '453px';
          this.images.children[index].style.transition = 'all 0.7s ease';
          this.images.children[index].style.top = '0px';
          this.animation = setTimeout(() => {
            this.images.children[this.slideIndex - 1].style.transition = 'all 0s ease';
            this.images.children[this.slideIndex - 1].style.top = '-453px';
            this.slideIndex = index + 1;
            this.animation = null;
          }, 700);
        }
      });
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EasySlider);

/***/ }),

/***/ "./src/js/modules/formModals.js":
/*!**************************************!*\
  !*** ./src/js/modules/formModals.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class FormModals {
  constructor(parent, btn, hide) {
    this.parent = document.querySelector(parent);
    this.items = Array.from(this.parent.children).slice(1, 7);
    this.main = [this.items[0], this.items[2], this.items[4]];
    this.wrappers = [this.items[1], this.items[3], this.items[5]];
    this.modals = [];
    for (let num of [1, 3, 5]) {
      let modal = this.items[num].querySelector('.intro__dropdown');
      if (!modal) {
        modal = this.items[num].querySelector('.intro__calendar');
      }
      this.modals.push(modal);
    }
    this.selectedDay = null;
    this.btn = this.parent.querySelector(btn);
    this.hide = document.querySelector(hide);
  }
  closeModals = () => {
    this.wrappers.forEach((wrapper, index) => {
      wrapper.style.display = 'none';
      wrapper.classList.remove('animate-smallheight');
      this.main[index].classList.remove('intro__select-item-chosed');
      this.main[index].querySelector('img').classList.remove('animate-rotate-arrow');
    });
  };
  closeCurrentModal = (element, modal, arrow, i) => {
    element.classList.remove('intro__select-item-chosed');
    //modal
    modal.classList.remove('animate-showform');
    modal.classList.add('animate-closeform');
    this.wrappers[i].classList.add('animate-smallheight');
    //arrow
    arrow.classList.add('animate-rotate-arrow-back');
    arrow.classList.remove('animate-rotate-arrow');
  };
  closeByClick = () => {
    for (let i = 0; i < 3; i++) {
      let element = this.main[i];
      let arrow = element.querySelector('img');
      let modal = this.modals[i];
      element.classList.remove('intro__select-item-chosed');
      //modal
      modal.classList.remove('animate-showform');
      modal.classList.add('animate-closeform');
      this.wrappers[i].classList.add('animate-smallheight');
      //arrow
      if (arrow.classList.contains('animate-rotate-arrow')) {
        arrow.classList.add('animate-rotate-arrow-back');
        arrow.classList.remove('animate-rotate-arrow');
      }
    }
  };
  getAllMonthDays = (year, monthNum) => {
    return 33 - new Date(year, monthNum, 33).getDate();
  };
  prepareBlock = (calendar, monthNum, year, isFirst) => {
    const today = new Date(year, monthNum, 1);
    const allDays = this.getAllMonthDays(year, monthNum);
    const block = document.createElement('div');
    block.classList.add('calendar__block');
    calendar.append(block);
    const monthBlock = document.createElement('p');
    monthBlock.classList.add('calendar__month');
    monthBlock.textContent = today.toLocaleDateString('en-us', {
      month: "long"
    });
    monthBlock.setAttribute('data-month', monthNum);
    if (monthNum == 0 && year > new Date().getFullYear()) {
      monthBlock.textContent += ` ${year}`;
    }
    block.append(monthBlock);
    const daysBlock = document.createElement('div');
    daysBlock.classList.add('calendar__days');
    const weekDays = {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday'
    };
    const firstDayName = today.toLocaleDateString('en-us', {
      weekday: "long"
    });
    let prepareDayNumber = 0;
    while (weekDays[String(prepareDayNumber)] != firstDayName) {
      let empty = document.createElement('div');
      empty.classList.add('calendar__day');
      daysBlock.append(empty);
      prepareDayNumber += 1;
    }
    let dayToday;
    if (isFirst) {
      dayToday = new Date().getDate();
    }
    for (let i = 1; i <= allDays; i++) {
      let filledDay = document.createElement('div');
      filledDay.classList.add('calendar__day');
      if (isFirst) {
        if (dayToday > i) {
          filledDay.classList.add('calendar__past-day');
        } else {
          filledDay.classList.add('calendar__day-filled');
        }
      } else {
        filledDay.classList.add('calendar__day-filled');
      }
      filledDay.textContent = i;
      daysBlock.append(filledDay);
    }
    block.append(daysBlock);
  };
  createCalendar = () => {
    const calendar = this.modals[2];
    const today = new Date();
    let month = today.getMonth() - 1;
    let year = today.getFullYear();
    for (let monthNum = 0; monthNum < 12; monthNum++) {
      month += 1;
      if (month >= 12) {
        month = 0;
        year += 1;
      }
      if (monthNum == 0 && year == today.getFullYear()) {
        this.prepareBlock(calendar, month, year, true);
      } else {
        this.prepareBlock(calendar, month, year, false);
      }
    }
  };
  bindSelectDay = () => {
    this.modals[2].addEventListener('click', e => {
      let target = e.target;
      if (target.classList.contains('calendar__day-filled')) {
        if (this.selectedDay) {
          this.selectedDay.classList.remove('selected-dropdown');
          this.selectedDay = target;
        } else {
          this.selectedDay = target;
        }
        target.classList.add('selected-dropdown');
        const day = e.target.textContent;
        const monthBlock = e.target.parentNode.previousSibling;
        const month = monthBlock.textContent.split(' ')[0].slice(0, 3);
        const monthNum = monthBlock.getAttribute('data-month');
        let year;
        const today = new Date();
        if (monthNum >= today.getMonth()) {
          year = today.getFullYear();
        } else {
          year = today.getFullYear() + 1;
        }
        this.main[2].querySelector('.intro__select-data').textContent = `${day} ${month} ${year}`;
        this.closeCurrentModal(this.main[2], this.modals[2], this.main[2].querySelector('img'), 2);
      }
    });
  };
  setToday = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleDateString('en-us', {
      month: "long"
    }).slice(0, 3);
    const year = today.getFullYear();
    this.main[2].querySelector('.intro__select-data').textContent = `${day} ${month} ${year}`;
    this.selectedDay = this.modals[2].querySelector('.calendar__day-filled');
    this.selectedDay.classList.add('selected-dropdown');
  };
  makeMessage = () => {
    const infoBlock = document.querySelector('.intro__receive-message .red');
    const locationInfo = this.main[0].querySelector('.intro__select-data').textContent;
    const typeInfo = this.main[1].querySelector('.intro__select-data').textContent;
    const dateInfo = this.main[2].querySelector('.intro__select-data').textContent;
    infoBlock.textContent = `${typeInfo} in ${locationInfo} for ${dateInfo}.`;
  };
  bindBtn = () => {
    const delayTime = 4000;
    this.btn.addEventListener('click', () => {
      this.closeByClick();
      this.makeMessage();
      this.parent.parentNode.style.overflow = 'hidden';
      this.hide.style.display = 'block';
      this.parent.animate([{
        bottom: '-459px'
      }], {
        duration: 700,
        easing: 'ease',
        fill: 'forwards'
      });
      this.hide.animate([{
        top: '0'
      }], {
        duration: 700,
        easing: 'ease',
        fill: 'forwards'
      });
      this.hideAnimation = this.hide.animate([{
        top: '-459px'
      }], {
        duration: 700,
        easing: 'ease',
        fill: 'forwards',
        delay: delayTime
      });
      this.parentAnimation = this.parent.animate([{
        bottom: '0'
      }], {
        duration: 700,
        easing: 'ease',
        fill: 'forwards',
        delay: delayTime
      });
      this.parentAnimation.addEventListener('finish', () => {
        this.hide.style.display = 'none';
        this.parent.parentNode.style.overflow = 'visible';
      });
    });
    this.hide.addEventListener('mouseenter', () => {
      if (this.hideAnimation.currentTime < delayTime) {
        this.hideAnimation.pause();
        this.parentAnimation.pause();
      }
    });
    this.hide.addEventListener('mouseleave', () => {
      this.hideAnimation.play();
      this.parentAnimation.play();
    });
  };
  init() {
    for (let i = 0; i < 3; i++) {
      let element = this.main[i];
      let arrow = element.querySelector('img');
      let modal = this.modals[i];
      element.addEventListener('click', () => {
        if (element.classList.contains('intro__select-item-chosed')) {
          this.closeCurrentModal(element, modal, arrow, i);
        } else {
          this.closeModals();
          //arrow
          arrow.classList.remove('animate-rotate-arrow-back');
          arrow.classList.add('animate-rotate-arrow');
          this.wrappers[i].style.display = 'block';
          element.classList.add('intro__select-item-chosed');
          modal.classList.remove('animate-closeform');
          modal.classList.add('animate-showform');
        }
      });
      if (i < 2) {
        let children = Array.from(modal.children);
        children.forEach(item => {
          item.addEventListener('click', () => {
            let dropdownItem = item.querySelector('.dropdown-text');
            element.querySelector('.intro__select-data').textContent = dropdownItem.textContent;
            this.closeCurrentModal(element, modal, arrow, i);
            children.forEach(child => {
              child.querySelector('.dropdown-text').classList.remove('selected-dropdown');
            });
            dropdownItem.classList.add('selected-dropdown');
          });
        });
      }
    }
    this.createCalendar();
    this.setToday();
    this.bindSelectDay();
    this.bindBtn();
    document.body.addEventListener('click', e => {
      if (this.parent != e.target && !this.parent.contains(e.target)) {
        // содержит ли дочерний блок
        this.closeByClick();
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormModals);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ShowModal {
  constructor(btn, modal, type, change) {
    this.btn = document.querySelector(btn);
    this.modal = document.querySelector(modal);
    this.type = type;
    this.register = this.modal.querySelector('.register');
    this.loginRegister = this.modal.querySelector('.login-register');
    this.bg = this.modal.querySelector('.modal');
    this.change = this.modal.querySelector(change);
  }
  init() {
    this.btn.addEventListener('click', () => {
      if (this.type == 'register') {
        this.register.style.transition = 'right 0.8s ease-out';
        this.register.style.right = 0;
        this.loginRegister.style.height = '530px';
        this.modal.querySelector('.login').style.opacity = '0';
        document.querySelector('.register__hide').style.display = 'none';
      } else {
        this.modal.querySelector('.login').style.opacity = 1;
      }
      this.modal.style.display = 'flex';
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px'; // Ширина с полосой прокрутки и без нее
      document.body.style.overflow = 'hidden';
      this.loginRegister.classList.add('active-modal');
    });
    this.bg.addEventListener('click', () => {
      this.modal.style.display = 'none';
      document.body.style.paddingRight = 0;
      document.body.style.overflow = '';
      if (this.type == 'register') {
        this.loginRegister.style.height = '400px';
        this.register.style.right = '-500px';
        this.modal.querySelector('.login').style.opacity = '1';
      }
      if (this.type == 'login') {
        document.querySelector('.register__lines').classList.remove('register__hide-lines');
        document.querySelector('.register__hide').style.display = '';
        this.register.style.right = '-500px';
        this.loginRegister.style.height = '400px';
        this.modal.querySelector('.login').style.opacity = '1';
      }
      if (this.hideTimeout) {
        clearInterval(this.hideTimeout);
      }
    });
    this.change.addEventListener('click', e => {
      if (this.type == 'login') {
        setTimeout(() => {
          this.register.style.transition = 'none';
          document.querySelector('.register__hide').style.display = 'none';
          this.register.style.right = '-485px';
          this.register.style.transition = 'right 0.8s ease-out';
          this.register.style.right = '0px';
          this.loginRegister.style.height = '530px';
          this.modal.querySelector('.login').style.transition = 'opacity 0s ease 0.8s';
          this.modal.querySelector('.login').style.opacity = '0';
        }, 100);
      } else {
        this.register.style.right = '-500px';
        this.modal.querySelector('.login').style.transition = 'none';
        this.modal.querySelector('.login').style.opacity = '1';
        this.loginRegister.style.transition = 'height 0.4s ease';
        this.loginRegister.style.height = '400px';
        this.hideTimeout = setTimeout(() => {
          document.querySelector('.register__hide').style.display = '';
          document.querySelector('.register__lines').classList.remove('register__hide-lines');
          this.loginRegister.style.transition = 'none';
        }, 800);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShowModal);

/***/ }),

/***/ "./src/js/modules/moveAnimation.js":
/*!*****************************************!*\
  !*** ./src/js/modules/moveAnimation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MoveAnimation {
  constructor(leftPart, rightPart) {
    this.leftPart = document.querySelector(leftPart);
    this.rightPart = document.querySelector(rightPart);
  }
  init() {
    this.leftPart.style.transition = 'all 1s ease';
    this.rightPart.style.transition = 'all 1.5s ease';
    this.leftPart.style.left = '0';
    this.leftPart.style.opacity = '1';
    this.rightPart.style.right = '0';
    this.rightPart.style.opacity = '1';
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoveAnimation);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Slider {
  constructor(section, parent, leftArrow, rightArrow, width, linesBlock, numBlock, count = 1) {
    this.section = document.querySelector(section);
    this.parent = document.querySelector(parent);
    this.leftArrow = this.section.querySelector(leftArrow);
    this.rightArrow = this.section.querySelector(rightArrow);
    this.width = width;
    this.lines = this.section.querySelector(linesBlock);
    this.numBlock = this.section.querySelector(numBlock);
    this.duration = 800;
    this.slideIndex = 1;
    this.maxSlides = this.parent.children.length / count;
  }
  changeArrow(direction, active) {
    if (direction == 'left') {
      const image = this.leftArrow.children[0];
      if (active) {
        image.setAttribute('src', 'icons/left-arrow-active.svg');
      } else {
        image.setAttribute('src', 'icons/left-arrow.svg');
      }
    } else {
      const image = this.rightArrow.children[0];
      if (active) {
        image.setAttribute('src', 'icons/right-arrow.svg');
      } else {
        image.setAttribute('src', 'icons/right-arrow-inactive.svg');
      }
    }
  }
  setCurrentLine = () => {
    Array.from(this.lines.children).forEach((item, index) => {
      if (index == this.slideIndex - 1) {
        item.classList.add('space__slider-icon-selected');
      } else {
        item.classList.remove('space__slider-icon-selected');
      }
    });
    this.numBlock.querySelector('.space__num-start').textContent = String(this.slideIndex).padStart(2, '0') + ' ';
  };
  checkArrow = direction => {
    if (direction == 'left') {
      if (this.slideIndex == 1) {
        this.changeArrow('left', false);
        this.leftArrow.classList.remove('space__active-arrow');
      }
      if (this.slideIndex < this.maxSlides && !this.rightArrow.classList.contains('space__active-arrow')) {
        this.changeArrow('right', true);
        this.rightArrow.classList.add('space__active-arrow');
      }
    } else if (direction == 'right') {
      if (this.slideIndex == this.maxSlides) {
        this.changeArrow('right', false);
        this.rightArrow.classList.remove('space__active-arrow');
      }
      if (this.slideIndex > 1 && !this.leftArrow.classList.contains('space__active-arrow')) {
        this.changeArrow('left', true);
        this.leftArrow.classList.add('space__active-arrow');
      }
    }
    this.setCurrentLine();
  };
  setLines = () => {
    Array.from(this.lines.children).forEach((item, index) => {
      item.addEventListener('click', () => {
        this.parent.animate([{
          transform: `translateX(-${this.width * index}px)`
        }], {
          duration: this.duration,
          easing: 'ease',
          fill: 'forwards'
        });
        let direction;
        if (this.slideIndex < index + 1) {
          direction = 'right';
        } else if (this.slideIndex > index + 1) {
          direction = 'left';
        } else {
          return;
        }
        this.slideIndex = index + 1;
        this.checkArrow(direction);
      });
    });
  };
  bindArrows = () => {
    this.leftArrow.addEventListener('click', () => {
      if (this.leftArrow.classList.contains('space__active-arrow')) {
        this.parent.animate([{
          transform: `translateX(-${this.width * (this.slideIndex - 1) - this.width}px)`
        }], {
          duration: this.duration,
          easing: 'ease',
          fill: 'forwards'
        });
        this.slideIndex--;
        this.checkArrow('left');
      }
    });
    this.rightArrow.addEventListener('click', () => {
      if (this.rightArrow.classList.contains('space__active-arrow')) {
        this.parent.animate([{
          transform: `translateX(-${this.width * this.slideIndex}px)`
        }], {
          duration: this.duration,
          easing: 'ease',
          fill: 'forwards'
        });
        this.slideIndex++;
        this.checkArrow('right');
      }
    });
  };
  init() {
    this.bindArrows();
    this.setLines();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ }),

/***/ "./src/js/modules/smallSlider.js":
/*!***************************************!*\
  !*** ./src/js/modules/smallSlider.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class SmallSlider {
  constructor(section, parent, leftArrow, rightArrow, width, activeClass) {
    this.section = document.querySelector(section);
    this.parent = document.querySelector(parent);
    this.leftArrow = this.section.querySelector(leftArrow);
    this.rightArrow = this.section.querySelector(rightArrow);
    this.width = width;
    this.duration = 400;
    this.activeClass = activeClass;
    this.slideIndex = 1;
    this.animation = null;
  }
  changeImageClass = () => {
    Array.from(this.parent.children).forEach((item, index) => {});
  };
  prepareImages = () => {
    let offset = 0;
    this.parent.children[1].classList.add(this.activeClass);
    for (let i = 0; i < this.parent.children.length; i++) {
      if (this.parent.children[i].previousElementSibling && this.parent.children[i].previousElementSibling.classList.contains(this.activeClass)) {
        offset += 123;
      }
      this.parent.children[i].style.left = this.width * i - this.width + offset + 'px';
    }
  };
  makeRightStep = () => {
    let offset = 0;
    this.parent.children[1].classList.remove(this.activeClass);
    this.parent.children[2].classList.add(this.activeClass);
    for (let i = 0; i < this.parent.children.length; i++) {
      if (this.parent.children[i].previousElementSibling && this.parent.children[i].previousElementSibling.classList.contains(this.activeClass)) {
        offset += 123;
      }
      if (i == this.parent.children.length - 1) {
        this.parent.children[i].style.left = this.width * (i - 1) - this.width + offset + 'px';
        this.parent.children[i].style.transition = 'left 0.5s ease, opacity 0s ease 0.5s';
        this.parent.children[i].style.opacity = 1;
      } else {
        this.parent.children[i].style.left = this.width * (i - 1) - this.width + offset + 'px';
      }
    }
    let elem = this.parent.children[0];
    elem.style.transition = 'left 0.5s ease, opacity 0s ease 0s';
    elem.style.opacity = 0;
    this.parent.append(elem);
    this.animation = setTimeout(() => {
      this.animation = null;
    }, this.duration);
  };
  makeLeftStep = () => {
    let offset = 0;
    this.parent.children[1].classList.remove(this.activeClass);
    this.parent.children[0].classList.add(this.activeClass);
    for (let i = 0; i < this.parent.children.length; i++) {
      if (this.parent.children[i].previousElementSibling && this.parent.children[i].previousElementSibling.classList.contains(this.activeClass)) {
        offset += 123;
      }
      this.parent.children[i].style.left = this.width * (i + 1) - this.width + offset + 'px';
    }
    let elem = Array.from(this.parent.children).at(-1);
    elem.style.transition = 'left 0.5s ease, opacity 0s ease 0s';
    elem.style.opacity = 0;
    this.parent.prepend(elem);
    elem.style.left = -this.width + 'px';
    elem.style.opacity = 1;
    this.animation = setTimeout(() => {
      this.animation = null;
    }, this.duration);
  };
  init() {
    this.parent.style.cssText = `
            position: relative;
        `;
    this.prepareImages();

    //this.changeImageClass();
    this.rightArrow.addEventListener('click', () => {
      if (!this.animation) {
        this.makeRightStep();
      }
    });
    this.leftArrow.addEventListener('click', () => {
      if (!this.animation) {
        this.makeLeftStep();
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SmallSlider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_formModals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/formModals */ "./src/js/modules/formModals.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_smallSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/smallSlider */ "./src/js/modules/smallSlider.js");
/* harmony import */ var _modules_easySlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/easySlider */ "./src/js/modules/easySlider.js");
/* harmony import */ var _modules_moveAnimation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/moveAnimation */ "./src/js/modules/moveAnimation.js");








window.addEventListener('DOMContentLoaded', () => {
  new _modules_moveAnimation__WEBPACK_IMPORTED_MODULE_5__["default"]('.intro__wrapper-menu', '.intro__picture').init();
  new _modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"]('.nav__login', '.modal-login', 'login', '.register__hide').init();
  new _modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"]('.nav__singup', '.modal-login', 'register', '.register__title-close img').init();
  new _modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"]('.member__button', '.modal-login', 'register', '.register__title-close img').init();
  new _modules_formModals__WEBPACK_IMPORTED_MODULE_1__["default"]('.intro__menu', '.intro__menu .intro__button', '.intro__hide-menu').init();
  new _modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"]('.space', '.space__slides-block', '.space__left-arrow', '.space__right-arrow', 1200, '.space__slider-icons', '.space__slider-nums').init();
  new _modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"]('.reviews', '.reviews__slider', '.space__left-arrow', '.space__right-arrow', 1200, '.space__slider-icons', '.space__slider-nums', 3).init();
  new _modules_smallSlider__WEBPACK_IMPORTED_MODULE_3__["default"]('.gallery', '.gallery__slider-block', '.space__left-arrow', '.space__right-arrow', 352, 'gallery__slide-selected').init();
  new _modules_easySlider__WEBPACK_IMPORTED_MODULE_4__["default"]('.facilities__list', '.facilities__image-block', 'facilities__list-item-selected').init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map