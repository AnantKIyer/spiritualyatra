"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  getUploadUrlAction,
  resolveStorageUrlAction,
} from "@/app/admin/actions";

interface ImageManagerProps {
  mainImage: string;
  gallery: string[];
  onMainImageChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
}

export default function ImageManager({
  mainImage,
  gallery,
  onMainImageChange,
  onGalleryChange,
}: ImageManagerProps) {
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allImages = Array.from(
    new Set([mainImage, ...gallery].filter(Boolean)),
  );

  async function handleFileUpload(file: File) {
    setIsUploading(true);
    setError(null);
    try {
      const { uploadUrl } = await getUploadUrlAction();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) throw new Error("Upload failed");
      const { storageId } = (await result.json()) as { storageId: string };
      const { url } = await resolveStorageUrlAction(storageId);
      if (!url) throw new Error("Could not resolve image URL");
      onGalleryChange([...gallery, url]);
      if (!mainImage) onMainImageChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  function addUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onGalleryChange([...gallery, trimmed]);
    if (!mainImage) onMainImageChange(trimmed);
    setUrlInput("");
  }

  function removeImage(url: string) {
    onGalleryChange(gallery.filter((item) => item !== url));
    if (mainImage === url) {
      const remaining = gallery.filter((item) => item !== url);
      onMainImageChange(remaining[0] ?? "");
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink-900 mb-2">
          Main image
        </label>
        {mainImage ? (
          <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden border border-ink-200">
            <Image
              src={mainImage}
              alt="Main"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <p className="text-sm text-ink-500">No main image selected.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <label className="cursor-pointer">
          <span className="inline-flex items-center px-4 py-2 rounded-xl bg-saffron-500 text-white text-sm font-semibold hover:bg-saffron-600 transition-colors">
            {isUploading ? "Uploading…" : "Upload image"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFileUpload(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      <div className="flex gap-2">
        <Input
          label="Add image URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://..."
          className="flex-1"
        />
        <div className="flex items-end">
          <Button type="button" variant="outline" size="md" onClick={addUrl}>
            Add
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {allImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {allImages.map((url) => (
            <div
              key={url}
              className="relative group rounded-xl overflow-hidden border border-ink-200 aspect-video"
            >
              <Image
                src={url}
                alt="Gallery"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-ink-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                {mainImage !== url && (
                  <button
                    type="button"
                    onClick={() => onMainImageChange(url)}
                    className="text-xs text-white bg-saffron-500 px-2 py-1 rounded"
                  >
                    Set main
                  </button>
                )}
                {mainImage === url && (
                  <span className="text-xs text-saffron-300 font-medium">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="text-xs text-white bg-red-500 px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
