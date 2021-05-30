import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PageParams } from 'src/decorators/page-params.decorator';
import { ReturnValueInterceptor } from 'src/Interceptors/return-value.interceptor';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { SearchCatDto } from './dto/search-cat-dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      return await this.catService.create(createCatDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(ReturnValueInterceptor)
  async findByPagination(
    @PageParams() paraParams: PageParams,
    @Query() query: SearchCatDto,
  ) {
    try {
      return await this.catService.findByPagination(paraParams, query);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.catService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    try {
      return await this.catService.update(id, updateCatDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.catService.remove(id);
  }
}
