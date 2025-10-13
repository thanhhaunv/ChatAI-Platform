import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  title?: string;
}
