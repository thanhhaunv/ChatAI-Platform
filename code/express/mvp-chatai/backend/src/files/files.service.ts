import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PDFExtractor } from './extractors/pdf.extractor';
import { TextExtractor } from './extractors/text.extractor';

@Injectable()
export class FilesService {
  private pdfExtractor = new PDFExtractor();
  private textExtractor = new TextExtractor();

  // Max file size: 10MB
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024;

  // Allowed file types
  private readonly ALLOWED_TYPES = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  constructor(private prisma: PrismaService) {}

  validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }

    if (!this.ALLOWED_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Allowed: PDF, TXT, DOCX, JPG, PNG, GIF',
      );
    }
  }

  async extractText(file: Express.Multer.File): Promise<string> {
    try {
      switch (file.mimetype) {
        case 'application/pdf':
          return await this.pdfExtractor.extract(file.buffer);

        case 'text/plain':
          return await this.textExtractor.extractTxt(file.buffer);

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return await this.textExtractor.extractDocx(file.buffer);

        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          return await this.textExtractor.extractImage(file.buffer, file.originalname);

        default:
          throw new BadRequestException('Unsupported file type');
      }
    } catch (error) {
      throw new BadRequestException(`Failed to extract text: ${error.message}`);
    }
  }

  async processUpload(file: Express.Multer.File) {
    this.validateFile(file);

    const extractedText = await this.extractText(file);

    return {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      extractedText,
      previewText: extractedText.substring(0, 500) + (extractedText.length > 500 ? '...' : ''),
    };
  }
}
