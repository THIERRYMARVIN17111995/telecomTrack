import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(  private mailerService:MailerService){
    
  }
  getHello(): string {
    return 'Hello World!';
  }

  sendMail(): void {
    this.mailerService.sendMail({
      to:'nivramtechnologies@gmail.com',
      from:'princegires4@gmail.com',
      subject:'Testing Nest MailerModule',
      text:'Welcome',
      html:'<b>Welcome</b>'
    })
  }
}
