'use client';

import React, { useCallback, useMemo, useState } from 'react';
import NoticeDialog from './NoticeDialog';

export type Notice = {
  id: string;
  date: string;
  body: string;
};

interface NoticeListProps {
  notices?: Notice[];
  /** 最大表示件数（未指定なら全件） */
  maxItems?: number;
  /** 通知が選択された時のコールバック（モーダル制御を親に任せる場合に使用） */
  onNoticeSelect?: (notice: Notice) => void;
}

const DEFAULT_MAX_LENGTH = 30;
function truncateBody(body: string, maxLength = DEFAULT_MAX_LENGTH) {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength) + '…';
}

const NoticeItem = React.memo(function NoticeItem({
  notice,
  onOpen,
}: {
  notice: Notice;
  onOpen: (body: string) => void;
}) {
  const isLong = notice.body.length > DEFAULT_MAX_LENGTH;
  return (
    <li className="flex items-start py-2 border-b last:border-b-0">
      <span className="w-24 text-gray-500 shrink-0">{notice.date}</span>
      {isLong ? (
        <button
          className="ml-2 text-blue-600 underline"
          onClick={() => onOpen(notice.body)}
          type="button"
          aria-label={`お知らせ ${notice.id} の詳細を開く`}
        >
          {truncateBody(notice.body)}
        </button>
      ) : (
        <span className="ml-2">{notice.body}</span>
      )}
    </li>
  );
});

const NoticeList: React.FC<NoticeListProps> = ({ notices, maxItems, onNoticeSelect }) => {
  const [modalBody, setModalBody] = useState<string | null>(null);

  const list = useMemo(() => {
    const arr = Array.isArray(notices) ? notices : [];
    return typeof maxItems === 'number' ? arr.slice(0, maxItems) : arr;
  }, [notices, maxItems]);

  const handleOpen = useCallback(
    (body: string) => {
      if (onNoticeSelect) {
        // 親に制御を委譲
        const n = (notices || []).find((x) => x.body === body);
        if (n) onNoticeSelect(n);
      } else {
        setModalBody(body);
      }
    },
    [onNoticeSelect, notices],
  );

  return (
    <section className="bg-white rounded-lg shadow p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">お知らせ</h2>

      {list.length === 0 ? (
        <div className="text-sm text-gray-500">お知らせはありません</div>
      ) : (
        <ul>
          {list.map((notice) => (
            <NoticeItem key={notice.id} notice={notice} onOpen={handleOpen} />
          ))}
        </ul>
      )}

      <NoticeDialog open={modalBody !== null} body={modalBody} onClose={() => setModalBody(null)} />
    </section>
  );
};

export default NoticeList;
