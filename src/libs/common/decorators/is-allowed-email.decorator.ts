// src/auth/validators/is-allowed-email.decorator.ts
import { BLOCKED_EMAIL_DOMAINS } from '@/constants/blocked-domains'

import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'IsAllowedEmailConstraint', async: false })
class IsAllowedEmailConstraint implements ValidatorConstraintInterface {
	validate(email: string, args: ValidationArguments) {
		if (typeof email !== 'string') return false

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) return false

		const domain = email.split('@')[1]?.toLowerCase()
		if (!domain) return false

		return !BLOCKED_EMAIL_DOMAINS.some(blocked =>
			domain.endsWith(blocked.toLowerCase())
		)
	}

	defaultMessage(validationArguments?: ValidationArguments) {
		return 'Enter a valid email (addresses with Russian TLDs are not allowed).'
	}
}

export function IsAllowedEmail(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsAllowedEmailConstraint
		})
	}
}
