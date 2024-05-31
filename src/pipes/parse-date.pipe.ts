import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
    transform(value: string): Date {
        const val = Date.parse(value);
        if (Number.isNaN(val)) {
            throw new BadRequestException(
                'Validation failed (date string is expected)',
            );
        }
        return new Date(val);
    }
}
