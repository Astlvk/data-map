import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export interface PageParams {
  skip?: number;
  take?: number;
}

export const PageParams = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { pageSize: oPageSize, pageNum: oPageNum } = request.query;
    const pageSize = Number(oPageSize);
    const pageNum = Number(oPageNum);

    // 意外情况处理
    if (oPageSize !== undefined) {
      if (isNaN(pageSize)) {
        throw new HttpException(`pageSize必须为数字`, HttpStatus.BAD_REQUEST);
      }
      if (pageSize < 0) {
        throw new HttpException('pageSize不能小于0', HttpStatus.BAD_REQUEST);
      }
    }
    if (oPageNum !== undefined) {
      if (isNaN(pageNum)) {
        throw new HttpException(`pageNum必须为数字`, HttpStatus.BAD_REQUEST);
      }
      if (pageNum === 0) {
        throw new HttpException('pageNum不能为0', HttpStatus.BAD_REQUEST);
      }
    }

    const skip = pageNum * pageSize - pageSize;
    const take = pageSize;
    const res: PageParams = {
      skip,
      take,
    };

    return res;
  },
);
