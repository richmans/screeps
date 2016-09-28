var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towerDefender = require('tower.defender');
var spawner = require('spawner');

module.exports.loop = function () {
    console.log("=============TICK==============")
    for(var name in Game.rooms) {
        spawner.run(Game.rooms[name])
    }
    
    var towers = _.filter(Game.structures, {structureType: STRUCTURE_TOWER})
    for (var tower in _.filter(Game.structures, {structureType: STRUCTURE_TOWER})) {
        towerDefender.run(tower);
    }
    
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}