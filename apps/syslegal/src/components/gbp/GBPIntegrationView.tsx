
"use client";

import React from 'react';
import { useGoogleBusinessLogic } from '@cbp/core';
import { LocationPerformance } from './molecules/LocationPerformance';
import { ReviewItem } from './molecules/ReviewItem';
import { GBPPostComposer } from './molecules/GBPPostComposer';
import { Store, Star, LayoutList } from 'lucide-react';

export const GBPIntegrationView: React.FC = () => {
  const { location, reviews, updates, replyReview, createUpdate } = useGoogleBusinessLogic();

  if (!location) return <div className="p-8 text-center text-slate-500">Memuat Data Google Business...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* 1. Header & Performance Stats */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Google_My_Business_icon.svg" alt="GMB" className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {location.name}
              {location.isConnected && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{location.address}</p>
          </div>
        </div>
        <LocationPerformance location={location} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Left Column: Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-cbp-navy dark:text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" /> Ulasan Terbaru
            </h3>
            <span className="text-sm font-bold text-slate-500">{location.rating} / 5.0 ({location.reviewsCount})</span>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {reviews.length > 0 ? reviews.map(review => (
              <ReviewItem key={review.id} review={review} onReply={replyReview} />
            )) : (
              <p className="text-slate-500 text-sm">Belum ada ulasan.</p>
            )}
          </div>
        </div>

        {/* 3. Right Column: Updates & History */}
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg text-cbp-navy dark:text-white flex items-center gap-2 mb-4">
              <Store className="h-5 w-5 text-blue-500" /> Buat Update
            </h3>
            <GBPPostComposer onPost={createUpdate} />
          </div>

          <div>
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <LayoutList className="h-4 w-4" /> Riwayat Postingan
            </h3>
            <div className="space-y-3">
              {updates.map(upd => (
                <div key={upd.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm">
                   <div className="flex justify-between mb-1">
                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${upd.type === 'EVENT' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{upd.type}</span>
                     <span className="text-xs text-slate-400">{new Date(upd.date).toLocaleDateString()}</span>
                   </div>
                   <p className="text-slate-700 dark:text-slate-300 line-clamp-2 mb-2">{upd.content}</p>
                   <div className="flex gap-3 text-xs text-slate-500">
                     <span>{upd.views} Views</span>
                     <span>{upd.clicks} Clicks</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
