import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsEqualTo(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (target: unknown, propertyName: string) {
        registerDecorator({
            name: 'isEqualTo',
            target: target.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as Record<string, any>)[
                        relatedPropertyName
                    ];
                    return (
                        typeof value === typeof relatedValue &&
                        value === relatedValue
                    );
                },
            },
        });
    };
}
