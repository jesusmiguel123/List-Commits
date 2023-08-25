import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { CommitModel } from './app.interface';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService){}

  getIndex(): string {
    return 'API Index';
  }

  async getCommits(): Promise<CommitModel[]> {
    const url = 'https://api.github.com/repos/jesusmiguel123/Test/commits';
    const res = this.httpService.get(url).pipe(
      catchError((error) => {
        throw new HttpException({
          statusCode: error.response.status,
          message: error.response.statusText
        }, error.response.status)
      })
    );
    const { data } = await firstValueFrom(res);
    const response = data.map(({ sha, commit }) => ({
      id: sha,
      author: commit?.author,
      commiter: commit?.committer,
      message: commit?.message
    }));
    return response;
  }
}
