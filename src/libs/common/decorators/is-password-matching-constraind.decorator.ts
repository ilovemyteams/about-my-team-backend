import { RegisterDto } from '@/auth/dto/register.dto'

import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'IsPasswordMatchingConstraint', async: false })
export class IsPasswordMatchingConstraint
	implements ValidatorConstraintInterface
{
	public validate(passwordConfirmation: string, args: ValidationArguments) {
		const object = args.object as RegisterDto
		return object.password === passwordConfirmation
	}
	public defaultMessage(validationArguments?: ValidationArguments) {
		return 'Password confirmation does not match the password.'
	}
}
