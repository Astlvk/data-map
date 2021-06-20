import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;
}
