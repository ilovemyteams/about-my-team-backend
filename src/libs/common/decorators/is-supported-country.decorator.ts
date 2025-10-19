import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

const BLOCKED_COUNTRIES = ['RU'] // ISO 3166-1 alpha-2

@ValidatorConstraint({ name: 'IsSupportedCountryConstraint', async: false })
class IsSupportedCountryConstraint implements ValidatorConstraintInterface {
	validate(countryCode: string, args: ValidationArguments) {
		if (typeof countryCode !== 'string') return false

		if (!/^[A-Z]{2}$/.test(countryCode)) return false

		return !BLOCKED_COUNTRIES.includes(countryCode.toUpperCase())
	}

	defaultMessage(validationArguments?: ValidationArguments) {
		return 'Selected country is not supported (Russia is not allowed).'
	}
}

export function IsSupportedCountry(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsSupportedCountryConstraint
		})
	}
}
