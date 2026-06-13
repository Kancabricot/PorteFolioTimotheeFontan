class Tableau1 extends Phaser.Scene {

    preload() {
        // Je preload les images autres que Tiled!

        this.load.image('pile','../../ListrikGame/assets/Pile.png');
        this.load.image('ListrikP','../../ListrikGame/assets/ListrikP.png');
        this.load.image('ListrikBAtt','../../ListrikGame/assets/ListrikBAtt.png');
        this.load.image('grab','../../ListrikGame/assets/grab.png');
        this.load.image('hook','../../ListrikGame/assets/hook.png');
        this.load.image('levieroff','../../ListrikGame/assets/levieroff.png');
        this.load.image('levieron','../../ListrikGame/assets/levieron.png');
        this.load.image('door','../../ListrikGame/assets/porte2.png');
        this.load.image('genD','../../ListrikGame/assets/gendown.png');
        this.load.image('genU','../../ListrikGame/assets/genup.png');
        this.load.image('platmove','../../ListrikGame/assets/Platmove.png');
        this.load.image('platmove12','../../ListrikGame/assets/Platmove-12.png');
        this.load.image('platmove3','../../ListrikGame/assets/Platmove-3.png');
        this.load.image('UpgradeNoItem','../../ListrikGame/assets/upgrade/UpgradeNoItem.png');

        this.load.spritesheet('ListrikWalk','../../ListrikGame/assets/WalkA.png',{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('walkbatt','../../ListrikGame/assets/WalkABatt.png',{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('ListrikDieBat','../../ListrikGame/assets/DieBat.png',{frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('ListrikDie','../../ListrikGame/assets/Die.png',{frameWidth: 64, frameHeight: 64});

        // chargement tilemap
        this.load.image("tilemap", "../../ListrikGame/assets/Map_TR/TestroomTiled.png");
        this.load.image("tileTV", "../../ListrikGame/assets/Map_TR/TVbg.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "../../ListrikGame/assets/Map_TR/TestRoom.json");

        for (let m=1;m<=8;m++){
            this.load.image('upgrade-'+m,'../../ListrikGame/assets/upgrade/upgrade'+m+'.png')
        }

        for (let m=1;m<=11;m++){
            this.load.image('presentation-'+m,'../../ListrikGame/assets/presentation/presentation'+m+'.png')
        }

        for (let m=1;m<=8;m++){
            this.load.image('tutoMenuStart-'+m,'../../ListrikGame/assets/TutoAnim/tutomenu'+m+'.png')
        }

        for (let m=1;m<=20;m++){
            this.load.image('menuEND-'+m,'../../ListrikGame/assets/TutoAnim/menuEND'+m+'.png')
        }

        for (let m=1;m<=5;m++){
            this.load.image('tutoLevier-'+m,'../../ListrikGame/assets/TutoAnim/tutolevier'+m+'.png')
        }

        for (let m=1;m<=12;m++){
            this.load.image('tutoPile-'+m,'../../ListrikGame/assets/TutoAnim/BGtuto'+m+'.png')
        }

        for (let m=1;m<=14;m++){
            this.load.image('TutoGen-'+m,'../../ListrikGame/assets/TutoAnim/TutoGen'+m+'.png')
        }

        for (let m=1;m<=19;m++){
            this.load.image('Tutograb-'+m,'../../ListrikGame/assets/TutoAnim/TutoGrab'+m+'.png')
        }

        for (let m=1;m<=15;m++){
            this.load.image('acid-'+m,'../../ListrikGame/assets/acid/acidanim'+m+'.png')
        }
    }

    create() {
        this.currentSaveX = -1244;
        this.currentSaveY = 1472;
        this.takeBat = false;
        this.recharge = false;
        this.turn = false;
        this.taillePile = 32;
        this.coorDoorx = 0;
        this.genup = false;
        this.cantMove = false;
        this.upgradeL = false;
        this.move8 = false;
        this.move9 = false;
        this.move10 = false;
        this.move11 = false;
        this.NumeroDePrestentation = 1;


        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        const tileset = map.addTilesetImage(
            "TestroomTiled",
            "tilemap"
        );
        const tilesetTV = map.addTilesetImage(
            "TVbg",
            "tileTV"
        );

        this.porte = map.createLayer(
            "Wall",
            tileset
        );

        this.TV = map.createLayer(
            "TV",
            tilesetTV
        );

        this.FuntionAnim()

        // Création du BG
        this.bglevier = this.physics.add.sprite(-1344, 800,'tuto2').setOrigin(0, 0);
        this.bglevier.body.setAllowGravity(false)
        this.bglevier.setImmovable(true);
        this.bglevier.play('tutoLevier');



        // Création du BG
        this.bgmenu = this.physics.add.sprite(-1344, 0,'cube').setOrigin(0, 0);
        this.bgmenu.body.setAllowGravity(false)
        this.bgmenu.setImmovable(true);
        this.bgmenu.play('tutoMenuStart');

        // Création de la presentation
        this.bgpresentation = this.physics.add.sprite(8288-32, 2336-32,'presentation-1').setOrigin(0, 0);
        this.bgpresentation.body.setAllowGravity(false)
        this.bgpresentation.setImmovable(true);

        // Création du BG
        this.bggen = this.physics.add.sprite(1408, 800,'cube').setOrigin(0, 0);
        this.bggen.body.setAllowGravity(false)
        this.bggen.setImmovable(true);
        this.bggen.play('TutoGen');

        // Création du BG
        this.bgmenu = this.physics.add.sprite(32, 800,'cube').setOrigin(0, 0);
        this.bgmenu.body.setAllowGravity(false)
        this.bgmenu.setImmovable(true);
        this.bgmenu.play('tutoPile');


        // Création du BG
        this.bggrab = this.physics.add.sprite(2784, 800,'cube').setOrigin(0, 0);
        this.bggrab.body.setAllowGravity(false)
        this.bggrab.setImmovable(true);
        this.bggrab.play('Tutograb');

        // Création du BG de fin
        this.bgmenuend = this.physics.add.sprite(9664, 2336,'cube').setOrigin(0, 0);
        this.bgmenuend.body.setAllowGravity(false)
        this.bgmenuend.setImmovable(true);
        this.bgmenuend.play('menuEND');

        // Création de la target pour la camera
        this.pile = this.physics.add.sprite(800, 800,'pile').setOrigin(0, 0);
        this.pile.setDisplaySize(21,52);

        // Création de la target pour la camera
        this.target = this.physics.add.sprite(0, 0,'cube').setOrigin(0, 0);
        this.target.setVisible(false);
        this.target.setDisplaySize(1,1);
        this.target.body.setAllowGravity(false);
        this.target.setImmovable(true);



        this.door1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Collide').objects.forEach((collide) => {
            this.collideSprite = this.physics.add.sprite(collide.x + (collide.width * 0.5), collide.y + (collide.height * 0.5)).setSize(collide.width, collide.height).setDepth(1);
            this.collide.add(this.collideSprite)
        });

        const cam = map.getObjectLayer('cam')
            cam.objects.forEach(objData=> {
            const {x = 0, y = 0, name} = objData

            switch (name) {
                case '1-2': {
                    this.cam1 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam1.setDisplaySize(1344, 704);
                    this.cam1.setVisible(false)
                    this.cam1.setImmovable(true);
                    this.cam1.body.setAllowGravity(false);
                    break;
                }
                case '2-1': {
                    this.cam2 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam2.setDisplaySize(1344, 704);
                    this.cam2.setVisible(false)
                    this.cam2.setImmovable(true);
                    this.cam2.body.setAllowGravity(false);
                    break;
                }
                case '2-2': {
                    this.cam3 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam3.setDisplaySize(1344, 704);
                    this.cam3.setVisible(false)
                    this.cam3.setImmovable(true);
                    this.cam3.body.setAllowGravity(false);
                    break;
                }
                case '3-1': {
                    this.cam4 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam4.setDisplaySize(1344, 704);
                    this.cam4.setVisible(false)
                    this.cam4.setImmovable(true);
                    this.cam4.body.setAllowGravity(false);
                    break;
                }
                case '3-2': {
                    this.cam7 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam7.setDisplaySize(1344, 704);
                    this.cam7.setVisible(false)
                    this.cam7.setImmovable(true);
                    this.cam7.body.setAllowGravity(false);
                    break;
                }
                case '4-1': {
                    this.cam5 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam5.setDisplaySize(1344, 704);
                    this.cam5.setVisible(false)
                    this.cam5.setImmovable(true);
                    this.cam5.body.setAllowGravity(false);
                    break;
                }
                case '4-2': {
                    this.cam6 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam6.setDisplaySize(1344, 704);
                    this.cam6.setVisible(false)
                    this.cam6.setImmovable(true);
                    this.cam6.body.setAllowGravity(false);
                    break;
                }
                case '5-2': {
                    this.cam8 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam8.setDisplaySize(650, 704);
                    this.cam8.setVisible(false)
                    this.cam8.setImmovable(true);
                    this.cam8.body.setAllowGravity(false);
                    break;
                }
                case '5-2-1': {
                    this.cam81 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam81.setDisplaySize(1, 704);
                    this.cam81.setVisible(false)
                    this.cam81.setImmovable(true);
                    this.cam81.body.setAllowGravity(false);
                    break;
                }
                case '5-2-2': {
                    this.cam82 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam82.setDisplaySize(1, 704);
                    this.cam82.setVisible(false)
                    this.cam82.setImmovable(true);
                    this.cam82.body.setAllowGravity(false);
                    break;
                }
                case '7-3': {
                    this.cam9 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam9.setDisplaySize(1344, 704);
                    this.cam9.setVisible(false)
                    this.cam9.setImmovable(true);
                    this.cam9.body.setAllowGravity(false);
                    break;
                }
                case '8-3': {
                    this.cam10 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam10.setDisplaySize(1344, 704);
                    this.cam10.setVisible(false)
                    this.cam10.setImmovable(true);
                    this.cam10.body.setAllowGravity(false);
                    break;
                }
                case '0-2': {
                    this.cam0 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam0.setDisplaySize(1344, 704);
                    this.cam0.setVisible(false)
                    this.cam0.setImmovable(true);
                    this.cam0.body.setAllowGravity(false);
                    break;
                }
                case '0-1': {
                    this.menustart = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.menustart.setDisplaySize(1344, 704);
                    this.menustart.setVisible(false)
                    this.menustart.setImmovable(true);
                    this.menustart.body.setAllowGravity(false);
                    break;
                }
                case '8-4': {
                    this.menuend = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.menuend.setDisplaySize(1344, 704);
                    this.menuend.setVisible(false)
                    this.menuend.setImmovable(true);
                    this.menuend.body.setAllowGravity(false);
                    break;
                }
                case 'presentation': {
                    this.presentation = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.presentation.setDisplaySize(1344, 704);
                    this.presentation.setVisible(false)
                    this.presentation.setImmovable(true);
                    this.presentation.body.setAllowGravity(false);
                    break;
                }
                case 'cam1-2': {
                    this.cs1 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs1.setDisplaySize(1, 1);
                    this.cs1.setVisible(false)
                    this.cs1.setImmovable(true);
                    this.cs1.body.setAllowGravity(false);
                    break;
                }
                case 'cam2-2': {
                    this.cs3 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs3.setDisplaySize(1, 1);
                    this.cs3.setVisible(false)
                    this.cs3.setImmovable(true);
                    this.cs3.body.setAllowGravity(false);
                    break;
                }
                case 'cam3-2': {
                    this.cs7 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs7.setDisplaySize(1, 1);
                    this.cs7.setVisible(false)
                    this.cs7.setImmovable(true);
                    this.cs7.body.setAllowGravity(false);
                    break;
                }
                case 'cam2-1': {
                    this.cs2 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs2.setDisplaySize(1, 1);
                    this.cs2.setVisible(false)
                    this.cs2.setImmovable(true);
                    this.cs2.body.setAllowGravity(false);
                    break;
                }
                case 'cam3-1': {
                    this.cs4 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs4.setDisplaySize(1, 1);
                    this.cs4.setVisible(false)
                    this.cs4.setImmovable(true);
                    this.cs4.body.setAllowGravity(false);
                    break;
                }
                case 'cam4-1': {
                    this.cs5 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs5.setDisplaySize(1, 1);
                    this.cs5.setVisible(false)
                    this.cs5.setImmovable(true);
                    this.cs5.body.setAllowGravity(false);
                    break;
                }
                case 'cam4-2': {
                    this.cs6 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs6.setDisplaySize(1, 1);
                    this.cs6.setVisible(false)
                    this.cs6.setImmovable(true);
                    this.cs6.body.setAllowGravity(false);
                    break;
                }
                case 'cam5-2': {
                    this.cs8 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs8.setDisplaySize(1, 1);
                    this.cs8.setVisible(false)
                    this.cs8.setImmovable(true);
                    this.cs8.body.setAllowGravity(false);
                    break;
                }
                case 'cam5-2-1': {
                    this.cs82 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs82.setDisplaySize(1, 1);
                    this.cs82.setVisible(false)
                    this.cs82.setImmovable(true);
                    this.cs82.body.setAllowGravity(false);
                    break;
                }
                case 'cam7-3': {
                    this.cs9 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs9.setDisplaySize(1, 1);
                    this.cs9.setVisible(false)
                    this.cs9.setImmovable(true);
                    this.cs9.body.setAllowGravity(false);
                    break;
                }
                case 'cam8-3': {
                    this.cs10 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs10.setDisplaySize(1, 1);
                    this.cs10.setVisible(false)
                    this.cs10.setImmovable(true);
                    this.cs10.body.setAllowGravity(false);
                    break;
                }
                case 'cam0-2': {
                    this.cs0 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs0.setDisplaySize(1, 1);
                    this.cs0.setVisible(false)
                    this.cs0.setImmovable(true);
                    this.cs0.body.setAllowGravity(false);
                    break;
                }
                case 'cam0-1': {
                    this.csmenustart = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.csmenustart.setDisplaySize(1, 1);
                    this.csmenustart.setVisible(false)
                    this.csmenustart.setImmovable(true);
                    this.csmenustart.body.setAllowGravity(false);
                    break;
                }
                case 'cam8-4': {
                    this.csmenuend = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.csmenuend.setDisplaySize(1, 1);
                    this.csmenuend.setVisible(false)
                    this.csmenuend.setImmovable(true);
                    this.csmenuend.body.setAllowGravity(false);
                    break;
                }
                case 'campresentation': {
                    this.cspresentation = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cspresentation.setDisplaySize(1, 1);
                    this.cspresentation.setVisible(false)
                    this.cspresentation.setImmovable(true);
                    this.cspresentation.body.setAllowGravity(false);
                    break;
                }
            }
        })

        this.platforms = map.createLayer(
            "PLatforme",
            tileset
        );
        this.porte = map.createLayer(
            "Asset",
            tileset
        );
        this.Water = map.createLayer(
            "Water",
            tileset
        );

        this.grab = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('grab').objects.forEach((grab) => {
            this.grab.create(grab.x, grab.y- grab.height, 'grab').setOrigin(0);
        });

        this.acid = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Acid').objects.forEach((Acid) => {
            let acid = this.acid.create(Acid.x, Acid.y- Acid.height+38, 'grab').setOrigin(0);
            acid.play("acid")
            this.acid.add(acid)
        });

        this.deadzone = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('DeathZone').objects.forEach((trigger) => {
            this.deadzone.create(trigger.x + (trigger.width * 0.5)-10, trigger.y + (trigger.height * 0.5)-10).setSize(trigger.width, trigger.height).setOrigin(0).setVisible(false);
        });

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Save').objects.forEach((save) => {
            this.saves.create(save.x, save.y- save.height, 'save').setOrigin(0);
            this.saves.setVisible(false);
        });
        const objectsLayer = map.getObjectLayer('Objet')
        objectsLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, name} = objData

            switch (name) {
                case 'porte0': {
                    this.door0 = this.physics.add.sprite(x,y,"door").setOrigin(0,0)
                    this.door0.setDisplaySize(32,32*4);
                    this.door0.body.setAllowGravity(false);
                    this.door0.setImmovable(true);
                    break;
                }
                case 'porte1': {
                    this.door1 = this.physics.add.sprite(x,y,"door").setOrigin(0,0)
                    this.door1.setDisplaySize(32,32*4);
                    this.door1.body.setAllowGravity(false);
                    this.door1.setImmovable(true);
                    break;
                }
                case 'porte2': {
                    this.door2 = this.physics.add.sprite(x,y,"door").setOrigin(0,0)
                    this.door2.setDisplaySize(32,32*4);
                    this.door2.body.setAllowGravity(false);
                    this.door2.setImmovable(true);
                    break;
                }
                case 'porte3': {
                    this.door3 = this.physics.add.sprite(x,y,"door").setOrigin(0,0)
                    this.door3.setDisplaySize(32,32*4);
                    this.door3.body.setAllowGravity(false);
                    this.door3.setImmovable(true);
                    break;
                }
                case 'levier0': {
                    this.levier0 = this.physics.add.sprite(x,y-32,"levieroff").setOrigin(0,0)
                    this.levier0.setDisplaySize(32,32);
                    this.levier0.body.setAllowGravity(false);
                    this.levier0.setImmovable(true);
                    break;
                }
                case 'levier1': {
                    this.levier1 = this.physics.add.sprite(x,y-32,"levieroff").setOrigin(0,0)
                    this.levier1.setDisplaySize(32,32);
                    this.levier1.body.setAllowGravity(false);
                    this.levier1.setImmovable(true);
                    break;
                }
                case 'levier2': {
                    this.levier2 = this.physics.add.sprite(x,y-32,"levieroff").setOrigin(0,0)
                    this.levier2.setDisplaySize(32,32);
                    this.levier2.body.setAllowGravity(false);
                    this.levier2.setImmovable(true);
                    break;
                }
                case 'levier3': {
                    this.levier3 = this.physics.add.sprite(x,y-32,"levieroff").setOrigin(0,0)
                    this.levier3.setDisplaySize(32,32);
                    this.levier3.body.setAllowGravity(false);
                    this.levier3.setImmovable(true);
                    break;
                }
                case 'platmove1': {
                    this.platmove1 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)
                    this.platmove1.body.setAllowGravity(false);
                    this.platmove1.setImmovable(true);
                    break;
                }
                case 'platmove2': {
                    this.platmove2 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)
                    this.platmove2.body.setAllowGravity(false);
                    this.platmove2.setImmovable(true);
                    break;
                }
                case 'platmove3': {
                    this.platmove3 = this.physics.add.sprite(x,y,"platmove12").setOrigin(0,0)
                    this.platmove3.body.setAllowGravity(false);
                    this.platmove3.setImmovable(true);
                    break;
                }
                case 'platmove4': {
                    this.platmove4 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)
                    this.platmove4.body.setAllowGravity(false);
                    this.platmove4.setImmovable(true);
                    break;
                }
                case 'platmove5': {
                    this.platmove5 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)
                    this.platmove5.body.setAllowGravity(false);
                    this.platmove5.setImmovable(true);
                    break;
                }
                case 'platmove6': {
                    this.platmove6 = this.physics.add.sprite(x,y,"platmove3").setOrigin(0,0)
                    this.platmove6.body.setAllowGravity(false);
                    this.platmove6.setImmovable(true);
                    break;
                }
                case 'platmove7': {
                    this.platmove7 = this.physics.add.sprite(x,y,"platmove3").setOrigin(0,0)
                    this.platmove7.body.setAllowGravity(false);
                    this.platmove7.setImmovable(true);
                    this.platmove7.setFlipX(true);
                    break;
                }
                case 'platmove8': {
                    this.platmove8 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)
                    this.platmove8.body.setAllowGravity(false);
                    this.platmove8.setImmovable(true);
                    break;
                }
                case 'platmove9': {
                    this.platmove9 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)
                    this.platmove9.body.setAllowGravity(false);
                    this.platmove9.setImmovable(true);
                    break;
                }
                case 'platmove10': {
                    this.platmove10 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)
                    this.platmove10.body.setAllowGravity(false);
                    this.platmove10.setImmovable(true);
                    break;
                }
                case 'platmove11': {
                    this.platmove11 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)

                    this.platmove11.body.setAllowGravity(false);
                    this.platmove11.setImmovable(true);
                    break;
                }
                case 'platmove12': {
                    this.platmove12 = this.physics.add.sprite(x,y,"platmove").setOrigin(0,0)

                    this.platmove12.body.setAllowGravity(false);
                    this.platmove12.setImmovable(true);
                    break;
                }
                case 'Act': {
                    this.act1 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act1.setDisplaySize(64,64);
                    this.act1.body.setAllowGravity(false);
                    this.act1.setImmovable(true);
                    break;
                }case 'Act2': {
                    this.act2 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act2.setDisplaySize(64,64);
                    this.act2.body.setAllowGravity(false);
                    this.act2.setImmovable(true);
                    break;
                }case 'Act4': {
                    this.act4 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act4.setDisplaySize(64,64);
                    this.act4.body.setAllowGravity(false);
                    this.act4.setImmovable(true);
                    break;
                }case 'Act5': {
                    this.act5 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act5.setDisplaySize(64,64);
                    this.act5.body.setAllowGravity(false);
                    this.act5.setImmovable(true);
                    break;
                }
                case 'Act8': {
                    this.act8 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act8.setDisplaySize(64,64);
                    this.act8.body.setAllowGravity(false);
                    this.act8.setImmovable(true);
                    break;
                }
                case 'Act9': {
                    this.act9 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act9.setDisplaySize(64,64);
                    this.act9.body.setAllowGravity(false);
                    this.act9.setImmovable(true);
                    break;
                }
                case 'Act10': {
                    this.act10 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act10.setDisplaySize(64,64);
                    this.act10.body.setAllowGravity(false);
                    this.act10.setImmovable(true);
                    break;
                }
                case 'Act11': {
                    this.act11 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act11.setDisplaySize(64,64);
                    this.act11.body.setAllowGravity(false);
                    this.act11.setImmovable(true);
                    break;
                }
                case 'Act12': {
                    this.act12 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act12.setDisplaySize(64,64);
                    this.act12.body.setAllowGravity(false);
                    this.act12.setImmovable(true);
                    break;
                }
                case 'sologen': {
                    this.act3 = this.physics.add.sprite(x,y,"genD").setOrigin(0,0)
                    this.act3.setDisplaySize(64,64);
                    this.act3.body.setAllowGravity(false);
                    this.act3.setImmovable(true);
                    break;
                }
                case 'upgrade': {
                    this.up = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.up.setDisplaySize(64,64);
                    this.up.body.setAllowGravity(false);
                    this.up.setOffset(32,5);
                    break;
                }
                case 'moveto1': {
                    this.movetarget = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.movetarget.setDisplaySize(64,64);
                    this.movetarget.body.setAllowGravity(false);
                    this.movetarget.setImmovable(true);
                    this.movetarget.setVisible(false);
                    break;
                }
                case 'moveto2': {
                    this.movetarget2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.movetarget2.setDisplaySize(64,64);
                    this.movetarget2.body.setAllowGravity(false);
                    this.movetarget2.setImmovable(true);
                    this.movetarget2.setVisible(false);
                    break;
                }
            }
        })

        this.player = new Player(this);

        this.platforms.setCollisionByExclusion(-1, true);

        // Création du grappin
        this.grappin = this.physics.add.sprite(-100, -100,'hook').setOrigin(0, 0);
        this.grappin.body.setAllowGravity(false);
        this.grappin.setImmovable(true);

        // Creation des collision
        this.physics.add.collider(this.player.player, this.platforms);
        this.physics.add.collider(this.player.player, this.door0);
        this.physics.add.collider(this.player.player, this.door1);
        this.physics.add.collider(this.player.player, this.door2);
        this.physics.add.collider(this.player.player, this.door3);
        this.physics.add.collider(this.player.player, this.platmove1);
        this.physics.add.collider(this.player.player, this.platmove2);
        this.physics.add.collider(this.player.player, this.platmove3);
        this.physics.add.collider(this.player.player, this.platmove4);
        this.physics.add.collider(this.player.player, this.platmove5);
        this.physics.add.collider(this.player.player, this.platmove6);
        this.physics.add.collider(this.player.player, this.platmove7);
        this.physics.add.collider(this.player.player, this.platmove8);
        this.physics.add.collider(this.player.player, this.platmove9);
        this.physics.add.collider(this.player.player, this.platmove10);
        this.physics.add.collider(this.player.player, this.platmove11);

        this.physics.add.collider(this.pile, this.platmove1);
        this.physics.add.collider(this.pile, this.platmove2);
        this.physics.add.collider(this.pile, this.platmove3);
        this.physics.add.collider(this.pile, this.platmove4);
        this.physics.add.collider(this.pile, this.platmove5);
        this.physics.add.collider(this.pile, this.platmove6);
        this.physics.add.collider(this.pile, this.platmove7);
        this.physics.add.collider(this.pile, this.platmove8);
        this.physics.add.collider(this.pile, this.platmove9);
        this.physics.add.collider(this.pile, this.platmove10);
        this.physics.add.collider(this.pile, this.platmove11);
        this.physics.add.collider(this.pile, this.platforms);


        // redimentionnement du monde avec les dimensions calculées via tiled
                this.physics.world.setBounds(0, 0, 3200000, 1000000);
        //  ajout du champs de la caméra de taille identique à celle du monde
                this.cameras.main.setBounds(-100000, -0, 3200000, 1000000);

        this.physics.add.overlap(this.grab, this.grappin, this.actiongrab,  null, this)
        this.physics.add.overlap(this.collide, this.grappin, this.miss,  null, this)
        this.physics.add.overlap(this.grappin, this.player.player, this.gravite,  null, this)
        this.physics.add.overlap(this.up, this.player.player,this.test,null,this)
        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)
        this.physics.add.overlap(this.player.player, this.deadzone, this.KillBox, null, this)
        this.physics.add.overlap(this.platmove5, this.movetarget, this.stop, null, this)
        this.physics.add.overlap(this.platmove8, this.acid, this.stop8, null, this)
        this.physics.add.overlap(this.platmove9, this.acid, this.stop9, null, this)
        this.physics.add.overlap(this.platmove10, this.acid, this.stop10, null, this)
        this.physics.add.overlap(this.platmove11, this.acid, this.stop11, null, this)

        this.initKeyboard();
        this.Gestioncam(this.player.player);
        this.Tweengestion()

        this.cameras.main.setRoundPixels(true);

    }

    stop(platforme){
        platforme.setVelocityX(0);
        this.act5.setVelocityX(0);
    }

    initKeyboard() {

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        let me = this;

            this.input.keyboard.on('keyup', function (kevent) {
                switch (kevent.keyCode) {

                    case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.player.stop();
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.D:
                        me.player.stop();
                        break;
                }
            })

            this.input.keyboard.on('keydown', function (kevent) {
                switch (kevent.keyCode) {


                    case Phaser.Input.Keyboard.KeyCodes.Q:
                        if(me.cantMove === false) {
                            me.turn = true;
                            me.player.moveLeft();
                        }
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.D:
                        if(me.cantMove === false) {
                            me.turn = false;
                            me.player.moveRight();
                        }
                        break;

                        case Phaser.Input.Keyboard.KeyCodes.C:
                            me.player.player.x = 8576;
                            me.player.player.y = 1632;
                            me.pile.x = me.player.player.x
                            me.pile.y = me.player.player.y
                        break;

                            case Phaser.Input.Keyboard.KeyCodes.P:
                            me.player.player.x = 8961;
                            me.player.player.y = 2707;
                        break;

                            case Phaser.Input.Keyboard.KeyCodes.ENTER:
                                console.log(me.NumeroDePrestentation)
                                if(  me.NumeroDePrestentation === 11){
                                    me.NumeroDePrestentation = 1;
                                }else{
                                    me.NumeroDePrestentation += 1;
                                }
                                break;

                                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                                console.log(me.NumeroDePrestentation)
                                if(  me.NumeroDePrestentation === 11){
                                    me.NumeroDePrestentation = 1;
                                }else{
                                    me.NumeroDePrestentation += 1;
                                }
                                break;

                                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                                console.log(me.NumeroDePrestentation)
                                if(  me.NumeroDePrestentation === 1){
                                    me.NumeroDePrestentation = 11;
                                }else{
                                    me.NumeroDePrestentation -= 1;
                                }
                                break;

                    case Phaser.Input.Keyboard.KeyCodes.Z:

                        if(me.cantMove === false && me.player.player.body.onFloor()){
                            me.player.jump();
                        }else{
                            me.cantMove = false;
                        }

                        break;

                        case Phaser.Input.Keyboard.KeyCodes.W:

                        if(me.cantMove === false && me.player.player.body.onFloor()){
                            me.player.jump();
                        }else{
                            me.cantMove = false;
                        }

                        break;

                    case Phaser.Input.Keyboard.KeyCodes.E:
                        if(me.cantMove === false) {
                            me.GestionEvent(me.player.player);
                        }
                        break;
                }
            })
    }


    sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = saves.x
        this.currentSaveY = saves.y-50
        saves.body.enable = false;
    }

    FuntionAnim(){

        this.anims.create({
            key: 'Die',
            frames: this.anims.generateFrameNames('ListrikDie', {
                start: 0,
                end: 14,
            }),
            frameRate: 10,
            repeat: -1});

        this.anims.create({
            key: 'supp',
            frames: [
                {key:'delete'},
            ],
            frameRate: 10,
            repeat: -1});


        this.anims.create({
            key: 'tutoMenuStart',
            frames: [
                {key:'tutoMenuStart-1'},
                {key:'tutoMenuStart-2'},
                {key:'tutoMenuStart-3'},
                {key:'tutoMenuStart-4'},
                {key:'tutoMenuStart-5'},
                {key:'tutoMenuStart-6'},
                {key:'tutoMenuStart-7'},
                {key:'tutoMenuStart-8'},
            ],
            frameRate: 10,
            repeat: -1});

        this.anims.create({
            key: 'upgrade',
            frames: [
                {key:'upgrade-1'},
                {key:'upgrade-2'},
                {key:'upgrade-3'},
                {key:'upgrade-4'},
                {key:'upgrade-5'},
                {key:'upgrade-6'},
                {key:'upgrade-7'},
                {key:'upgrade-8'},
            ],
            frameRate: 5,
            repeat: -1});

        this.anims.create({
            key: 'menuEND',
            frames: [
                {key:'menuEND-1'},
                {key:'menuEND-2'},
                {key:'menuEND-3'},
                {key:'menuEND-4'},
                {key:'menuEND-5'},
                {key:'menuEND-6'},
                {key:'menuEND-7'},
                {key:'menuEND-8'},
                {key:'menuEND-9'},
                {key:'menuEND-10'},
                {key:'menuEND-11'},
                {key:'menuEND-12'},
                {key:'menuEND-13'},
                {key:'menuEND-14'},
                {key:'menuEND-15'},
                {key:'menuEND-16'},
                {key:'menuEND-17'},
                {key:'menuEND-18'},
                {key:'menuEND-19'},
                {key:'menuEND-20'},
            ],
            frameRate: 5,
            repeat: -1});

        this.anims.create({
            key: 'Tutograb',
            frames: [
                {key:'Tutograb-1'},
                {key:'Tutograb-2'},
                {key:'Tutograb-3'},
                {key:'Tutograb-4'},
                {key:'Tutograb-5'},
                {key:'Tutograb-6'},
                {key:'Tutograb-7'},
                {key:'Tutograb-8'},
                {key:'Tutograb-9'},
                {key:'Tutograb-10'},
                {key:'Tutograb-11'},
                {key:'Tutograb-12'},
                {key:'Tutograb-13'},
                {key:'Tutograb-14'},
                {key:'Tutograb-15'},
                {key:'Tutograb-16'},
                {key:'Tutograb-17'},
                {key:'Tutograb-18'},
                {key:'Tutograb-19'},
            ],
            frameRate: 10,
            repeat: -1});

        this.anims.create({
            key: 'acid',
            frames: [
                {key:'acid-1'},
                {key:'acid-2'},
                {key:'acid-3'},
                {key:'acid-4'},
                {key:'acid-5'},
                {key:'acid-6'},
                {key:'acid-7'},
                {key:'acid-8'},
                {key:'acid-9'},
                {key:'acid-10'},
                {key:'acid-11'},
                {key:'acid-12'},
                {key:'acid-13'},
                {key:'acid-14'},
                {key:'acid-15'},
            ],
            frameRate: 10,
            repeat: -1});

        this.anims.create({
            key: 'TutoGen',
            frames: [
                {key:'TutoGen-1'},
                {key:'TutoGen-2'},
                {key:'TutoGen-3'},
                {key:'TutoGen-4'},
                {key:'TutoGen-5'},
                {key:'TutoGen-6'},
                {key:'TutoGen-7'},
                {key:'TutoGen-8'},
                {key:'TutoGen-9'},
                {key:'TutoGen-10'},
                {key:'TutoGen-11'},
                {key:'TutoGen-12'},
                {key:'TutoGen-13'},
                {key:'TutoGen-14'},
            ],
            frameRate: 10,
            repeat: -1});

        this.anims.create({
            key: 'tutoLevier',
            frames: [
                {key:'tutoLevier-1'},
                {key:'tutoLevier-2'},
                {key:'tutoLevier-3'},
                {key:'tutoLevier-4'},
                {key:'tutoLevier-5'},
            ],
            frameRate: 10,
            repeat: -1});

        this.anims.create({
            key: 'tutoPile',
            frames: [
                {key:'tutoPile-1'},
                {key:'tutoPile-2'},
                {key:'tutoPile-3'},
                {key:'tutoPile-4'},
                {key:'tutoPile-5'},
                {key:'tutoPile-6'},
                {key:'tutoPile-7'},
                {key:'tutoPile-8'},
                {key:'tutoPile-9'},
                {key:'tutoPile-10'},
                {key:'tutoPile-11'},
                {key:'tutoPile-12'},
            ],
            frameRate: 10,
            repeat: -1});
    }

    KillBox(){
        this.scene.cantMove=true;
        this.player.player.play('Die', true);
        Battery = 0.5;
        this.Reset = this.time.addEvent({
            delay: 1200,
            callback: ()=>{
                this.cantMove=false;
                this.player.player.play('Idle', true);
                this.player.player.x = this.currentSaveX + 40;
                this.player.player.y = this.currentSaveY;
                this.pile.X = this.currentSaveX + 40;
                this.pile.y = this.currentSaveY;
                Battery = this.chargeMax;
                this.pile.setVisible(true);
                this.player.player.body.setAllowGravity(true);

                this.act5.setVelocity(0);
                this.act5.x = 5600;
                this.platmove5.x = 5600;
                this.platmove5.setVelocity(0);
            },
            loop: false,
        })

    }

    actiongrab(grappin,grab){
        let me = this;
        grappin.setVelocity(0);
        grappin.x = grab.x +8;
        grappin.y = grab.y +16;

        this.player.player.body.setAllowGravity(false);
        me.physics.moveToObject(me.player.player, grappin, 400);
    }

    miss(){
        this.cantMove = false;
        this.grappin.setVelocity(0);
        this.grappin.setVisible(false);
        this.grappin.body.setEnable(false);
    }

    gravite(){
        if(this.cantMove === true){
            this.player.player.setVelocity(0)
        }else{
            this.player.player.setVelocity(0)
            this.grappin.body.setEnable(false,false)
            this.player.player.body.setAllowGravity(true);
        }
    }

    GestionEvent(player){
        if(this.takeBat === true){
            if (this.physics.overlap(player, this.act1)===true){
                this.platweens.play();
                this.genmove.play();
                this.platweens.resume();
                this.genmove.resume();
                this.genup = true;
                this.takeBat = false;
                this.act1.setTexture('genU');

            }else if (this.physics.overlap(player, this.act2)===true){
                this.platweens2.play();
                this.platweens2.resume();
                this.platweens6.play();
                this.platweens7.play();
                this.genup = true;
                this.takeBat = false;
                this.act2.setTexture('genU');
            }else if (this.physics.overlap(player, this.act3)===true){
                this.platweens3.play();
                this.platweens3.resume();
                this.genup = true;
                this.takeBat = false;
                this.act3.setTexture('genU');
            }else if (this.physics.overlap(player, this.act4)===true){
                this.platweens4.play();
                this.platweens4.resume();
                this.genup = true;
                this.takeBat = false;
                this.genmove2.play();
                this.genmove2.resume();
                this.act4.setTexture('genU');
            }else if (this.physics.overlap(player, this.act8)===true){
                this.platweens8.play();
                this.platweens8.resume();
                this.genup = true;
                this.takeBat = false;
                this.act8.setTexture('genU');
                this.move8 = true;
            }else if (this.physics.overlap(player, this.act9)===true){
                this.platweens9.play();
                this.platweens9.resume();
                this.genup = true;
                this.takeBat = false;
                this.act9.setTexture('genU');
                this.move9 = true;
            }else if (this.physics.overlap(player, this.act10)===true){
                this.platweens10.play();
                this.platweens10.resume();
                this.genup = true;
                this.takeBat = false;
                this.act10.setTexture('genU');
                this.move10 = true;
            }else if (this.physics.overlap(player, this.act11)===true){
                this.platweens11.play();
                this.platweens11.resume();
                this.genup = true;
                this.takeBat = false;
                this.act11.setTexture('genU');
                this.move11 = true;
            }else if (this.physics.overlap(player, this.act12)===true){
                this.platweens12.play();
                this.platweens12.resume();
                this.genmove12.play()
                this.genmove12.resume()
                this.genup = true;
                this.takeBat = false;
                this.act12.setTexture('genU');
            }else if (this.physics.overlap(player, this.act5)===true){
                this.genup = true;
                this.takeBat = false;
                this.physics.moveToObject(this.act5, this.movetarget2, 100);
                this.physics.moveToObject(this.platmove5, this.movetarget, 100);
                this.act5.setTexture('genU');
            }else{
                this.pile.x = player.x + 7.50;
                this.pile.y = player.y - 32;
                this.takeBat = false;
            }
        }




        else if (this.physics.overlap(player, this.pile)){
            this.takeBat = true;
            this.pile.x = 7.50;
            this.pile.y = 7.50;

        }else if (this.physics.overlap(player, this.act1)===true){
            this.platweens.pause();
            this.genmove.pause();
            this.genup = false;
            this.takeBat = true;
            this.act1.setTexture('genD');
        }else if (this.physics.overlap(player, this.act2)===true){
            this.platweens2.pause();
            this.genup = false;
            this.takeBat = true;
            this.act2.setTexture('genD');
        }else if (this.physics.overlap(player, this.act3)===true){
            this.platweens3.pause();
            this.genup = false;
            this.takeBat = true;
            this.act3.setTexture('genD');
        }else if (this.physics.overlap(player, this.act4)===true){
            this.platweens4.pause();
            this.genmove2.pause();
            this.genup = false;
            this.takeBat = true;
            this.act4.setTexture('genD');
        }else if (this.physics.overlap(player, this.act8)===true){
            this.platweens8.pause();
            this.genup = false;
            this.takeBat = true;
            this.act8.setTexture('genD');
            this.move8 = false;
        }else if (this.physics.overlap(player, this.act9)===true){
            this.platweens9.pause();
            this.genup = false;
            this.takeBat = true;
            this.act9.setTexture('genD');
            this.move9 = false;
        }else if (this.physics.overlap(player, this.act10)===true){
            this.platweens10.pause();
            this.genup = false;
            this.takeBat = true;
            this.act10.setTexture('genD');
            this.move10 = false;
        }else if (this.physics.overlap(player, this.act11)===true){
            this.platweens11.pause();
            this.genup = false;
            this.takeBat = true;
            this.act11.setTexture('genD');
            this.move11 = false;
        }else if (this.physics.overlap(player, this.act12)===true){
            this.platweens12.pause();
            this.genmove12.pause();
            this.genup = false;
            this.takeBat = true;
            this.act12.setTexture('genD');
        }else if (this.physics.overlap(player, this.act5)===true){
            this.platmove5.setVelocity(0);
            this.act5.setVelocity(0);
            this.genup = false;
            this.takeBat = true;
            this.act5.setTexture('genD');
        }


        else if(this.physics.overlap(player, this.levier0)===true ){
            this.open0 = this.open0 === false;
            this.FunctionDoor(this.door0,this.open0,this.levier0);
        }else if(this.physics.overlap(player, this.levier1)===true ){
            this.open1 = this.open1 === false;
            this.FunctionDoor(this.door1,this.open1,this.levier1);
        }else if(this.physics.overlap(player, this.levier2)===true ){
            this.open2 = this.open2 === false;
            this.FunctionDoor(this.door2,this.open2,this.levier2);


        }else if(this.physics.overlap(player, this.levier3)===true ){
            this.open3 = this.open3 === false;
            this.FunctionDoor(this.door3,this.open3,this.levier3);

        }

    }

    Gestioncam(player){
        let me = this;
        // les tableau sont donnée comme des coordonnée soit x puis y
        // tableau 1.2
        this.physics.add.overlap(player, this.cam1, function () {
            me.cameras.main.startFollow(me.cs1,true, 1, 1);
        })
        //tableau 2.2
        this.physics.add.overlap(player, this.cam3, function () {
            me.cameras.main.startFollow(me.cs3, true, 1, 1);
        })
        // tableau 2.1
        this.physics.add.overlap(player, this.cam2, function () {
            me.cameras.main.startFollow(me.cs2, true, 1, 1);
        })
        // tableau 3-1
        this.physics.add.overlap(player, this.cam4, function () {
            me.cameras.main.startFollow(me.cs4, true, 1, 1);
        })
        // tableau 4-1
        this.physics.add.overlap(player, this.cam5, function () {
            me.cameras.main.startFollow(me.cs5, true, 1, 1);
        })
        // tableau 4-2
        this.physics.add.overlap(player, this.cam6, function () {
            me.cameras.main.startFollow(me.cs6, true, 1, 1);
        })
        // tableau 3-2
        this.physics.add.overlap(player, this.cam7, function () {
            me.cameras.main.startFollow(me.cs7, true, 1, 1);

        })
        // tableau 5-2
        this.physics.add.overlap(player, this.cam8, function () {
            me.cameras.main.startFollow(me.cs8, true, 1, 1);

        })// continuité du tableau 5-2
        this.physics.add.overlap(player, this.cam82, function () {
            me.cameras.main.startFollow(me.cs82, true, 1, 1);

        })//fin du tableau 5-2
        this.physics.add.overlap(player, this.cam81, function () {
            me.cameras.main.startFollow(me.player.player, true, 1, 0,0,143).setDeadzone(undefined,1000 );
        })// tableau 6-3
        this.physics.add.overlap(player, this.cam9, function () {
            me.cameras.main.startFollow(me.cs9, true, 1, 1);
        })
        // tableau 8-3
        this.physics.add.overlap(player, this.cam10, function () {
            me.cameras.main.startFollow(me.cs10, true, 1, 1);
        })
        // tableau 0-2
        this.physics.add.overlap(player, this.cam0, function () {
            me.cameras.main.startFollow(me.cs0, true, 1, 1);
            Battery = me.player.chargeMax;
        })
        // tableau menustart
        this.physics.add.overlap(player, this.menustart, function () {
            me.cameras.main.startFollow(me.csmenustart, true, 1, 1);
            Battery = me.player.chargeMax;
        })
        // tableau menuend
        this.physics.add.overlap(player, this.menuend, function () {
            me.cameras.main.startFollow(me.csmenuend, true, 1, 1);
            Battery = me.player.chargeMax;
        })
        // tableau presentation
        this.physics.add.overlap(player, this.presentation, function () {
            me.cameras.main.startFollow(me.cspresentation, true, 1, 1);
            Battery = me.player.chargeMax;
        })
    }

    Tweengestion(){
        this.platweens = this.tweens.add({
            targets: this.platmove1,
            y: 735,
            duration: 6000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens.pause();

        this.genmove = this.tweens.add({
            targets: this.act1,
            y: 735-64,
            duration: 6000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.genmove.pause();

        this.platweens2 = this.tweens.add({
            targets: this.platmove2,
            y: 735,
            duration: 8000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            hold: 2000,
        });
        this.platweens2.pause()

        this.platweens3 = this.tweens.add({
            targets: this.platmove3,
            y: 478,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens3.pause()

        this.platweens6 = this.tweens.add({
            targets: this.platmove6,
            y: 478,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });

        this.platweens4 = this.tweens.add({
            targets: this.platmove4,
            y: 928,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens4.pause()

        this.genmove2 = this.tweens.add({
            targets: this.act4,
            y: 928-64,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.genmove2.pause()

        this.platweens7 = this.tweens.add({
            targets: this.platmove7,
            y: 1696,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });

        this.platweens8 = this.tweens.add({
            targets: this.platmove8,
            y: 2180,
            duration: 10000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens8.pause()

        this.platweens9 = this.tweens.add({
            targets: this.platmove9,
            y: 1800,
            duration: 10000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens9.pause()

        this.platweens10 = this.tweens.add({
            targets: this.platmove10,
            y: 2280,
            duration: 10000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens10.pause()

        this.platweens11 = this.tweens.add({
            targets: this.platmove11,
            y: 2250,
            duration: 10000,
            ease: 'Sine.Stepped',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens11.pause()

        this.platweens12 = this.tweens.add({
            targets: this.platmove12,
            x: 10688,
            duration: 10000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.platweens12.pause()

        this.genmove12 = this.tweens.add({
            targets: this.act12,
            x: 10688,
            duration: 10000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            hold: 2000,
        });
        this.genmove12.pause()
    }

    FunctionDoor(door,open,levier){
        if(open === true){
            door.x = this.coorDoorx;
            levier.setTexture('levieroff');
        }else{
            this.coorDoorx = door.x;
            door.x = 10000;
            levier.setTexture('levieron');
        }
    }

    test(){
        this.upgradeL = true;

        this.up.body.setEnable(false);
    }

    stop8(){
        if( this.move8 ===false){
            this.platmove8.y = 2080;
            console.log("fujehgsg")
        }
    }
    stop9(){
        if( this.move9 ===false){
            this.platmove9.y = 2080;
            console.log("fujehgsg")
        }
    }
    stop10(){
        if( this.move10 ===false){
            this.platmove10.y = 2080;
            console.log("fujehgsg")
        }
    }
    stop11(){
        if( this.move11 ===false){
            this.platmove11.y = 2080;
            console.log("fujehgsg")
        }
    }

    update(){
        this.bgpresentation.setTexture('presentation-'+this.NumeroDePrestentation)

            if(this.upgradeL === true) {
                this.up.setTexture("UpgradeNoItem")
                if(game.input.activePointer.leftButtonDown() === true){
                    this.cantMove = true
                    this.grappin.setVelocity(0);
                    this.grappin.setVisible(true);
                    this.grappin.x = this.player.player.x;
                    this.grappin.y = this.player.player.y;
                    this.grappin.body.setEnable(true);
                    this.physics.moveToObject(this.grappin, this.target, 400);
                }
            }else{
                this.up.play('upgrade');
            }




        this.target.y = game.input.mousePointer.worldY;
        this.target.x = game.input.mousePointer.worldX;

        if(this.takeBat === false && this.genup === false){
            this.pile.setVisible(true)
        }else{
            this.pile.setVisible(false)
        }



        // console.log(this.player.player.x)
        // console.log(this.player.player.y)
        this.player.updateListrik();
    }

    // fin du programme
}
