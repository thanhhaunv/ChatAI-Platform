'use client';

import { X, FileText, Image } from 'lucide-react';

interface Attachment {
  filename: string;
  mimetype: string;
  size: number;
  extractedText: string;
  previewText: string;
}

interface Props {
  attachment: Attachment;
  onRemove: () => void;
}

export default function AttachmentDisplay({ attachment, onRemove }: Props) {
  const isImage = attachment.mimetype.startsWith('image/');

  return (
    <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex-shrink-0">
        {isImage ? (
          <Image size={20} className="text-blue-600" />
        ) : (
          <FileText size={20} className="text-blue-600" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-900 truncate">
          {attachment.filename}
        </p>
        <p className="text-xs text-gray-500">
          {(attachment.size / 1024).toFixed(2)} KB
        </p>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {attachment.previewText}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 hover:bg-blue-100 rounded"
      >
        <X size={16} className="text-gray-500" />
      </button>
    </div>
  );
}
