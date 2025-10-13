import { IsString, IsInt, IsOptional, MinLength, IsArray } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsInt()
  agentId: number;

  @IsOptional()
  @IsString()
  threadId?: string;

  @IsOptional()
  @IsArray()
  attachments?: Array<{
    filename: string;
    extractedText: string;
  }>;
}
