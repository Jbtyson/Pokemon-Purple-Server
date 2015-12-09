// gameManager.js
var RegionManager = require("./regionManager.js").RegionManager;
var WildPokemonManager = require("./wildPokemonManager.js").WildPokemonManager;
var PlayerManager = require("./playerManager.js").PlayerManager;
var BattleManager = require("./battleManager.js").BattleManager;

var GameManager = function(regionService, pokemonService, playerService) {
    var users = [];
    var regionManager = new RegionManager(regionService);
    var playerManager = new PlayerManager(playerService);
    var battleManager = new BattleManager(pokemonService);
    var wildPokemonManager = new WildPokemonManager(this, pokemonService, playerService);

    var addUser = function(user) {
      users.push(user);
      playerManager.newPlayerConnected(user.player);
    }

    var removeUser = function(user) {
      return -1;
    }

    var startGame = function() {
      regionManager.init();
      wildPokemonManager.init();
      playerManager.init();
    }

    var messageUser = function(userId, messageType, message) {
      for(i = 0; i < users.length; i++) {
        if(users.player.playerId === userId) {
          console.log("Sending user message: " + messsageType);
          console.log(message);
          users.socket.emit(messageType, message);
        }
      }
    }

    return {
      regionManager: regionManager,
      wildPokemonManager: wildPokemonManager,
      playerManager: playerManager,
      battleManager: battleManager,
      users: users,
      addUser: addUser,
      removeUser: removeUser,
      startGame: startGame
    }
};
exports.GameManager = GameManager;
