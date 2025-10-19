import { RegisterDto } from '@/auth/dto/register.dto'
import { UserService } from '@/user/user.service'

import { ConflictException, Injectable } from '@nestjs/common'
import { AuthMethod } from '@prisma/client'

@Injectable()
export class AuthService {
	public constructor(private readonly userService: UserService) {}

	public async register(dto: RegisterDto) {
		const isExists = await this.userService.findByEmail(dto.email)
		const isExistsByPhone = await this.userService.findByPhone(
			dto.phoneNumber
		)
		if (isExists || isExistsByPhone) {
			throw new ConflictException('User already exists')
		}

		const newUser = await this.userService.create(
			dto.firstName,
			dto.lastName,
			dto.email,
			dto.password,
			AuthMethod.EMAIL,
			false,
			dto.phoneNumber,
			'',
			'',
			'',
			'',
			'',
			''
		)

		return newUser
	}

	public async login() {}

	public async logout() {}

	private async saveSession() {}
}
