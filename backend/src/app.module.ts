import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SocietyModule } from './society/society.module';
import { CustomersModule } from './customers/customers.module';
import { SitesModule } from './sites/sites.module';
import { CountryModule } from './country/country.module';
import { ProjectModule } from './project/project.module';
import { LinkModule } from './link/link.module';
import { EquipmentModule } from './equipment/equipment.module';
import { QualityControlModule } from './quality-control/quality-control.module';
import { AcceptanceModule } from './acceptance/acceptance.module';
import { AgentModule } from './agent/agent.module';
import { PlanningModule } from './planning/planning.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { FilialeModule } from './filiale/filiale.module';
import { Society } from './society/entities/society.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegionsModule } from './regions/regions.module';
import { ProjetSiteModule } from './projet-site/projet-site.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BudgetModule } from './budget/budget.module';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseTypeModule } from './expense-type/expense-type.module';
import { SupplierModule } from './supplier/supplier.module';
import { ExpenseApprovalModule } from './expense-approval/expense-approval.module';
import { FundRequestModule } from './fund-request/fund-request.module';
import { FundDisbursementModule } from './fund-disbursement/fund-disbursement.module';
import { FundRequestApprovalModule } from './fund_request_approval/fund_request_approval.module';
import { TeamsModule } from './teams/teams.module';
import { TeamMemberModule } from './team-member/team-member.module';
import { InstallationModule } from './installation/installation.module';
import { InstallationStatusHistoryModule } from './installation_status_history/installation_status_history.module';



@Module({
  imports: [
    UsersModule,
    AuthModule,
    SocietyModule,
    CustomersModule,
    SitesModule,
    CountryModule,
    ProjectModule,
    LinkModule,
    EquipmentModule,
    QualityControlModule,
    AcceptanceModule,
    AgentModule,
    PlanningModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          port: config.get<number>('MAIL_PORT'),
          // secure: config.get<boolean>('MAIL_SECURE') || false, 
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get<string>('MAIL_FROM')}>`,
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
    FilialeModule,
    RegionsModule,
    ProjetSiteModule,
    BudgetModule,
    ExpenseModule,
    ExpenseTypeModule,
    SupplierModule,
    ExpenseApprovalModule,
    FundRequestModule,
    FundDisbursementModule,
    FundRequestApprovalModule,
    TeamsModule,
    TeamMemberModule,
    InstallationModule,
    InstallationStatusHistoryModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule { }
