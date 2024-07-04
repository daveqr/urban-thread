export interface TransformationService<Model, DTO> {
  transform(entity: Model): DTO;
}
