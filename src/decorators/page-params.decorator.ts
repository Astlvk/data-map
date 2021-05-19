import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isNonZeroPositiveInteger } from 'src/utils/reg';

export interface PageParams {
  skip?: number;
  take?: number;
}

export const PageParams = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const {
      pageSize: oPageSize,
      pageNum: oPageNum,
    }: {
      pageSize: undefined | string;
      pageNum: undefined | string;
    } = request.query;

    // 字段存在时校验是否符合要求
    if (oPageSize !== undefined) {
      if (!isNonZeroPositiveInteger(oPageSize)) {
        throw new HttpException(
          `pageSize必须为非零正整数`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    // 字段存在时校验是否符合要求
    if (oPageNum !== undefined) {
      if (!isNonZeroPositiveInteger(oPageNum)) {
        throw new HttpException(
          `pageNum必须非零正整数`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const pageSize = Number(oPageSize);
    const pageNum = Number(oPageNum);

    // 计算分页偏移量
    const skip = pageNum * pageSize - pageSize;
    const take = pageSize;
    const res: PageParams = {
      skip,
      take,
    };

    return res;
  },
);
