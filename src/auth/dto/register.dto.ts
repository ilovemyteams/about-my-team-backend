import { IsAllowedEmail } from '@/libs/common/decorators/is-allowed-email.decorator'
import { IsInternationalPhone } from '@/libs/common/decorators/is-international-phone.decorator'
import { IsPasswordMatchingConstraint } from '@/libs/common/decorators/is-password-matching-constraind.decorator'
import { IsSupportedCountry } from '@/libs/common/decorators/is-supported-country.decorator'

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
	Validate
} from 'class-validator'

export class RegisterDto {
	@ApiProperty({
		description: "User's first name",
		example: 'John',
		minLength: 2,
		maxLength: 100,
		pattern: "/^(?=.*[A-Za-zÀ-žÆÐŒæđœß])[\\dA-Za-zÀ-žÆÐŒæđœß\\' -]+$/"
	})
	@IsString({ message: 'First name must be a string.' })
	@IsNotEmpty({ message: 'First name should not be empty.' })
	@MinLength(2, { message: 'First name must be at least 2 characters long.' })
	@MaxLength(100, {
		message: 'First name must be at most 100 characters long.'
	})
	@Matches(/^(?=.*[A-Za-zÀ-žÆÐŒæđœß])[\dA-Za-zÀ-žÆÐŒæđœß' -]+$/, {
		message:
			'Name must contain at least one letter and may include letters, digits, spaces, apostrophes, hyphens, and diacritics only.'
	})
	firstName: string

	@ApiProperty({
		description: "User's last name",
		example: 'Doe',
		minLength: 2,
		maxLength: 100,
		pattern: "/^(?=.*[A-Za-zÀ-žÆÐŒæđœß])[\\dA-Za-zÀ-žÆÐŒæđœß\\' -]+$/"
	})
	@IsString({ message: 'Last name must be a string.' })
	@IsNotEmpty({ message: 'Last name should not be empty.' })
	@MinLength(2, { message: 'Last name must be at least 2 characters long.' })
	@MaxLength(100, {
		message: 'Last name must be at most 100 characters long.'
	})
	@Matches(/^(?=.*[A-Za-zÀ-žÆÐŒæđœß])[\dA-Za-zÀ-žÆÐŒæđœß' -]+$/, {
		message:
			'Name must contain at least one letter and may include letters, digits, spaces, apostrophes, hyphens, and diacritics only.'
	})
	lastName: string

	@ApiProperty({
		description: "User's email address",
		example: 'john.doe@example.com',
		format: 'email'
	})
	@IsString({ message: 'Email must be a string.' })
	@IsNotEmpty({ message: 'Email should not be empty.' })
	@IsEmail({}, { message: 'Email must be a valid email address.' })
	@IsAllowedEmail({
		message:
			'Enter a valid email (addresses with Russian TLDs are not allowed).'
	})
	email: string

	@ApiProperty({
		description: "User's password",
		example: 'SecurePass123',
		minLength: 8,
		maxLength: 100,
		format: 'password'
	})
	@IsString({ message: 'Password must be a string.' })
	@IsNotEmpty({ message: 'Password should not be empty.' })
	@MinLength(8, { message: 'Password must be at least 8 characters long.' })
	@MaxLength(100, {
		message: 'Password must be at most 100 characters long.'
	})
	password: string

	@ApiProperty({
		description: 'Password confirmation (must match password)',
		example: 'SecurePass123',
		minLength: 1,
		format: 'password'
	})
	@Validate(IsPasswordMatchingConstraint, {
		message: 'Password confirmation does not match the password.'
	})
	@IsString({ message: 'Password confirmation must be a string.' })
	@IsNotEmpty({ message: 'Password confirmation should not be empty.' })
	passwordConfirmation: string

	@ApiPropertyOptional({
		description: "User's phone number in international format",
		example: '+1234567890',
		pattern: '/^\\+[1-9]\\d{1,14}$/'
	})
	@IsInternationalPhone({
		message:
			'Enter a valid phone number in international format (Russian numbers are not allowed).'
	})
	@IsNotEmpty({ message: 'Phone number should not be empty.' })
	@IsString({ message: 'Phone number must be a string.' })
	phoneNumber?: string

