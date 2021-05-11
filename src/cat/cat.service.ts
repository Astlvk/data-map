import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
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

  findAll() {
    return `This action returns all cat`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cat`;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    try {
      await Cat.update(id, updateCatDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} cat`;
  }
}
