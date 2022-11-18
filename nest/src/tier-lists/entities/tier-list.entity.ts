import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TierList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  public: boolean;
}
