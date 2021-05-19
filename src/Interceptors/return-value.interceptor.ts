import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagingResults } from 'src/interfaces/paging-results.interface';
import { FindAndCountReturn } from 'src/interfaces/type-orm-wrap.interface';

@Injectable()
export class ReturnValueInterceptor<T>
  implements NestInterceptor<FindAndCountReturn<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<FindAndCountReturn<T>>,
  ): Observable<PagingResults<T>> {
    return next.handle().pipe(
      map((data) => {
        const res: PagingResults<T> = {
          data: data[0],
          total: data[1],
        };
        return res;
      }),
    );
  }
}
