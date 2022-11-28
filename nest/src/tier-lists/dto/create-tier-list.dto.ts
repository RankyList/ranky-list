import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, Length, MaxLength, ValidateIf, ValidationArguments } from "class-validator";

export class CreateTierListDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @Length(3, 100, {
    message: (args: ValidationArguments) => `Name must contain between $constraint1 and $constraint2 characters, ${args.value?.length ?? '0'} received.`
  })
  @ApiProperty({
    example: 'Best restaurants in my town',
    description: 'The name of the tier list. Will be used to define the slug.',
    required: true,
    minLength: 3,
    maxLength: 100
  })
  name: string;

  @IsString()
  @ValidateIf(t => t.description !== null)
  @MaxLength(10000, {
    message: (args: ValidationArguments) => `Description is too long. Maximum of $constraint1 characters expected, ${args.value?.length ?? 'null'} received.`
  })
  @ApiProperty({
    example: 'All the best restaurants around my town ranked here!',
    description: 'Description of what the tier list is about.',
    required: false,
    maxLength: 10000,
    nullable: true
  })
  description: string | null = null;

  @IsBoolean()
  @ApiProperty({
    description: 'Is this tier list supposed to be visible to everyone?',
    required: true,
    default: 'true'
  })
  public = true;
}
