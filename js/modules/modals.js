
class ShowModal{
    constructor(btn, modal, type, change){
        this.btn = document.querySelector(btn);
        this.modal = document.querySelector(modal);
        this.type = type;
        this.register = this.modal.querySelector('.register');
        this.loginRegister = this.modal.querySelector('.login-register');
        this.bg = this.modal.querySelector('.modal');
        this.change = this.modal.querySelector(change);
    }

    init(){
        this.btn.addEventListener('click', ()=>{
            if (this.type == 'register'){
                this.register.style.transition = 'right 0.8s ease-out';
                this.register.style.right = 0;
                this.loginRegister.style.height = '530px';
                this.modal.querySelector('.login').style.opacity = '0';
                document.querySelector('.register__hide').style.display = 'none'  
            }else{
                this.modal.querySelector('.login').style.opacity = 1;
            }
            this.modal.style.display = 'flex';
            document.body.style.paddingRight =  window.innerWidth - document.documentElement.clientWidth + 'px'; // Ширина с полосой прокрутки и без нее
            document.body.style.overflow = 'hidden';
            this.loginRegister.classList.add('active-modal');
        });

        this.bg.addEventListener('click', () => {
            this.modal.style.display = 'none';
            document.body.style.paddingRight = 0;
            document.body.style.overflow = '';
            if (this.type == 'register'){
                this.loginRegister.style.height = '400px';
                this.register.style.right = '-500px';
                this.modal.querySelector('.login').style.opacity = '1';
            }
            if (this.type == 'login'){
                document.querySelector('.register__lines').classList.remove('register__hide-lines');
                document.querySelector('.register__hide').style.display = '';
                this.register.style.right = '-500px';
                this.loginRegister.style.height = '400px';
                this.modal.querySelector('.login').style.opacity = '1';
            }
            if (this.hideTimeout){
                clearInterval(this.hideTimeout);
            }
        });

        this.change.addEventListener('click', (e) => {
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
            }
            else{
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

export default ShowModal;

