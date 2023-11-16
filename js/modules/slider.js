class Slider{
    constructor(section, parent, leftArrow, rightArrow, width, linesBlock, numBlock, count=1){
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

    changeArrow(direction, active){
        if (direction == 'left'){
            const image = this.leftArrow.children[0];
            if (active){
                image.setAttribute('src', 'icons/left-arrow-active.svg');
            }else{
                image.setAttribute('src', 'icons/left-arrow.svg');
            }
        }else{
            const image = this.rightArrow.children[0];
            if (active){
                image.setAttribute('src', 'icons/right-arrow.svg');
            }else{
                image.setAttribute('src', 'icons/right-arrow-inactive.svg');
            }
        }
    }

    setCurrentLine = () => {
        Array.from(this.lines.children).forEach((item, index) => {
            if (index == this.slideIndex - 1){
                item.classList.add('space__slider-icon-selected');
            }else{
                item.classList.remove('space__slider-icon-selected');
            }
        })
        this.numBlock.querySelector('.space__num-start').textContent = String(this.slideIndex).padStart(2, '0') + ' ';
    }

    checkArrow = (direction) => {
        if (direction == 'left'){
            if (this.slideIndex == 1){
                this.changeArrow('left', false);
                this.leftArrow.classList.remove('space__active-arrow');
            }
            if (this.slideIndex < this.maxSlides && !this.rightArrow.classList.contains('space__active-arrow')){
                this.changeArrow('right', true);
                this.rightArrow.classList.add('space__active-arrow');
            }
        } else if (direction == 'right'){
            if (this.slideIndex == this.maxSlides){
                this.changeArrow('right', false);
                this.rightArrow.classList.remove('space__active-arrow');
            }
            if (this.slideIndex > 1 && !this.leftArrow.classList.contains('space__active-arrow')){
                this.changeArrow('left', true);
                this.leftArrow.classList.add('space__active-arrow');
            } 
        }

        this.setCurrentLine(); 



    }

    setLines = () => {
        Array.from(this.lines.children).forEach((item, index) => {
            item.addEventListener('click', () => {
                this.parent.animate([
                    {transform: `translateX(-${this.width*index}px)`}
                ], {duration: this.duration, easing: 'ease', fill: 'forwards'});
                let direction;
                if (this.slideIndex < index +1){
                    direction = 'right';
                } else if (this.slideIndex > index + 1){
                    direction = 'left';
                } else{
                    return
                }
                this.slideIndex = index + 1;
                this.checkArrow(direction);
                
            })
        })
    }

    bindArrows = () => {
        this.leftArrow.addEventListener('click', () => {
            if (this.leftArrow.classList.contains('space__active-arrow')){
                this.parent.animate([
                    {transform: `translateX(-${this.width*(this.slideIndex-1) - this.width}px)`}
                ], {duration: this.duration, easing: 'ease', fill: 'forwards'});
                this.slideIndex--;
                this.checkArrow('left');
            }
        });
        this.rightArrow.addEventListener('click', () => {
            if (this.rightArrow.classList.contains('space__active-arrow')){
                this.parent.animate([
                    {transform: `translateX(-${this.width*(this.slideIndex)}px)`}
                ], {duration: this.duration, easing: 'ease', fill: 'forwards'});
                this.slideIndex++;
                this.checkArrow('right');
            }

        });
    }

    init(){
        this.bindArrows();
        this.setLines();
    }
}

export default Slider;