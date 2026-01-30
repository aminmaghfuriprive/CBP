
"use client";

import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { SocialPost, SocialPlatform } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const useSocialBlastLogic = () => {
  const { addNotification } = useNotifications();

  // Queries
  const accounts = useLiveQuery(() => db.socialAccounts.toArray()) || [];
  const history = useLiveQuery(() => db.socialPosts.orderBy('date').reverse().toArray()) || [];

  // Form State
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [shortenLinks, setShortenLinks] = useState(false);
  const [isBlasting, setIsBlasting] = useState(false);

  // Actions
  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handleMediaUpload = (file: File) => {
    setMediaFile(file);
    const objectUrl = URL.createObjectURL(file);
    setMediaPreview(objectUrl);
  };

  const removeMedia = () => {
    setMediaFile(null);
    if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    setMediaPreview(null);
  };

  const blastPost = async () => {
    if (!content && !mediaFile) {
      addNotification('Gagal', 'Konten atau gambar tidak boleh kosong.', 'warning');
      return;
    }
    if (selectedPlatforms.length === 0) {
      addNotification('Gagal', 'Pilih minimal satu platform tujuan.', 'warning');
      return;
    }

    setIsBlasting(true);

    // Simulate Network Delay & Processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock random success/partial for demo
    const isPartial = Math.random() > 0.8;
    const status = isPartial ? 'Partial' : 'Sent';

    const newPost: SocialPost = {
      id: `blast_${Date.now()}`,
      content,
      platforms: selectedPlatforms,
      mediaUrl: mediaPreview || undefined, 
      shortenLinks,
      date: new Date().toISOString(),
      likes: 0,
      shares: 0,
      status: status
    };

    try {
      await db.socialPosts.add(newPost);
      if (status === 'Sent') {
        addNotification('Blast Berhasil', `Konten terkirim ke ${selectedPlatforms.length} platform.`, 'success');
      } else {
        addNotification('Terkirim Sebagian', 'Beberapa platform mengalami kendala.', 'warning');
      }
      
      setContent('');
      removeMedia();
    } catch (error) {
      addNotification('Error', 'Gagal menyimpan data blast.', 'warning');
    } finally {
      setIsBlasting(false);
    }
  };

  return {
    accounts,
    history,
    formState: { content, selectedPlatforms, mediaPreview, shortenLinks, isBlasting },
    formActions: { setContent, togglePlatform, handleMediaUpload, removeMedia, setShortenLinks, blastPost }
  };
};
