class UI extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'UIScene', active: true });
    }
    preload() {
        for (let m=1;m<=40;m++){
            this.load.image('icon-'+m,'../../ListrikGame/assets/IconeBat/Icon-'+m+'.png')
        }
    }

    create ()
    {
        this.Pourcent = 100
        this.info = this.add.text(155, 2, Battery + '%', { font: '48px Arial', fill: '#000000' });
        this.icon = this.physics.add.sprite(0,0,"icon-1").setOrigin(0,0)
        this.icon.body.setAllowGravity(false);
        this.icon.setImmovable(true);
    }

    update(){
     this.Pourcent = Math.round(Battery*100/1800)

     this.logo();
     this.info.setText(this.Pourcent + '%');
    }
    logo(){
        if(Battery < 45){
            this.icon.setTexture('icon-40');
        }else  if(Battery < 90){
            this.icon.setTexture('icon-39');
        }else  if(Battery < 135){
            this.icon.setTexture('icon-38');
        }else  if(Battery < 180){
            this.icon.setTexture('icon-37');
        }else  if(Battery < 225){
            this.icon.setTexture('icon-36');
        }else  if(Battery < 270){
            this.icon.setTexture('icon-35');
        }else  if(Battery < 315){
            this.icon.setTexture('icon-34');
        }else  if(Battery < 360){
            this.icon.setTexture('icon-33');
        }else  if(Battery < 405){
            this.icon.setTexture('icon-32');
        }else  if(Battery < 450){
            this.icon.setTexture('icon-31');
        }else  if(Battery < 495){
            this.icon.setTexture('icon-30');
        }else  if(Battery < 540){
            this.icon.setTexture('icon-29');
        }else  if(Battery < 585){
            this.icon.setTexture('icon-28');
        }else  if(Battery < 630){
            this.icon.setTexture('icon-27');
        }else  if(Battery < 675){
            this.icon.setTexture('icon-26');
        }else  if(Battery < 720){
            this.icon.setTexture('icon-25');
        }else  if(Battery < 765){
            this.icon.setTexture('icon-24');
        }else  if(Battery < 810){
            this.icon.setTexture('icon-23');
        }else  if(Battery < 855){
            this.icon.setTexture('icon-22');
        }else  if(Battery < 900){
            this.icon.setTexture('icon-21');
        }else  if(Battery < 945){
            this.icon.setTexture('icon-20');
        }else  if(Battery < 990){
            this.icon.setTexture('icon-19');
        }else  if(Battery < 1035){
            this.icon.setTexture('icon-18');
        }else  if(Battery < 1080){
            this.icon.setTexture('icon-17');
        }else  if(Battery < 1125){
            this.icon.setTexture('icon-16');
        }else  if(Battery < 1170){
            this.icon.setTexture('icon-15');
        }else  if(Battery < 1215){
            this.icon.setTexture('icon-14');
        }else  if(Battery < 1260){
            this.icon.setTexture('icon-13');
        }else  if(Battery < 1305){
            this.icon.setTexture('icon-12');
        }else  if(Battery < 1350){
            this.icon.setTexture('icon-11');
        }else  if(Battery < 1395){
            this.icon.setTexture('icon-10');
        }else  if(Battery < 1440){
            this.icon.setTexture('icon-9');
        }else  if(Battery < 1485){
            this.icon.setTexture('icon-8');
        }else  if(Battery < 1530){
            this.icon.setTexture('icon-7');
        }else  if(Battery < 1575){
            this.icon.setTexture('icon-6');
        }else  if(Battery < 1620){
            this.icon.setTexture('icon-5');
        }else  if(Battery < 1665){
            this.icon.setTexture('icon-4');
        }else  if(Battery < 1710){
            this.icon.setTexture('icon-3');
        }else  if(Battery < 1755){
            this.icon.setTexture('icon-2');
        }else{
            this.icon.setTexture('icon-1');
        }
    }
}