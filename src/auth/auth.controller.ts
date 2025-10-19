import { AuthService } from './auth.service'
import { RegisterDto } from '@/auth/dto/register.dto'

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.OK)
	public async register(@Body() dto: RegisterDto): Promise<any> {
		return this.authService.register(dto)
	}
}