	@ApiPropertyOptional({
		description: "User's country of residence",
		example: 'US',
		enum: [
			'US',
			'CA',
			'GB',
			'DE',
			'FR',
			'AU',
			'JP',
			'KR',
			'SG',
			'NL',
			'SE',
			'NO',
			'DK',
			'FI',
			'PL',
			'IT',
			'ES',
			'PT',
			'BE',
			'AT',
			'CH',
			'IE',
			'NZ',
			'ZA',
			'BR',
			'MX',
			'AR',
			'CL',
			'CO',
			'PE',
			'UY',
			'EC',
			'BO',
			'PY',
			'GY',
			'SR',
			'TT',
			'BB',
			'JM',
			'BS',
			'DO',
			'HT',
			'CU',
			'PR',
			'VI',
			'VG',
			'AI',
			'MS',
			'KN',
			'AG',
			'VC',
			'GD',
			'LC',
			'DM',
			'VC',
			'BB',
			'JM',
			'BS',
			'DO',
			'HT',
			'CU',
			'PR',
			'VI',
			'VG',
			'AI',
			'MS',
			'KN',
			'AG',
			'VC',
			'GD',
			'LC',
			'DM'
		]
	})
	@IsString({ message: 'Country must be a string.' })
	@IsSupportedCountry({
		message: 'Selected country is not supported (Russia is not allowed).'
	})
	@IsOptional()
	country?: string

	@ApiPropertyOptional({
		description: 'LinkedIn profile or company URL',
		example: 'https://www.linkedin.com/in/john-doe',
		pattern:
			'/^https:\\/\\/www\\.linkedin\\.com\\/(in|company)\\/[A-Za-z0-9\\-_%]+\\/?$/'
	})
	@IsOptional()
	@IsString({ message: 'LinkedIn profile must be a string.' })
	@Matches(
		/^https:\/\/www\.linkedin\.com\/(in|company)\/[A-Za-z0-9\-_%]+\/?$/,
		{
			message:
				'Provide a valid LinkedIn URL (profile or company). Example: https://www.linkedin.com/in/ivan-ivanov or https://www.linkedin.com/company/iva'
		}
	)
	linkedin?: string

	@ApiPropertyOptional({
		description: 'GitHub username or profile URL',
		example: 'johndoe',
		pattern:
			'/^(?:https:\\/\\/www\\.github\\.com\\/)?(?!.*\\.\\.|\\.|.*\\.$)[A-Za-z0-9._]{1,100}$/'
	})
	@IsOptional()
	@IsString({ message: 'GitHub profile must be a string.' })
	@Matches(
		/^(?:https:\/\/www\.github\.com\/)?(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9._]{1,100}$/,
		{
			message:
				'Provide a valid GitHub username or URL. Only 1–100 characters, Latin letters, digits, dots or underscores; cannot start or end with a dot; no double dots.'
		}
	)
	github?: string

	@ApiPropertyOptional({
		description: 'Instagram username or profile URL',
		example: 'john_doe_official',
		pattern:
			'/^(?:https:\\/\\/www\\.instagram\\.com\\/)?(?!.*\\.\\.|\\.|.*\\.$)[A-Za-z0-9._]{1,30}$/'
	})
	@IsOptional()
	@IsString({ message: 'Instagram handle must be a string.' })
	@Matches(
		/^(?:https:\/\/www\.instagram\.com\/)?(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9._]{1,30}$/,
		{
			message:
				'Provide a valid Instagram username or URL. Only 1–30 characters, Latin letters, digits, dots or underscores; cannot start or end with a dot; no double dots.'
		}
	)
	instagram?: string

	@ApiPropertyOptional({
		description: 'Telegram username or WhatsApp phone number',
		example: 'johndoe',
		pattern: '/^(?:[A-Za-z0-9_]{5,32}|\\+\\d{8,15})$/'
	})
	@IsOptional()
	@IsString({ message: 'Telegram or WhatsApp contact must be a string.' })
	@Matches(/^(?:[A-Za-z0-9_]{5,32}|\+\d{8,15})$/, {
		message:
			'Enter a valid Telegram username (5–32 characters, letters, numbers, underscores) or a WhatsApp number in international format (+123456789).'
	})
	telegramOrWhatsApp?: string

	@IsOptional()
	@MinLength(2)
	@MaxLength(100)
	@IsString({ message: 'Company name must be a string.' })
	@Matches(/^(?=.*[A-Za-zÀ-žÆÐŒæđœß0-9])[A-Za-zÀ-žÆÐŒæđœß0-9 &'().-]+$/, {
		message:
			"Enter a valid company name (2–100 chars, Latin letters with diacritics, numbers, spaces, &'()-.) or leave blank."
	})
	company?: string
}
