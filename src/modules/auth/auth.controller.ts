import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@modules/auth/dtos/req/login.dto';
import { RegisterDto } from '@modules/auth/dtos/req/register.dto';
import {
  ApiErrorsResponse,
  ApiGetErrorsResponse,
  Public,
  Staff,
} from '@decorators';
import { RefreshTokenGuard } from '@guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetTokenDto, LoginResDto } from './dtos/res/login-res.dto';
import { GetStaffResDto } from './dtos/res';
import { Serialize } from '@interceptors';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Staff login endpoint' })
  @ApiResponse({
    status: 200,
    description: 'The staff has been successfully logged in.',
    type: LoginResDto,
  })
  @ApiBody({ type: LoginDto })
  @ApiErrorsResponse({
    excludeUnauthorized: true,
  })
  @Serialize(LoginResDto)
  async login(@Body() loginDto: LoginDto): Promise<LoginResDto> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register', description: 'Staff register endpoint' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 200,
    description: 'The staff has been successfully registered.',
    type: LoginResDto,
  })
  @ApiErrorsResponse({
    excludeUnauthorized: true,
  })
  @Serialize(LoginResDto)
  async register(@Body() registerDto: RegisterDto): Promise<LoginResDto> {
    return this.authService.register(registerDto);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout', description: 'Staff logout endpoint' })
  @ApiGetErrorsResponse()
  logout() {
    return 'Logout';
  }

  /**
   * Refresh token
   * @param user
   */
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOperation({
    summary: 'Refresh Token',
    description: 'Refresh access token endpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'The access token has been successfully refreshed.',
    type: GetTokenDto,
  })
  @ApiGetErrorsResponse()
  @Serialize(GetTokenDto)
  refresh(@Staff() staff: any) {
    const { refreshToken, email } = staff;

    return this.authService.refresh(email, refreshToken);
  }

  @Get('get-staff')
  @ApiOperation({
    summary: 'Get current staff info',
    description: 'Get current logged in staff information',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the current logged in staff information.',
    type: GetStaffResDto,
  })
  @Serialize(GetStaffResDto)
  @ApiGetErrorsResponse()
  getStaff(@Staff('id') staffId: string): Promise<GetStaffResDto> {
    return this.authService.getStaff(staffId);
  }
}
