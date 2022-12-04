import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  JoinTable
} from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString, Length, MaxLength, ValidateIf, ValidateNested, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TierListRank } from 'src/tier-list-ranks/entities/tier-list-rank.entity';
import { getSlug, getUniqueSlug } from 'src/common/utils/slugify';
import { randomUUID } from 'crypto';

@Entity()
@Exclude()
export class TierList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @ApiProperty({ description: 'The unique UUID for this tier list.', required: false, example: randomUUID() })
  id: string;

  @Column({ length: 100 })
  @Expose()
  @IsString({
    message: (args: ValidationArguments) => `Field '${ args.property }' must be a string, ${ typeof args.value } given.`
  })
  @IsNotEmpty({
    message: (args: ValidationArguments) => `Field '${ args.property }' cannot be empty.`
  })
  @Length(3, 100, {
    message: (args: ValidationArguments) => `Field '${ args.property }' must contain between $constraint1 and $constraint2 characters, ${ args.value?.length ?? '0' } received.`
  })
  @ApiProperty({
    example: 'Best restaurants in my town',
    description: 'The name of the tier list. Will be used to define the slug.',
    minLength: 3,
    maxLength: 100
  })
  name: string;

  @Column({ unique: true })
  @Expose()
  @ApiProperty({
    example: getUniqueSlug('Best restaurants in my town'),
    description: 'The unique slug for this tier list, based on its name.',
    required: false
  })
  slug: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  @ValidateIf(t => t.description !== null && t.description !== undefined)
  @IsString({
    message: (args: ValidationArguments) => `Field '${ args.property }' must be a string, ${ typeof args.value } given.`
  })
  @MaxLength(10000, {
    message: (args: ValidationArguments) => `Field '${ args.property }' expected a maximum of $constraint1 characters, ${ args.value?.length ?? 'null' } received.`
  })
  @ApiProperty({
    example: 'All the restaurants around my town are ranked here!',
    description: 'Description of what the tier list is about.',
    required: false,
    maxLength: 10000,
    nullable: true
  })
  description?: string | null = null;

  @Column({ type: 'boolean', default: true })
  @Expose()
  @IsBoolean({
    message: (args: ValidationArguments) => `Field '${ args.property }' must be a boolean, ${ typeof args.value } given.`
  })
  @IsNotEmpty({
    message: (args: ValidationArguments) => `Field '${ args.property }' cannot be empty.`
  })
  @ApiProperty({ description: 'Is this tier list supposed to be visible to everyone?', required: false })
  public = true;

  @ManyToOne(() => TierList, (template) => template.tierLists, { cascade: false })
  @Expose()
  @ApiProperty({ description: 'The template this tier list is based on.', required: false })
  template: null | TierList = null;

  @OneToMany(() => TierList, (tierList) => tierList.template, { cascade: false })
  @Expose()
  @ApiProperty({
    description: 'The tier lists using this tier list as a template.',
    required: false,
    example: []
  })
  tierLists: TierList[];

  @Column({ type: 'boolean', default: true })
  @Expose()
  @IsBoolean({
    message: (args: ValidationArguments) => `Field '${ args.property }' must be a boolean, ${ typeof args.value } given.`
  })
  @IsNotEmpty({
    message: (args: ValidationArguments) => `Field '${ args.property }' cannot be empty.`
  })
  @ApiProperty({ description: 'Is this tier list usable as a template?', required: false })
  canBeTemplate = true;

  @OneToMany(
    () => TierListRank, (tierListRank) => tierListRank.tierList,
    {
      cascade: true,
      orphanedRowAction: 'delete',
      persistence: true,
      eager: true,
      onDelete: 'CASCADE'
    }
  )
  @Expose()
  @IsArray()
  @Type(() => TierListRank)
  @ApiProperty({
    description: 'All the ranks contained by this tier list.',
    required: true,
    example: [{ name: 'S', position: 0, color: '#aaad49' }, { name: 'A', position: 1, color: 'rgb(69, 176, 65)' }] as TierListRank[]
  })
  tierListRanks: TierListRank[];

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: 'The date this tier list was created at.',
    example: new Date(+new Date() - ((24*60*60*1000) * 7)).toISOString(),
    required: false
  })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Expose()
  @ApiProperty({
    description: 'The date this tier list was last updated at.',
    example: new Date().toISOString(),
    required: false
  })
  updatedAt: Date | null = null;

  @BeforeInsert()
  addSlug() {
    this.slug = getUniqueSlug(this.name);
  }

  @BeforeUpdate()
  updateSlug() {
    const slug = getSlug(this.name);

    if (!this.slug.includes(slug)) {
      this.slug = getUniqueSlug(this.name);
    }
  }
}
