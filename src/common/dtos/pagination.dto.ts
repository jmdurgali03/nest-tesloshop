import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {

    @ApiProperty({
        example: 10,
        description: 'Number of items per page',
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        example: 0,
        description: 'Number of items to skip',
    })
    @IsOptional()
    @Type(() => Number)
    offset?: number
}