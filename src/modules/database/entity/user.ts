/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../enumeration/index';

@Entity()
export class User extends BaseEntity {
  constructor(defaults?: IUser) {
    super();
    if (defaults) {
      Object.assign(this, defaults);
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  @Index()
  email: string;

  @Column('text')
  password: string;

  @Column('enum', { enum: Role, default: Role.User })
  @Index()
  role: Role;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
