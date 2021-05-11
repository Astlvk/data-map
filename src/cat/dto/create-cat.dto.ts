import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  // Nest utility functions, on the other hand,
  // will exclude, pick, or apply validation decorators based on the expression you used.
  @IsNotEmpty() // updateCatDto此注解对于undefined、null无校验，但是会继续校验空字符串
  @IsString()
  readonly name: string;

  @IsString()
  readonly desc: string;
}
