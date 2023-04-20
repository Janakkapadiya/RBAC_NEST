import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthLoginDto } from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';

import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { LoginGuard } from '../../common/guards/login.guard';

import { AuthUseCases } from 'src/usecases/auth/auth-usecase';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCases) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessTokenCookie = await this.authUseCase.getCookieWithJwtToken(
      auth.email,
    );
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);
    return 'Login successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: any) {
    const cookie = await this.authUseCase.logout();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('is_authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  async isAuthenticated(@Req() request: any) {
    const user = await this.authUseCase.isAuthenticated(request.user.email);
    const response = new IsAuthPresenter();
    response.email = user.email;
    return response.email;
  }
}
