import { PrismaService } from '@/prisma/prisma.service'

import { Injectable, NotFoundException } from '@nestjs/common'
import { AuthMethod } from '@prisma/client'

import { hash } from 'argon2'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}
	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			include: { accounts: true }
		})
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return user
	}

	public async findByEmail(email: string) {
		const user = await this.prismaService.user.findUnique({
			where: { email },
			include: { accounts: true }
		})
		return user
	}
	public async create(
		firsName: string,
		lastName: string,
		email: string,
		password: string,
		method: AuthMethod,
		isVerified: boolean,
		phone?: string,
		bio?: string,
		pictures?: string
	) {
		const user = await this.prismaService.user.create({
			data: {
				firstName: firsName,
				lastName: lastName,
				email,
				phone,
				password: password ? await hash(password) : '',
				bio,
				pictures,
				method,
				isVerified
			},
			include: { accounts: true }
		})
		return user
	}
}
