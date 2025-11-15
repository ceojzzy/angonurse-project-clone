import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UploadedImage {
  name: string;
  url: string;
  path: string;
  size: number;
  originalSize: number;
}

export const ImageUploader = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const convertToWebP = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image'));
              return;
            }
            resolve(blob);
          }, 'image/webp', 0.9);
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const uploadToSupabase = async (file: File): Promise<UploadedImage> => {
    const webpBlob = await convertToWebP(file);
    const fileName = file.name.replace(/\.[^/.]+$/, '.webp');
    const filePath = `${Date.now()}-${fileName}`;

    const { data, error } = await supabase.storage
      .from('site-images')
      .upload(filePath, webpBlob, {
        contentType: 'image/webp',
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(filePath);

    return {
      name: fileName,
      url: publicUrl,
      path: data.path,
      size: webpBlob.size,
      originalSize: file.size
    };
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUploadedImages: UploadedImage[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Erro",
            description: `${file.name} não é uma imagem válida`,
            variant: "destructive"
          });
          continue;
        }

        const uploaded = await uploadToSupabase(file);
        newUploadedImages.push(uploaded);
      }

      setUploadedImages(prev => [...prev, ...newUploadedImages]);
      toast({
        title: "Sucesso",
        description: `${newUploadedImages.length} imagem(ns) enviada(s) para a CDN`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erro",
        description: "Erro ao fazer upload das imagens",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copiado!",
      description: "URL copiada para a área de transferência",
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6" />
          Upload de Imagens para CDN
        </CardTitle>
        <CardDescription>
          Envie imagens para o Supabase Storage (CDN Global)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            disabled={isUploading}
            className="flex-1"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Enviando..." : "Upload"}
          </Button>
        </div>

        {uploadedImages.length > 0 && (
          <div className="grid gap-4">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 space-y-2">
                  <p className="font-medium text-sm">{image.name}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Original: {formatBytes(image.originalSize)}</span>
                    <span>WebP: {formatBytes(image.size)}</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {Math.round((1 - image.size / image.originalSize) * 100)}% menor
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                      {image.url}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(image.url)}
                      size="sm"
                      variant="ghost"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <p className="text-sm font-medium">📋 Como usar:</p>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Faça upload das imagens (são convertidas automaticamente para WebP)</li>
            <li>As imagens são armazenadas na CDN global do Supabase</li>
            <li>Copie a URL e use diretamente no site</li>
            <li>As URLs são públicas e otimizadas para performance</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
