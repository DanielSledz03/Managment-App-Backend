import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token of the user',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
