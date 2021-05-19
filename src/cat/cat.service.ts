import { Injectable } from '@nestjs/common';
import { PageParams } from 'src/decorators/page-params.decorator';
import { PagingLimit } from 'src/decorators/paging-limit.decorator';
import { DeleteResult } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { SearchCatDto } from './dto/search-cat-dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  async create({ name, desc }: CreateCatDto) {
    try {
      const cat: Cat = new Cat(name, desc);
      await cat.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Cat[]> {
    try {
      return await Cat.find();
    } catch (error) {
      throw error;
    }
  }

  @PagingLimit<SearchCatDto, Cat>()
  async findByPagination(
    pageParams: PageParams,
    query: SearchCatDto,
  ): Promise<[Cat[], number]> {
    try {
      console.log(pageParams);
      const res = await Cat.findAndCount({
        where: query,
        ...pageParams,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Cat> {
    try {
      return Cat.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    try {
      await Cat.update(id, updateCatDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await Cat.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
