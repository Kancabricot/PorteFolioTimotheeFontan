class Player {

    constructor(scene) {
        this.scene = scene
        this.cameras = scene
        this.player = this.scene.physics.add.sprite(-672+32, 192, 'ListrikP');
        //this.player = this.scene.physics.add.sprite(9664, 2336, 'ListrikP');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(false);
        this.chargeMax = 1800;
        Battery = this.chargeMax;
        // this.scene.physics.add.collider(this.player, this.scene.platforms);

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('ListrikWalk', {
                start: 0,
                end: 9,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walkbatt',
            frames: this.scene.anims.generateFrameNames('walkbatt', {
                start: 0,
                end: 9,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'Idle',
            frames: [
                {key:'ListrikP'},
            ],
            frameRate: 10,
            repeat: -1});

        this.scene.anims.create({
            key: 'Idlebatt',
            frames: [
                {key:'ListrikBAtt'},
            ],
            frameRate: 10,
            repeat: -1});

            this.scene.anims.create({
            key: 'DieBat',
            frames: this.scene.anims.generateFrameNames('ListrikDieBat', {
                start: 0,
                end: 22,
            }),
            frameRate: 10,
            repeat: -1});
    }



    jump(){
        if(this.scene.takeBat === true){

        }
        else{
            if(this.player)
            this.player.setVelocityY(-520);
            //this.player.play('jump', true);
        }
    }
    moveRight() {
        if (this.scene.takeBat === true) {
            this.player.setVelocityX(200);
            this.player.setFlipX(false);
            if (this.player.body.onFloor()) {
                this.player.play('walkbatt', true);
                this.player.setOffset(16,0);
            }

        } else { // gros con :)
            this.player.setVelocityX(300);
            this.player.setFlipX(false);
                 if (this.player.body.onFloor()) {
                     this.player.play('walk', true);
                     this.player.setOffset(16,0);
                 }
        }
    }
    moveLeft(){
        if(this.scene.takeBat === true){
            this.player.setVelocityX(-200);
            this.player.setFlipX(true);
            if (this.player.body.onFloor()) {
                this.player.play('walkbatt', true);
                this.player.setOffset(16,0);
            }
        }else{
            this.player.setVelocityX(-300);
            this.player.setFlipX(true);
            if (this.player.body.onFloor()) {
                this.player.play('walk',true);
                this.player.setOffset(16,0);
            }
        }

    }
    stop(){
        if(this.scene.takeBat === true){
            this.player.setVelocityX(0);
            this.player.play('Idlebatt', true);

        }else{
            this.player.setVelocityX(0);
            this.player.play('Idle', true);
        }

    }


    updateListrik(){

        if(this.scene.genup === true && this.scene.pile.visible === false){
            this.scene.recharge = false;
        }else{
            this.scene.recharge = this.scene.takeBat !== false;
        }

        if(this.scene.pile.visible === false && this.scene.genup === false){
            Battery = this.chargeMax;
        }else{
            Battery -= 1;
            //console.log("perd de la battery  "+this.Battery)
        }

        if(Battery  === 0){
            this.scene.cantMove=true;
            this.player.play('DieBat', true);
            Battery = 0.5;
            this.Reset = this.scene.time.addEvent({
                delay: 2200,
                callback: ()=>{
                    this.scene.cantMove=false;
                    this.player.play('Idle', true);
                    this.player.x = this.scene.currentSaveX;
                    this.player.y = this.scene.currentSaveY;
                    this.scene.pile.X = this.scene.currentSaveX;
                    this.scene.pile.y = this.scene.currentSaveY;
                    this.player.body.setAllowGravity(true);
                    Battery = this.chargeMax;
                    this.scene.pile.setVisible(true);
                    this.scene.act5.setVelocity(0);
                    this.scene.act5.x = 5600;
                    this.scene.platmove5.x = 5600;
                    this.scene.platmove5.setVelocity(0);
                },
                loop: false,
            })

        }
    }

}