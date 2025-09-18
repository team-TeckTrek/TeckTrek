'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'; // shadcn/uiのDialog
// ↑ shadcn/uiのDialogを使う場合、`npx shadcn-ui@latest add dialog` で導入してください

// 0. 静的データ
const notices = [
  {
    id: '1',
    date: '2025.8.15',
    body: 'コンテンツの詳細についてのお知らせです。これは30文字を超える長いお知らせの例です。',
  },
  {
    id: '2',
    date: '2025.8.9',
    body: 'メンテナンスのお知らせです。',
  },
  {
    id: '3',
    date: '2025.8.1',
    body: 'アプリをリリースしました。',
  },
];

// 4. 最大文字数
const MAX_LENGTH = 30;

// 5. 省略関数
function truncateBody(body: string, maxLength = MAX_LENGTH) {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength) + '…';
}

export default function NoticeList() {
  // 6. モーダル制御
  const [modalBody, setModalBody] = useState<string | null>(null);

  // 1. タイトル
  return (
    <section className="bg-white rounded-lg shadow p-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">お知らせ</h2>
      <ul>
        {notices.slice(0, 3).map((notice) => {
          const isLong = notice.body.length > MAX_LENGTH;
          return (
            <li
              key={notice.id}
              className="flex items-start py-2 border-b last:border-b-0"
            >
              {/* 2. 日付 */}
              <span className="w-24 text-gray-500 shrink-0">{notice.date}</span>
              {/* 3,4,5,6. 内容・省略・モーダル */}
              {isLong ? (
                <button
                  className="ml-2 text-blue-600 underline"
                  onClick={() => setModalBody(notice.body)}
                  type="button"
                >
                  {truncateBody(notice.body)}
                </button>
              ) : (
                <span className="ml-2">{notice.body}</span>
              )}
            </li>
          );
        })}
      </ul>
      {/* 6. モーダル */}
      <Dialog open={modalBody !== null} onOpenChange={() => setModalBody(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>お知らせ全文</DialogTitle>
            <DialogDescription>{modalBody}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
