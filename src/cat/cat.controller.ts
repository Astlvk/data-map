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
} from '@nestjs/common';
import { PageParams } from 'src/decorators/page-params.decorator';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { SearchCatDto } from './dto/search-cat-dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
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

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      await this.catService.create(createCatDto);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);
    try {
      await this.catService.update(id, updateCatDto);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.catService.remove(id);
  }
}
