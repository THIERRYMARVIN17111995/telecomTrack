import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService,
  
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sendMail')
  sendMail():void{
    return this.appService.sendMail()
  }
}
