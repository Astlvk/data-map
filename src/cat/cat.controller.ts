import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      await this.catService.create(createCatDto);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(id);
  }

  @Put(':id')
  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.catService.remove(id);
  }
}
