import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsInt()
  statusId: number;
}
