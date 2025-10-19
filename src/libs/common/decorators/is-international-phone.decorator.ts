// src/auth/validators/is-international-phone.decorator.ts
import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

@ValidatorConstraint({ name: 'IsInternationalPhoneConstraint', async: false })
class IsInternationalPhoneConstraint implements ValidatorConstraintInterface {
	validate(phone: string, args: ValidationArguments) {
		if (typeof phone !== 'string') return false

		try {
			const phoneNumber = parsePhoneNumberFromString(phone)
			if (!phoneNumber || !phoneNumber.isValid()) return false

			const country = phoneNumber.country
			if (country === 'RU') return false

			return true
		} catch {
			return false
		}
	}

	defaultMessage(validationArguments?: ValidationArguments) {
		return 'Enter a valid phone number in international format (Russian numbers are not allowed).'
	}
}

export function IsInternationalPhone(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsInternationalPhoneConstraint
		})
	}
}
