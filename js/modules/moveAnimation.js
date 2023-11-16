class MoveAnimation {
    constructor(leftPart, rightPart){
        this.leftPart = document.querySelector(leftPart);
        this.rightPart = document.querySelector(rightPart);
    }
    init(){
        this.leftPart.style.transition = 'all 1s ease';
        this.rightPart.style.transition = 'all 1.5s ease';
        this.leftPart.style.left = '0';
        this.leftPart.style.opacity = '1';
        this.rightPart.style.right = '0';
        this.rightPart.style.opacity = '1';
    }
}
export default MoveAnimation;