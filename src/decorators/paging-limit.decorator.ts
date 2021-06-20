import { HttpException, HttpStatus } from '@nestjs/common';
import { FindAndCountReturn } from 'src/interfaces/type-orm-wrap.interface';
import { PageParams } from './page-params.decorator';

/**
 * 用于typeorm分页极限值处理的装饰器，只处理最大极限值情况。
 */
export function PagingLimit<Dto, Entity>(): MethodDecorator {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    const originMethod = descriptor.value;

    const newMethod: (
      pageParams: PageParams,
      dto: Dto,
    ) => Promise<FindAndCountReturn<Entity>> = async function (
      pageParams: PageParams,
      dto: Dto,
    ) {
      if (pageParams.skip === undefined) {
        throw new HttpException(
          {
            message: `在装饰器PagingLimit内pageParams.skip不能为undefined`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (pageParams.take === undefined) {
        throw new HttpException(
          {
            message: `在装饰器PagingLimit内pageParams.take不能为undefined`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // 控制最小极限值
      if (pageParams.skip < 0) pageParams.skip = 0; // 装饰器形式，此处不保证skip一定是数字

      const [list, total] = (await originMethod.call(
        this,
        pageParams,
        dto,
      )) as FindAndCountReturn<Entity>;

      let res: FindAndCountReturn<Entity> = [list, total];

      // 控制最大极限值
      if (list.length === 0 && total > 0) {
        // take为每页大小
        const { take } = pageParams;

        // 总页数 = 总条数 / 每页大小，有余数则 + 1
        const divisible = total % take === 0;
        let totalPage = Math.floor(total / take);
        if (!divisible) totalPage += 1;

        pageParams.skip = totalPage * take - take; // 更新页数

        res = (await originMethod.call(
          this,
          pageParams,
          dto,
        )) as FindAndCountReturn<Entity>;
      }

      return res;
    };

    descriptor.value = newMethod;
  };
}
