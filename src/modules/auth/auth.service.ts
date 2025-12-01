import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '@modules/auth/dtos/req/login.dto';
import { RegisterDto } from '@modules/auth/dtos/req/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from '@database/entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { comparePassword, hashPassword } from '@shared/utils';
import { JwtPayload } from '@modules/auth/strategies/access-token.strategy';
import { GetTokenDto, LoginResDto } from './dtos/res/login-res.dto';
import { GetStaffResDto } from './dtos/res';
import { plainToInstance } from 'class-transformer';

/**
 * Auth service
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Login staff
   * @param loginDto
   */
  async login(loginDto: LoginDto): Promise<LoginResDto> {
    const staff = await this.staffRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!staff) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatch = await comparePassword(
      loginDto.password,
      staff.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.getTokens(staff);

    return plainToInstance(
      LoginResDto,
      {
        ...tokens,
        staff,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  /**
   * Register staff
   * @param registerDto
   */
  async register(registerDto: RegisterDto): Promise<LoginResDto> {
    registerDto.password = await hashPassword(registerDto.password);
    const staff = await this.staffRepository.save(registerDto);

    const tokens = await this.getTokens(staff);

    return plainToInstance(
      LoginResDto,
      {
        ...tokens,
        staff,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  logout() {
    console.log('logout');

    return true;
  }

  /**
   * Refresh access token
   * @param email
   * @param refreshToken
   */
  async refresh(email: string, refreshToken: string): Promise<GetTokenDto> {
    const staff = await this.staffRepository.findOne({
      where: { email },
    });
    const { accessToken } = await this.getTokens(staff);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Generate access and refresh tokens
   * @param staff
   */
  async getTokens(staff: StaffEntity): Promise<GetTokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: staff.id,
          name: staff.name,
          email: staff.email,
        } as JwtPayload,
        {
          secret: this.configService.get<string>('app.jwt.accessSecret'),
          expiresIn: this.configService.get<string>('app.jwt.accessExpiresIn'),
        },
      ),
      this.jwtService.signAsync(
        {
          id: staff.id,
          name: staff.name,
          email: staff.email,
        } as JwtPayload,
        {
          secret: this.configService.get<string>('app.jwt.refreshSecret'),
          expiresIn: this.configService.get<string>('app.jwt.refreshExpiresIn'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async getStaff(id: string): Promise<GetStaffResDto> {
    const staff = await this.staffRepository.findOne({ where: { id } });

    return plainToInstance(GetStaffResDto, staff, {
      excludeExtraneousValues: true,
    });
  }
}
