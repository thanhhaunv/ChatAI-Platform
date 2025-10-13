import * as mammoth from 'mammoth';

export class TextExtractor {
  async extractTxt(buffer: Buffer): Promise<string> {
    return buffer.toString('utf-8');
  }

  async extractDocx(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      throw new Error(`Failed to extract DOCX: ${error.message}`);
    }
  }

  async extractImage(buffer: Buffer, filename: string): Promise<string> {
    // For images, we return metadata (OCR would require tesseract.js)
    return `[Image: ${filename}, Size: ${(buffer.length / 1024).toFixed(2)} KB]`;
  }
}
