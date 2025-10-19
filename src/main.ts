import { AppModule } from './app.module'
import { ms, StringValue } from './libs/common/utils/ms.util'
import { parseBoolean } from './libs/common/utils/parse-boolean.util'

import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { RedisStore } from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import IORedis from 'ioredis'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const redis = new IORedis(config.getOrThrow('REDIS_URI'))

	app.use(cookieParser(config.get<string>('COOKIE_SECRET')))
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGINS'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	app.use(
		session({
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				domain: config.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
				httpOnly: parseBoolean(
					config.getOrThrow<string>('SESSION_HTTP_ONLY')
				),
				secure: parseBoolean(
					config.getOrThrow<string>('SESSION_SECURE')
				),
				sameSite: 'lax'
			},
			store: new RedisStore({
				client: redis,
				prefix: config.getOrThrow<string>('SESSION_FOLDER')
			})
		})
	)

	// Swagger setup
	const swaggerConfig = new DocumentBuilder()
		.setTitle('About My Team API')
		.setDescription(
			`REST API for About My Team platform.

This API provides endpoints for user registration, authentication, and team management.

## Authentication
Currently supports email-based registration and authentication.

## Features
- User registration with comprehensive validation
- Session-based authentication
- Social media profile integration
- Country-based restrictions (Russia not supported)
- Email domain validation

## Getting Started
1. Register a new account using the /auth/register endpoint
2. Use session cookies for subsequent authenticated requests`
		)
		.setVersion('1.0')
		.setContact(
			'API Support',
			'https://aboutmyteam.com/support',
			'support@aboutmyteam.com'
		)
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')
		.addServer('http://localhost:3000', 'Development server')
		.addServer('https://api.aboutmyteam.com', 'Production server')
		.addTag('auth', 'Authentication endpoints')
		.addTag('users', 'User management endpoints')
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
			displayRequestDuration: true,
			filter: true,
			showExtensions: true,
			showCommonExtensions: true,
			docExpansion: 'list',
			defaultModelsExpandDepth: 2,
			defaultModelExpandDepth: 2
		},
		customSiteTitle: 'About My Team API Documentation',
		customfavIcon: '/favicon.ico',
		customJs: [
			'https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js'
		],
		customCssUrl: [
			'https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css'
		]
	})

	await app.listen(config.getOrThrow<number>('PORT') || 3000)
}

void bootstrap()
