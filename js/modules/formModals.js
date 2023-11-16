
class FormModals {
    constructor(parent, btn, hide){
        this.parent = document.querySelector(parent);
        this.items = Array.from(this.parent.children).slice(1,7);
        this.main = [this.items[0], this.items[2], this.items[4]];
        this.wrappers = [this.items[1], this.items[3], this.items[5]];
        this.modals = []
        for (let num of [1,3,5]){
            let modal = this.items[num].querySelector('.intro__dropdown');
            if(!modal){
                modal = this.items[num].querySelector('.intro__calendar');
            }
            this.modals.push(modal);
        }
        this.selectedDay = null;
        this.btn = this.parent.querySelector(btn);
        this.hide = document.querySelector(hide);
    }

    closeModals = () => {
        this.wrappers.forEach((wrapper, index)=>{
            wrapper.style.display = 'none';
            wrapper.classList.remove('animate-smallheight');
            this.main[index].classList.remove('intro__select-item-chosed');
            this.main[index].querySelector('img').classList.remove('animate-rotate-arrow');
        });
    }

    closeCurrentModal = (element, modal, arrow, i) => {
        element.classList.remove('intro__select-item-chosed');
        //modal
        modal.classList.remove('animate-showform');
        modal.classList.add('animate-closeform');
        this.wrappers[i].classList.add('animate-smallheight');
        //arrow
        arrow.classList.add('animate-rotate-arrow-back');
        arrow.classList.remove('animate-rotate-arrow');
    }

    closeByClick = () => {
        for (let i=0; i< 3; i++){
            let element = this.main[i];
            let arrow = element.querySelector('img');
            let modal = this.modals[i];
            element.classList.remove('intro__select-item-chosed');
            //modal
            modal.classList.remove('animate-showform');
            modal.classList.add('animate-closeform');
            this.wrappers[i].classList.add('animate-smallheight');
            //arrow
            if (arrow.classList.contains('animate-rotate-arrow')){
                arrow.classList.add('animate-rotate-arrow-back');
                arrow.classList.remove('animate-rotate-arrow');
            }
        }
    }

    getAllMonthDays = (year, monthNum) => {
        return 33 - new Date(year, monthNum, 33).getDate();
    }

    prepareBlock = (calendar, monthNum, year, isFirst) => {
        const today = new Date(year, monthNum, 1);
        const allDays = this.getAllMonthDays(year, monthNum);
        const block = document.createElement('div');
        block.classList.add('calendar__block');
        calendar.append(block);
        const monthBlock = document.createElement('p');
        monthBlock.classList.add('calendar__month');
        monthBlock.textContent = today.toLocaleDateString('en-us', { month:"long"});
        monthBlock.setAttribute('data-month', monthNum);
        if (monthNum == 0 && year > new Date().getFullYear()){
            monthBlock.textContent += ` ${year}`
        }
        block.append(monthBlock);
        const daysBlock = document.createElement('div');
        daysBlock.classList.add('calendar__days');
        const weekDays = {'0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', 
                            '4': 'Thursday', '5': 'Friday', '6': 'Saturday'};
        const firstDayName = today.toLocaleDateString('en-us', { weekday:"long"});
        let prepareDayNumber = 0;
        while (weekDays[String(prepareDayNumber)] != firstDayName){
            let empty = document.createElement('div');
            empty.classList.add('calendar__day');
            daysBlock.append(empty);
            prepareDayNumber +=1;
        }
        let dayToday;
        if (isFirst){
            dayToday = new Date().getDate();
        }
        for (let i = 1; i <= allDays; i ++){
            let filledDay = document.createElement('div');
            filledDay.classList.add('calendar__day');
            if (isFirst){
                if (dayToday > i){
                    filledDay.classList.add('calendar__past-day');
                } else{
                    filledDay.classList.add('calendar__day-filled');
                }
            }else{
                filledDay.classList.add('calendar__day-filled');
            }
            filledDay.textContent = i;
            daysBlock.append(filledDay);
        }
        block.append(daysBlock);
    }

