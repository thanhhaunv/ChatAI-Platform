import * as pdfParse from 'pdf-parse';

export class PDFExtractor {
  async extract(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      throw new Error(`Failed to extract PDF: ${error.message}`);
    }
  }
}
