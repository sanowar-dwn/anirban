import React, { useState } from 'react';
import { Modal } from './Modal';
import { Copy, Check, MessageCircle } from 'lucide-react';
import { Button } from './Button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share This Story" maxWidth="md">
      <div className="space-y-4">
        <p className="text-sm text-[#59655E]">
          Help us find loving homes and support by sharing <strong className="text-[#1E2421]">{title}</strong> with your community.
        </p>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#D8CEBE] hover:bg-[#EDF8F3] transition-colors text-center"
          >
            <MessageCircle className="w-6 h-6 text-[#25D366] mb-1.5" />
            <span className="text-xs font-medium text-[#1E2421]">WhatsApp</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#D8CEBE] hover:bg-[#F3EFE8] transition-colors text-center"
          >
            <svg className="w-6 h-6 text-[#1877F2] mb-1.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-xs font-medium text-[#1E2421]">Facebook</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#D8CEBE] hover:bg-[#F3EFE8] transition-colors text-center"
          >
            <svg className="w-6 h-6 text-[#1DA1F2] mb-1.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
            </svg>
            <span className="text-xs font-medium text-[#1E2421]">X / Twitter</span>
          </a>
        </div>

        {/* Direct Link Copy */}
        <div className="pt-2">
          <label className="text-xs font-medium text-[#75837B] block mb-1.5">Direct Page Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-[#F3EFE8] border border-[#D8CEBE] rounded-lg px-3 py-2 text-xs text-[#3E4742] select-all outline-none"
            />
            <Button
              size="sm"
              variant={copied ? 'primary' : 'outline'}
              onClick={handleCopy}
              icon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