    createCalendar = () => {
        const calendar = this.modals[2];
        const today = new Date();
        let month = today.getMonth()-1;
        let year = today.getFullYear();
        for (let monthNum = 0; monthNum < 12; monthNum ++){
            month += 1;
            if (month>= 12){
                month = 0;
                year += 1;
            }
            if (monthNum == 0 && year == today.getFullYear()){
                this.prepareBlock(calendar, month, year, true);
            } else{
                this.prepareBlock(calendar, month, year, false);
            }
        }
        
    }

    bindSelectDay = () => {
        this.modals[2].addEventListener('click', (e) => {
            let target = e.target;
            if (target.classList.contains('calendar__day-filled')){
                if (this.selectedDay){
                    this.selectedDay.classList.remove('selected-dropdown');
                    this.selectedDay = target;
                }else{
                    this.selectedDay = target;
                }
                target.classList.add('selected-dropdown');
                const day = e.target.textContent;
                const monthBlock = e.target.parentNode.previousSibling;
                const month = monthBlock.textContent.split(' ')[0].slice(0, 3);
                const monthNum = monthBlock.getAttribute('data-month');
                let year;
                const today = new Date();
                if (monthNum >= today.getMonth()){
                    year = today.getFullYear();
                }else{
                    year = today.getFullYear() + 1;
                }
                this.main[2].querySelector('.intro__select-data').textContent = `${day} ${month} ${year}`;

                this.closeCurrentModal(this.main[2], this.modals[2], this.main[2].querySelector('img'), 2);
            }
        });
    }

    setToday= () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.toLocaleDateString('en-us', { month:"long"}).slice(0, 3);
        const year = today.getFullYear();
        this.main[2].querySelector('.intro__select-data').textContent = `${day} ${month} ${year}`;
        this.selectedDay = this.modals[2].querySelector('.calendar__day-filled');
        this.selectedDay.classList.add('selected-dropdown');
    }

    makeMessage = () => {
        const infoBlock = document.querySelector('.intro__receive-message .red');
        const locationInfo = this.main[0].querySelector('.intro__select-data').textContent;
        const typeInfo = this.main[1].querySelector('.intro__select-data').textContent;
        const dateInfo = this.main[2].querySelector('.intro__select-data').textContent;
        infoBlock.textContent = `${typeInfo} in ${locationInfo} for ${dateInfo}.`;
    }

    bindBtn = () => {
        const delayTime = 4000;
        this.btn.addEventListener('click', () => {
            this.closeByClick();
            this.makeMessage();
            this.parent.parentNode.style.overflow = 'hidden';
            this.hide.style.display = 'block';

            this.parent.animate([
                {bottom: '-459px'}
            ], {duration: 700, easing: 'ease', fill: 'forwards'});

            this.hide.animate([
                {top: '0'}
            ], {duration: 700, easing: 'ease', fill: 'forwards'});
            
            this.hideAnimation = this.hide.animate([
                {top: '-459px'}
            ], {duration: 700, easing: 'ease', fill: 'forwards', delay: delayTime});
            this.parentAnimation = this.parent.animate([
                {bottom: '0'}
            ], {duration: 700, easing: 'ease', fill: 'forwards', delay: delayTime});
            this.parentAnimation.addEventListener('finish', () => {
                this.hide.style.display = 'none';
                this.parent.parentNode.style.overflow = 'visible';
            });
        });

        this.hide.addEventListener('mouseenter', () => {
            if (this.hideAnimation.currentTime < delayTime){
                this.hideAnimation.pause();
                this.parentAnimation.pause();
            }
        });
        this.hide.addEventListener('mouseleave', () => {
            this.hideAnimation.play();
            this.parentAnimation.play();
        });
    }

    init(){      
        for (let i=0; i< 3; i++){
            let element = this.main[i];
            let arrow = element.querySelector('img');
            let modal = this.modals[i];
            element.addEventListener('click', ()=>{
                if (element.classList.contains('intro__select-item-chosed')){
                    this.closeCurrentModal(element, modal, arrow, i);
                } else{
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
            if (i<2){
                let children = Array.from(modal.children);
                children.forEach(item=>{
                    item.addEventListener('click', ()=>{
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

        document.body.addEventListener('click', (e)=>{
            if(this.parent != e.target && !this.parent.contains(e.target)){ // содержит ли дочерний блок
                this.closeByClick();
            }
        });
    }
}

export default FormModals;