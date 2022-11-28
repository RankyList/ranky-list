import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { CreateTierListDto } from './create-tier-list.dto';

export class ResponseTierListDto extends CreateTierListDto
{
    @IsString()
    @ApiProperty({ example: 'best-restaurants-in-my-town-4574242' })
    slug: string;

    @IsDate()
    @ApiProperty({ example: new Date().toISOString() })
    createdAt: Date | null;

    @IsDate()
    @ApiProperty({ example: new Date().toISOString() })
    updatedAt: Date | null;
}
