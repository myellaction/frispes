class EasySlider{
    constructor(listBlock, images, activeClassSpan){
        this.listBlock = document.querySelector(listBlock);
        this.images = document.querySelector(images);
        this.slideIndex = 3;
        this.activeClassSpan = activeClassSpan;
    }

    clearAllSpans = () => {
        Array.from(this.listBlock.children).forEach((item)=>{
            item.querySelector('span').classList.remove(this.activeClassSpan);
        });
    };
    

    init(){
        this.images.children[this.slideIndex-1].style.top = '0px';
        Array.from(this.listBlock.children).forEach((item, index)=>{
            item.addEventListener('click', () => {
                if (this.slideIndex - 1 != index && !this.animation){
                    this.clearAllSpans();
                    item.querySelector('span').classList.add(this.activeClassSpan);
                    this.images.children[this.slideIndex-1].style.top = '453px';
                    this.images.children[index].style.transition = 'all 0.7s ease';
                    this.images.children[index].style.top = '0px';
                    this.animation = setTimeout(() => {
                        this.images.children[this.slideIndex-1].style.transition = 'all 0s ease'
                        this.images.children[this.slideIndex-1].style.top = '-453px';
                        this.slideIndex = index + 1;
                        this.animation = null;
                    }, 700);
                }
            })
        });
    }
}

export default EasySlider;