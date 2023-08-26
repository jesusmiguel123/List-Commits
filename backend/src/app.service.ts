import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { CommitModel, ResponseModel } from './app.interface';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService){}

  getIndex(): string {
    return 'API Index';
  }

  async getCommits(page: number): Promise<ResponseModel> {
    const pageNumber = page ?? 1;
    const previous = pageNumber != 1 ? String(pageNumber - 1) : undefined;
    let next, count;

    const url = 'https://api.github.com/repos/jesusmiguel123/Test/commits';
    
    const res = await this.httpService.get(url, {
      headers: {
        Accept: 'application/vnd.github+json'
      },
      params: {
        per_page: 3,
        page: pageNumber
      }
    })
      .pipe(
        catchError((error) => {
          throw new HttpException({
            statusCode: error.response.status,
            message: error.response.statusText
          }, error.response.status)
        })
      )
      .toPromise();
    
    const linkHeader = res?.headers?.link;
    if(linkHeader.includes('rel="next"')){
      const nextURL = linkHeader.match(/(?<=<)([\S]*)(?=>; rel="next")/i)[0];
      const queryParams = new URLSearchParams(nextURL);
      next = queryParams.get('page');
    }
    const countURL = linkHeader.match(/(?<=<)([\S]*)(?=>; rel="last")/i)[0];
    const queryParams = new URLSearchParams(countURL);
    count = queryParams.get('page');
    next = next > count ? undefined : next

    const data = res.data;
    
    const commitData = data.map(({ sha, commit }) => ({
      id: sha,
      author: commit?.author,
      committer: commit?.committer,
      message: commit?.message
    }));
    
    return {
      count: count,
      previous: previous,
      next: next,
      results: commitData
    };
  }
}
