import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import {ClassesModule} from '../class/classes.module';
import {UserModule} from '../user';
import {RoomsModule} from '../room/rooms.module';
import {ConfigModule, ConfigService} from '../config';
import { TimetableModule } from 'modules/timetable';

@Module({
  imports: [
    UserModule,
    ClassesModule,
    TimetableModule,
    RoomsModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            ...(
              configService.get('JWT_EXPIRATION_TIME')
                ? {
                  expiresIn: 9999999999999,
                }
                : {}
            ),
          },
        };
      },
      inject: [
        ConfigService,
      ],
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule { }
