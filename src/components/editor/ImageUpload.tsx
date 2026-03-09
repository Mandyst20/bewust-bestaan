import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, Link, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>(value && !value.includes('page-assets') ? 'url' : 'upload');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      
      const { error } = await supabase.storage
        .from('page-assets')
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('page-assets')
        .getPublicUrl(path);

      onChange(publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err.message);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium text-muted-foreground">{label}</p>}
      
      {value && (
        <div className="relative group">
          <img src={value} alt="" className="w-full h-24 rounded-lg object-cover border border-border" />
          <button
            onClick={() => onChange('')}
            className="absolute top-1 right-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="flex gap-1">
        <Button
          type="button"
          variant={mode === 'upload' ? 'default' : 'ghost'}
          size="sm"
          className="text-[10px] h-7 flex-1"
          onClick={() => setMode('upload')}
        >
          <Upload className="mr-1 h-3 w-3" />
          Upload
        </Button>
        <Button
          type="button"
          variant={mode === 'url' ? 'default' : 'ghost'}
          size="sm"
          className="text-[10px] h-7 flex-1"
          onClick={() => setMode('url')}
        >
          <Link className="mr-1 h-3 w-3" />
          URL
        </Button>
      </div>

      {mode === 'upload' ? (
        <div className="relative">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={uploading}
          />
          <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 text-xs text-muted-foreground hover:border-primary hover:bg-primary/5 transition-colors">
            {uploading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Uploaden...</>
            ) : (
              <><Upload className="h-4 w-4" /> Klik of sleep een afbeelding</>
            )}
          </div>
        </div>
      ) : (
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className="text-xs"
        />
      )}
    </div>
  );
}
