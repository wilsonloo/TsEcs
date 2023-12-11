import { EcsEidType, IEcsEntity } from "./Entity";

// export interface IEcsSystem {
//     filter : (entity: IEcsEntity) => boolean;
    
//     addEntity: (entity: IEcsEntity) => void;

//     process: (entity: IEcsEntity, deltaTime: number) => void;

//     // process(entity:any, deltaTime: number) => void;
// }

export class EcsSystem {
    filter : (entity: IEcsEntity) => boolean;
    process: (entity: IEcsEntity, deltaTime: number) => void;

    entities: IEcsEntity[] = [];

    _delay_adds: IEcsEntity[] = [];
    _delay_dels: EcsEidType[] = [];

    addEntity(entity: IEcsEntity){
        this._delay_adds.push(entity);
    }

    update(deltaTime: number){
        if(this.process){
            for(let e of this.entities.values()){
                this.process(e, deltaTime);
            }
        }

        this.lastUpdate();
    }

    lastUpdate(){
        if(this._delay_adds.length > 0){
            for(let e of this._delay_adds.values()){
                this.entities.push(e);
            }
            this._delay_adds.length = 0;
        }

        if(this._delay_dels.length > 0){
            for(let eid of this._delay_dels.values()){
                for(let k of this.entities.keys()){
                    if(this.entities[k].eid == eid){
                        this.entities.slice(k);
                        break;
                    }
                }
            }
        }
    }
}