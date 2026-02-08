import { Controller, Get, HttpCode, HttpStatus, NotAcceptableException, NotImplementedException, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";

@Controller('auth-v2')
export class PassportAuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login() {
        return "Success";
    }

    @Get('me')
    getUserInfo() {
        throw new NotImplementedException()
    }
}