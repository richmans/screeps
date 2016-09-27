var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    var towers = _.filter(Game.structures, {structureType: STRUCTURE_TOWER})
    
    for (var tower in towers) {
        tower = towers[tower]
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS) 
        if (hostile) { 
            tower.attack(hostile)
        }
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