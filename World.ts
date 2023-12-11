import { EcsEidType, IEcsEntity } from "./Entity";
import { EcsSystem } from "./System";

export class EcsWorld {
    private _last_update_time = 0;

    private _system_list: EcsSystem[] = [];
    private _entity_map = new Map<EcsEidType, IEcsEntity>;

    public addSystem(system: EcsSystem){
        this._system_list.push(system);
    }
    
    public addEntity(entity: IEcsEntity){
        this._entity_map.set(entity.eid, entity);
        for(let sys of this._system_list.values()){
            if(sys.filter(entity)){
                sys.addEntity(entity);
            }
        }
    }

    public delEntity(entity: IEcsEntity){
        for(let sys of this._system_list.values()){
            if(sys.filter(entity)){
                sys.addEntity(entity);
            }
        }
    }

    public getEntity(eid: EcsEidType){
        return this._entity_map.get(eid);
    }

    public update(){
        if(this._last_update_time == 0){
            this._last_update_time = Date.now()
            return;
        }

        let deltaTime = Date.now() - this._last_update_time;
        this._last_update_time = Date.now();

        for(let sys of this._system_list.values()){
            sys.update(deltaTime);
        }
    }
}