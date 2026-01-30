
import React, { useRef } from 'react';
import { Card, Button } from '@cbp/ui';
import { ImagePlus, X, Rocket, Link2, Sparkles } from 'lucide-react';

interface UnifiedComposerProps {
  content: string;
  setContent: (val: string) => void;
  mediaPreview: string | null;
  onUpload: (file: File) => void;
  onRemoveMedia: () => void;
  shortenLinks: boolean;
  setShortenLinks: (val: boolean) => void;
  onBlast: () => void;
  isBlasting: boolean;
  platformCount: number;
}

export const UnifiedComposer: React.FC<UnifiedComposerProps> = ({
  content, setContent, mediaPreview, onUpload, onRemoveMedia,
  shortenLinks, setShortenLinks, onBlast, isBlasting, platformCount
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="flex-1 space-y-4">
        {/* Toolbar */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Composer</span>
           <div className="flex gap-2">
              <button 
                onClick={() => setShortenLinks(!shortenLinks)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold transition-colors ${shortenLinks ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}
              >
                <Link2 className="h-3 w-3" /> Shorten Links
              </button>
           </div>
        </div>

        {/* Text Area */}
        <textarea
          className="w-full h-40 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 resize-none text-base leading-relaxed"
          placeholder="Tulis update terbaru firma di sini... Gunakan #hashtag yang relevan."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Media Preview Area */}
        {mediaPreview ? (
          <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden group">
            <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={onRemoveMedia}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-cbp-navy dark:hover:text-cbp-gold hover:border-cbp-navy dark:hover:border-cbp-gold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
          >
            <ImagePlus className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Upload Foto / Video</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,video/*" 
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
         <div className="flex gap-2">
            <div className={`text-xs font-bold ${content.length > 280 ? 'text-red-500' : 'text-slate-400'}`}>
               {content.length} chars
            </div>
         </div>
         <Button 
           onClick={onBlast} 
           disabled={isBlasting || platformCount === 0 || (!content && !mediaPreview)}
           className="bg-cbp-navy text-white hover:bg-slate-800 dark:bg-cbp-gold dark:text-cbp-navy dark:hover:bg-white shadow-lg shadow-cbp-navy/20 dark:shadow-cbp-gold/20 px-6"
         >
           {isBlasting ? (
             <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 animate-spin" /> Blasting...</span>
           ) : (
             <span className="flex items-center gap-2"><Rocket className="h-4 w-4" /> BLAST POST ({platformCount})</span>
           )}
         </Button>
      </div>
    </Card>
  );
};
