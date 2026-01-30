
import React from 'react';
import { SocialPost, formatDateID } from '@cbp/core';
import { Card, Badge } from '@cbp/ui';
import { SocialPlatformIcon } from '../atoms/SocialPlatformIcon';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface BlastHistoryTableProps {
  history: SocialPost[];
}

export const BlastHistoryTable: React.FC<BlastHistoryTableProps> = ({ history }) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Sent': 
      case 'Published':
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Sent</Badge>;
      case 'Partial': 
        return <Badge variant="warning" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Partial</Badge>;
      case 'Sending': 
        return <Badge variant="info" className="flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Sending</Badge>;
      default: 
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <h3 className="font-bold text-cbp-navy dark:text-white">Riwayat Blast Post</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Waktu</th>
              <th className="px-6 py-4 font-bold">Konten</th>
              <th className="px-6 py-4 font-bold">Target Platform</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Engagement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.length > 0 ? history.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                  {formatDateID(post.date, { dateStyle: 'short', timeStyle: 'short' })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {post.mediaUrl && (
                      <img src={post.mediaUrl} alt="media" className="w-8 h-8 rounded object-cover border border-slate-200 dark:border-slate-700" />
                    )}
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]" title={post.content}>
                      {post.content}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-1">
                    {post.platforms.map(p => (
                      <div key={p} className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative z-10" title={p}>
                        <SocialPlatformIcon platform={p} className="h-3 w-3" />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(post.status)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-600 dark:text-slate-400">
                  {post.likes} <span className="text-[10px] text-slate-400">Likes</span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Belum ada riwayat blast.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
