import { EcsFilter } from "../Filter";
import { EcsSystem } from "../System";
import { EcsWorld } from "../World";

class Monster {
    eid: number;
    ecs_tags_set = new Set<string>;
}

class test{
    static test(){
        let world = new EcsWorld;

        let patrol_system = EcsSystem.Create()
        patrol_system.filter = EcsFilter.requireAll("patrol_com")
        world.addSystem(patrol_system);

        let monster = new Monster;
        monster.eid = 33;
        
        world.addEntity(monster);
        world.update();
    }
}