import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CommitModel } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }

  @Get('commits')
  getCommits(): Promise<CommitModel[]> {
    return this.appService.getCommits();
  }
}
