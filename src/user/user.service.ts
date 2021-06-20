import { Injectable } from '@nestjs/common';
import { PageParams } from 'src/decorators/page-params.decorator';
import { PagingLimit } from 'src/decorators/paging-limit.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.name = createUserDto.name;
      user.pass = createUserDto.pass;
      return await user.save();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  @PagingLimit<SearchUserDto, User>()
  async findByPagination(
    pageParams: PageParams,
    query: SearchUserDto,
  ): Promise<[User[], number]> {
    try {
      return await User.findAndCount({
        where: query,
        ...pageParams,
      });
    } catch (error) {
      throw error;
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByName(name: string): Promise<User | undefined> {
    try {
      const user = await User.findOne({ name })
      return user
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
