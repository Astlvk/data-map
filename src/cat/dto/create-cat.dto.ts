import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty() // updateCatDto此注解无效
  @IsString()
  readonly name: string;

  @IsString()
  readonly desc: string;
}
