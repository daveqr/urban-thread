export interface TransformationService<Entity, DTO> {
    transform(entity: Entity): DTO;
}
