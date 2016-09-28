var Spawner = {
    plantSites: function(room) {
        var sites = room.find(FIND_MY_CONSTRUCTION_SITES);
        if (sites.length > 0) return;
        var spawns = room.find(FIND_MY_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_SPAWN}})
        var spawn = spawns[0]
        var extensions = room.find(FIND_MY_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_EXTENSION}})
        var requiredExtensionsPerLevel = {
            1: 0,
            2: 	5,
            3: 10,
            4: 20,
            5: 30,
            6: 40,
            7: 50,
            8: 60
        }
        var requiredExtensions = requiredExtensionsPerLevel[room.controller.level]
        var pos = spawn.pos
        pos.y += 1
        pos.x -= 3
        while (room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y).length > 0) {
            pos.x += 1
            if (pos.x - spawn.x > 3) {
                pos.x -= 6
                pos.y += 1
            }
        }
        room.createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION)
    },
    run: function(room) {
        this.plantSites(room)
        var spawns = room.find(FIND_MY_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_SPAWN}})
        var spawn = spawns[0]
        
        var wants = []
        var templates = {
            "harvester": [WORK, CARRY, MOVE],
            "upgrader": [WORK, CARRY, MOVE],
            "builder": [WORK, CARRY, MOVE]
        }
        var requireds = {
            "harvester": 1,
            "upgrader": 1,
            "builder": 3
        }
        var haves = {}
        for (var name in requireds) {
            var have = _.filter(Game.creeps, function(creep) { return creep.memory.role == name}).length
            console.log(name + ": " + have)
            haves[name]=have
            if (have < requireds[name]) {
                wants.push(name)
            }
        }
        if (wants.length == 0) return;
        var want = wants[0];
        console.log("I want a " + want)
        var creepTemplate = templates[want]
        if (spawn.canCreateCreep(creepTemplate) == OK) {
            spawn.createCreep(creepTemplate, undefined, {role: want})
        } else {
            console.log("Can't make it")
        }
    }
}

module.exports = Spawner