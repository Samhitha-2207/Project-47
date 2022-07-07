class Player{
    constructor(){
        this.index = null;
        this.playerName = null;
        this.individualScore = 0;
        this.teamScore = 0;
        this.score = null;
        this.rank = null;
        this.teamName = null;
    }

    getTeamInfo(){
        var teamPlayerIndex = 'playerTeam/player'+this.index;
        database.ref(teamPlayerIndex).set({
            playerName:this.playerName
        })
    }
    updateTeam(){
        database.ref('/').set({
            playerName:this.playerName
        })
    }
    getPlayerCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",(data)=>{
          playerCount = data.val();
        })
      }
    updatePlayerCount(count){
        database.ref('/').update({
          playerCount: count
        });
    }
    getScore(){
        var teamScoreValues = database.ref('score');
        teamScoreValues.on("values",(data)=>{
            this.score = data.val();
        })
    }
     updateScore(){
        database.ref('/').update({
            score:this.score
          });
    }
    getRankInfo(){
        var rankInfo = database.ref('rank');
        rankInfo.on("value",(data)=>{
            this.rank = data.val();
        })
    }

    updateRank(rank){
        database.ref('/').set({
            rank:rank
        })
    }
    static getPlayerInfo(){
        var playerInfoRef = database.ref('player');
        playerInfoRef.on("value",(data)=>{
          allPlayers = data.val();
        })
      }
}

