import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Cat extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  desc: string;
}
