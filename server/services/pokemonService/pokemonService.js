// pokemonService.js
var PokemonDbao = require("./pokemonDbao.js").PokemonDbao;

var PokemonService = function(db) {
    var pokemonDbao = new PokemonDbao(db);

    var retrievePokemonInstanceById = function(pkmnInstId, callback) {
      pokemonDbao.retrievePokemonInstanceById(pkmnInstId, function(pkmnInst) {
        callback(pkmnInst);
      });
    }

    var retrievePokemonById = function(pkmnId, callback) {
      pokemonDbao.retrievePokemonById(pkmnId, function(pokemon) {
        callback(pokemon);
      });
    }

    var retrieveAllWildPokemon = function(callback) {
      pokemonDbao.retrieveAllWildPokemon(function(pkmn) {
        callback(pkmn);
      });
    }

    var retrieveWildPokemonForDemo = function(callback) {
      pokemonDbao.retrievePokemonInstanceById(2, function(pkmn) {
        callback(pkmn);
      });
    }

    return {
      pokemonDbao: pokemonDbao,
      retrievePokemonInstanceById: retrievePokemonInstanceById,
      retrievePokemonById: retrievePokemonById,
      retrieveAllWildPokemon: retrieveAllWildPokemon,
      retrieveWildPokemonForDemo: retrieveWildPokemonForDemo
    }
};
exports.PokemonService = PokemonService;
