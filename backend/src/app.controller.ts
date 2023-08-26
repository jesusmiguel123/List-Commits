import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseModel } from './app.interface';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }

  @Get('commits')
  getCommits(
    @Query('page') page: number
  ): Promise<ResponseModel> {
    return this.appService.getCommits(page);
  }
}
