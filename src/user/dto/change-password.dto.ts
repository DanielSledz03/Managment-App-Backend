import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { IsEqualTo } from './is-equal-to.decorator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old password of the user',
    format: 'string',
    example: 'Example123!',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New password of the user',
    format: 'string',
    example: 'Example123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8) // Przykład minimalnej długości hasła
  @MaxLength(32) // Przykład maksymalnej długości hasła
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Hasło musi zawierać co najmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.',
    },
  )
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password of the user',
    format: 'string',
    example: 'Example123!',
  })
  @IsString()
  @IsNotEmpty()
  @IsEqualTo('newPassword', {
    message: 'Potwierdzenie hasła musi być takie samo jak nowe hasło.',
  })
  confirmPassword: string;
}
