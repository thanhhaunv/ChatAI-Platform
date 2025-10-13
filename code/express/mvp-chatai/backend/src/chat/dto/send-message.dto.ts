import { IsString, IsInt, IsOptional, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsInt()
  agentId: number;

  @IsOptional()
  @IsString()
  threadId?: string; // Optional: if not provided, creates new thread
}
