import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  // @Transform(({ obj }) => obj.collection.id)
  // @Expose()
  // collectionId: number;
}
