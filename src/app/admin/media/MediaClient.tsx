"use client";

import { useState } from "react";
import { UploadCloud, Search, Filter, Folder, Image as ImageIcon, Trash2, Grid, List as ListIcon } from "lucide-react";
import { uploadMediaAction, deleteMediaAction } from "@/app/actions/media";
import Image from "next/image";

// A fixed list of buckets available for the user
export const MEDIA_BUCKETS = [
  'products', 'collections', 'categories', 'banners', 'avatars', 'hero', 'pages', 'logos', 'public_assets'
];

type MediaFile = {
  id: string;
  file_name: string;
  file_path: string;
  bucket: string;
  mime_type: string;
  size: number;
  created_at: string;
};

export default function MediaClient({ initialFiles, supabaseUrl }: { initialFiles: MediaFile[], supabaseUrl: string }) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles);
  const [selectedBucket, setSelectedBucket] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const totalSize = files.reduce((acc, f) => acc + (f.size || 0), 0);
  // Max arbitrary 10GB = 10 * 1024 * 1024 * 1024
  const storageMax = 10 * 1024 * 1024 * 1024;
  const storagePercentage = Math.min((totalSize / storageMax) * 100, 100);

  const filteredFiles = files.filter(f => {
    const matchesBucket = selectedBucket === "all" || f.bucket === selectedBucket;
    const matchesSearch = f.file_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBucket && matchesSearch;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Prompt user for which bucket to upload to, defaulting to public_assets
    const targetBucket = window.prompt(
      `Dans quel dossier voulez-vous téléverser ?\nOptions: ${MEDIA_BUCKETS.join(', ')}`,
      selectedBucket === 'all' ? 'public_assets' : selectedBucket
    );

    if (!targetBucket || !MEDIA_BUCKETS.includes(targetBucket)) {
      alert("Dossier invalide ou annulé.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("bucket", targetBucket);

    const result = await uploadMediaAction(formData);
    if (!result.success) {
      alert("Erreur: " + result.error);
    } else {
      // Reload page to get new files
      window.location.reload();
    }
    setIsUploading(false);
  };

  const handleDelete = async (id: string, bucket: string, path: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce fichier ?")) return;

    const result = await deleteMediaAction(id, bucket, path);
    if (result.success) {
      setFiles(files.filter(f => f.id !== id));
    } else {
      alert("Erreur: " + result.error);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-1 min-h-0">
      
      {/* Sidebar Folders */}
      <div className="w-64 border-r border-outline-variant hidden md:flex flex-col bg-surface-variant/10 shrink-0">
        <div className="p-4 border-b border-outline-variant">
          <h3 className="font-bold text-xs uppercase tracking-wider text-secondary">Dossiers (Buckets)</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <button 
            onClick={() => setSelectedBucket('all')}
            className={`w-full flex justify-between items-center px-3 py-2 ${selectedBucket === 'all' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-surface-variant'} font-medium rounded-md text-sm transition-colors`}
          >
            <span className="flex items-center gap-2"><Folder size={16} className={selectedBucket === 'all' ? "fill-primary/20" : "fill-transparent"} /> Tous</span>
            <span className="text-xs bg-white/50 px-1.5 rounded">{files.length}</span>
          </button>
          
          {MEDIA_BUCKETS.map((bucket) => {
            const count = files.filter(f => f.bucket === bucket).length;
            const isSelected = selectedBucket === bucket;
            return (
              <button 
                key={bucket} 
                onClick={() => setSelectedBucket(bucket)}
                className={`w-full flex justify-between items-center px-3 py-2 ${isSelected ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-surface-variant'} font-medium rounded-md text-sm transition-colors group`}
              >
                <span className="flex items-center gap-2"><Folder size={16} className={isSelected ? "fill-primary/20" : "fill-transparent group-hover:fill-surface-variant transition-colors"} /> {bucket}</span>
                <span className="text-xs bg-surface-variant px-1.5 rounded">{count}</span>
              </button>
            )
          })}
        </div>
        <div className="p-4 border-t border-outline-variant">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-secondary font-medium">Stockage utilisé</span>
            <span className="font-bold">{formatSize(totalSize)} / 10 GB</span>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{width: `${storagePercentage}%`}}></div>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-variant/30 shrink-0">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher des fichiers multimédias..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white"
            />
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleUpload}
                disabled={isUploading}
              />
              <label 
                htmlFor="file-upload" 
                className={`flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <UploadCloud size={18} />
                {isUploading ? 'Téléversement...' : 'Téléverser'}
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-surface/30 custom-scrollbar">
          {filteredFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-secondary">
              <ImageIcon size={48} className="mb-4 opacity-20" />
              <p>Aucun fichier trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFiles.map((file) => {
                const isImage = file.mime_type?.startsWith('image/');
                const publicUrl = `${supabaseUrl}/storage/v1/object/public/${file.bucket}/${file.file_path}`;

                return (
                  <div key={file.id} className="bg-white border border-outline-variant rounded-lg overflow-hidden group hover:border-primary transition-colors hover:shadow-sm cursor-pointer flex flex-col relative">
                    <div className="aspect-square bg-surface-variant relative flex items-center justify-center p-4">
                      {isImage ? (
                         <Image src={publicUrl} alt={file.file_name} fill className="object-cover" />
                      ) : (
                         <ImageIcon size={32} className="text-secondary opacity-50" />
                      )}
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <a href={publicUrl} target="_blank" rel="noreferrer" className="p-2 bg-white text-on-surface hover:text-primary rounded-full transition-colors"><Search size={16} /></a>
                        <button onClick={(e) => { e.preventDefault(); handleDelete(file.id, file.bucket, file.file_path); }} className="p-2 bg-white text-red-600 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="p-3 border-t border-outline-variant flex-1 flex flex-col justify-between">
                      <p className="font-body-sm font-medium text-on-surface truncate" title={file.file_name}>{file.file_name}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-secondary">{formatSize(file.size)}</span>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase">{file.bucket}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
