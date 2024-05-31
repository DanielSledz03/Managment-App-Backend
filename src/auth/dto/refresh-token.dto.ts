import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty({
        description: 'Refresh token of the user',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    refresh_token: string;
}
