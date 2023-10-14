import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditUsrDto {
  @ApiProperty({
    description: 'Name of the user',
    format: 'string',
    example: 'Daniel',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
