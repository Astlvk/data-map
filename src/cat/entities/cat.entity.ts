import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Cat extends BaseEntity {
  constructor(name, desc) {
    super();
    this.name = name;
    this.desc = desc;
  }

  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  desc: string;
}
