import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsObject, IsString, Length, ValidationArguments } from 'class-validator';
import { TierList } from 'src/tier-lists/entities/tier-list.entity';
import { IsColor } from 'src/common/validators/is-color';
import { randomUUID } from 'crypto';

@Entity()
@Exclude()
export class TierListRank extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @ApiProperty({ description: 'The unique UUID for this tier list rank.', required: false, example: randomUUID() })
  id: string;

  @Column({ length: 50 })
  @Expose()
  @IsString({
    message: (args: ValidationArguments) => `Field '${ args.property }' must be a string, ${ typeof args.value } given.`
  })
  @IsNotEmpty({
    message: (args: ValidationArguments) => `Field '${ args.property }' cannot be empty.`
  })
  @Length(1, 25, {
    message: (args: ValidationArguments) => `Field '${ args.property }' must contain between $constraint1 and $constraint2 characters, ${ args.value?.length ?? '0' } received.`
  })
  @ApiProperty({
    examples: ['S', 'A', 'B', 'C'],
    description: 'The name of the rank.',
    minLength: 1,
    maxLength: 25
  })
  name: string;

  @Column()
  @Expose()
  @IsNotEmpty({
    message: (args: ValidationArguments) => `Field '${ args.property }' cannot be empty.`
  })
  @IsInt({
    message: (args: ValidationArguments) => `Field '${ args.targetName }' must be an integer, ${ typeof args.value } given.`
  })
  @ApiProperty({ description: 'The position of this rank (ascending).' })
  position: number;

  @Column()
  @Expose()
  @IsNotEmpty({
    message: (args: ValidationArguments) => `Field '${ args.property }' cannot be empty.`
  })
  @IsColor({
    message: (args: ValidationArguments) => `Field '${ args.property }' must be a valid RGB or Hex color.`
  })
  @ApiProperty({ description: 'The color for this rank which will be used as background.', example: '#a1b13a' })
  color: string;

  @ManyToOne(() => TierList, (tierList) => tierList.tierListRanks, { cascade: false })
  @IsObject()
  @Type(() => TierList)
  @ApiProperty({ description: 'The tier list this rank belongs to.' })
  tierList: TierList;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: 'The date this tier list rank was created at.',
    example: new Date(+new Date() - ((24*60*60*1000) * 7)).toISOString(),
    required: false
  })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Expose()
  @ApiProperty({
    description: 'The date this tier list rank was last updated at.',
    example: new Date().toISOString(),
    required: false
  })
  updatedAt: Date | null = null;
}
