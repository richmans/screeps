var TowerDefender = {
    run : function(tower) {
        tower = towers[tower]
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS) 
        if (hostile) { 
            tower.attack(hostile)
        }
    }
}
module.exports = TowerDefender