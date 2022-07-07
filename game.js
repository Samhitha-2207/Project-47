class Game{
    constructor(){
        
    }
    getGameState(){
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }
    updateGameState(state){
        database.ref('/').update({
            gameState: state
        });
    }
    async start(){
        player = new Player();

        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            playerCount = player.getPlayerCount();
        }

        form = new Form()
        form.display();

        ball = createSprite(1000,500);
        ball.addImage(ballImg);
        ball.scale = 0.05;
        
        var goalkeeper = createSprite(1800,500);
        goalkeeper.addImage(playerImg);
        goalkeeper.scale = 0.125;

        var defender1 = createSprite(1500,250);
        defender1.addImage(playerImg);
        defender1.scale = 0.125;

        var defender2 = createSprite(1500,750);
        defender2.addImage(playerImg);
        defender2.scale = 0.125;

        var midfielder1 = createSprite(1100,225);
        midfielder1.addImage(playerImg);
        midfielder1.scale = 0.125;

        var midfielder2 = createSprite(1100,725);
        midfielder2.addImage(playerImg);
        midfielder2.scale = 0.125;

        var striker1 = createSprite(300,200);
        striker1.addImage(playerImg);
        striker1.scale = 0.125;

        var striker2 = createSprite(300,700);
        striker2.addImage(playerImg);
        striker2.scale = 0.125;

        players = [goalkeeper,defender1,defender2,midfielder1,midfielder2,striker1,striker2];

        var cgoalkeeper = createSprite(200,500);
        cgoalkeeper.addImage(computerImg);
        cgoalkeeper.scale = 0.125;

        var cdefender1 = createSprite(500,250);
        cdefender1.addImage(computerImg);
        cdefender1.scale = 0.125;

        var cdefender2 = createSprite(500,750);
        cdefender2.addImage(computerImg);
        cdefender2.scale = 0.125;

        var cmidfielder1 = createSprite(900,225);
        cmidfielder1.addImage(computerImg);
        cmidfielder1.scale = 0.125;

        var cmidfielder2 = createSprite(900,725);
        cmidfielder2.addImage(computerImg);
        cmidfielder2.scale = 0.125;

        var cstriker1 = createSprite(1700,200);
        cstriker1.addImage(computerImg);
        cstriker1.scale = 0.125;

        var cstriker2 = createSprite(1700,700);
        cstriker2.addImage(computerImg);
        cstriker2.scale = 0.125;

        cplayers = [cgoalkeeper,cdefender1,cdefender2,cmidfielder1,cmidfielder2,cstriker1,cstriker2];
    }
    play(){
        form.hide();
        form.resetButtonPosition();
        form.bgHide();

        Player.getPlayerInfo();
        player.getRankInfo();

        console.log("Hello world!");

        if(allPlayers !== undefined){
            background(courtImg);

            for(var plr in allPlayers){
                /*if(keyDown(RIGHT_ARROW)){
                    plr.y = plr.y - 10;
                }
                if(keyDown(LEFT_ARROW)){
                    plr.y = plr.y + 10;
                }*/
                
                plr.y = World.mouseY;

                index = index + 1 ;

                players[index-1].x = x;
                players[index-1].y = y;

                if (index === player.index){
                    players[index - 1].shapeColor = "black";
                    camera.position.x = displayWidth/2;
                    camera.position.y = players[index-1].y
                    ellipse(x,y,70);
                }

                goalkeeper.bounce("edges");
                defender1.bounce("edges");
                defender2.bounce("edges");
                midfielder1.bounce("edges");
                midfielder2.bounce("edges");
                striker1.bounce("edges");
                striker2.bounce("edges");

                cgoalkeeper.bounce("edges");
                cdefender1.bounce("edges");
                cdefender2.bounce("edges");
                cmidfielder1.bounce("edges");
                cmidfielder2.bounce("edges");
                cstriker1.bounce("edges");
                cstriker2.bounce("edges");

                cdefender1.velocityY = 10;
                cdefender2.velocityY = 10;
                cmidfielder1.velocityY = 10;
                cmidfielder2.velocityY = 10;
                cstriker1.velocityY = 10;
                cstriker2.velocityY = 10;
            }
            
        }

        if(ball.x>1850){
            players.score = players.score + 1;
            players.updateScore();
        }
        if(ball.x<150){
            cplayers.score = cplayers.score + 1;
            cplayers.updateScore();
        }

        if(players.score === 5 || cplayers.score === 5){
            game.updateGameState(2);
            
            if(players.score === 5){
                players.updateRank(1);
                cplayers.updateRank(2);
            }
            if(cplayers.score === 5){
                cplayers.updateRank(1);
                players.updateRank(2);
            }
        }

        drawSprites();
    }
    end(){
        //call function getScore() here
    }
}