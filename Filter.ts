import { IEcsEntity } from "./Entity";

export class EcsFilter {
    static requireAll(tags: string){
        let tag_list = tags.split(",")
        return function(entity: IEcsEntity){
            for(let tag of tag_list.values()){
                if(!entity.ecs_tags_set.has(tag))
                    return false;
            }
            return true;
        }
    }
}