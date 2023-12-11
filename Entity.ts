type EcsEidFunc = () => string | number;
export type EcsEidType = string | number | EcsEidFunc;

export interface IEcsEntity{
    eid: EcsEidType;
    ecs_tags_set: Set<string>;
}