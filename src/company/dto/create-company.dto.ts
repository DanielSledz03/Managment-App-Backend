import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({
        description: 'Name of the company',
        format: 'string',
        example: 'FXF Corp',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Admin id',
        format: 'number',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    adminId: number;
}
