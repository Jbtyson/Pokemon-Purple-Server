// batleManager.js
var Battle = require("./battle.js").Battle;

var BattleManager = function(_pokemonService) {
    pokemonService = _pokemonService;
    var battles = [];
    var typeModifiers = [];
    var battleIdCounter = 0;

    var init = function() {
      buildTypeRelations();
    }

    var buildTypeRelations =function() {
      pokemonService.retrieveAllTypeRelations(function(relations) {
        typeModifiers = relations;
      });
    }

    var onMoveSelected = function(playerId, moveId, callback) {
      console.log("=====================================");
      console.log(battles[0]);
      console.log("=====================================");
      battles[0].onMoveSelected(playerId, moveId, function(response) {
        callback(response);
      });
    }

    var createBattleWithWildPokemon = function(playerId, playerPokemonInstance, wildPokemonInstance) {
      var battleId = battleIdCounter++;
      var playerIds = {
        player1: playerId,
        player2: "AI"
      };
      var pokemons = {
        pokemon1: playerPokemonInstance,
        pokemon2: wildPokemonInstance
      };
      var battle = new Battle(battleId, playerIds, pokemons);
      console.log("=====================================");
      console.log(battle);
      console.log("=====================================");
      battles.push(battle);
    }

    var getTypeToTypeModifier = function(attackingTypeId, defendingTypeId) {
      return typeModifiers[attackingTypeId][defendingTypeId];
    }

    return {
      battles: battles,
      init: init,
      onMoveSelected: onMoveSelected,
      createBattleWithWildPokemon: createBattleWithWildPokemon
    }
};
exports.BattleManager = BattleManager;
