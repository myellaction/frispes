class SmallSlider{
    constructor(section, parent, leftArrow, rightArrow, width, activeClass){
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
        Array.from(this.parent.children).forEach((item, index) => {
            
            
        });
    }

    prepareImages = () => {
        let offset = 0;
        this.parent.children[1].classList.add(this.activeClass);
        for (let i=0; i < this.parent.children.length; i++){
            if (this.parent.children[i].previousElementSibling && this.parent.children[i].previousElementSibling.classList.contains(this.activeClass)){
                offset += 123;
            }
            this.parent.children[i].style.left = this.width*i - this.width + offset + 'px';
        }
    }

    makeRightStep = () => {
        let offset = 0;
        this.parent.children[1].classList.remove(this.activeClass);
        this.parent.children[2].classList.add(this.activeClass);

        for (let i=0; i < this.parent.children.length; i++){
            if (this.parent.children[i].previousElementSibling && this.parent.children[i].previousElementSibling.classList.contains(this.activeClass)){
                offset += 123;
            }
            if(i == this.parent.children.length - 1){
                this.parent.children[i].style.left = this.width*(i-1) - this.width + offset + 'px';
                this.parent.children[i].style.transition = 'left 0.5s ease, opacity 0s ease 0.5s'
                this.parent.children[i].style.opacity = 1;
                
            } else{
                this.parent.children[i].style.left = this.width*(i-1) - this.width + offset + 'px';
            }
        }
        let elem = this.parent.children[0];
        elem.style.transition = 'left 0.5s ease, opacity 0s ease 0s'
        elem.style.opacity = 0;
        
        this.parent.append(elem);
        this.animation = setTimeout(() => {
            this.animation = null
        }, this.duration);
        
    }

    makeLeftStep = () => {
        let offset = 0;
        this.parent.children[1].classList.remove(this.activeClass);
        this.parent.children[0].classList.add(this.activeClass);

        for (let i=0; i < this.parent.children.length; i++){
            if (this.parent.children[i].previousElementSibling && this.parent.children[i].previousElementSibling.classList.contains(this.activeClass)){
                offset += 123;
            }
            
            this.parent.children[i].style.left = this.width*(i+1) - this.width + offset + 'px';
            
        }
        let elem = Array.from(this.parent.children).at(-1);
        elem.style.transition = 'left 0.5s ease, opacity 0s ease 0s'
        elem.style.opacity = 0;
        this.parent.prepend(elem);
        elem.style.left = -this.width + 'px';
        elem.style.opacity = 1;
        this.animation = setTimeout(() => {
            this.animation = null
        }, this.duration);
        
    }


    init(){
        this.parent.style.cssText = `
            position: relative;
        `;

        this.prepareImages();
        

        //this.changeImageClass();
        this.rightArrow.addEventListener('click', () => {
            if (!this.animation){
                this.makeRightStep();
            }
        });

        this.leftArrow.addEventListener('click', () => {
            if (!this.animation){
                this.makeLeftStep();
            }
        })
    }






}
export default SmallSlider;