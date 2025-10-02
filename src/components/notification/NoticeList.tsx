'use client';

import React, { useCallback, useState } from 'react';
import NoticeItem from './NoticeItem';
import NoticeDialog from './NoticeDialog';
import { Notice } from './types';

interface NoticeListProps {
  notices?: Notice[];
}

const MAX_DISPLAY_COUNT = 3;

export default function NoticeList({ notices }: NoticeListProps) {
  const [modalData, setModalData] = useState<Notice | null>(null);

  const availableNotices = Array.isArray(notices) ? notices : [];
  const list = availableNotices.slice(0, MAX_DISPLAY_COUNT);
  const hasNotices = list.length > 0;

  const handleOpen = useCallback((notice: Notice) => {
    setModalData(notice);
  }, []);

  const handleClose = useCallback(() => {
    setModalData(null);
  }, []);

  return (
    <section className="mx-auto mt-6 w-full max-w-[560px] text-[#5B3A18]">
      <h2 className="mb-4 text-lg font-bold">お知らせ</h2>

      {hasNotices ? (
        <ul>
          {list.map((notice) => (
            <NoticeItem
              key={notice.id}
              notice={notice}
              onOpen={handleOpen}
            />
          ))}
        </ul>
      ) : (
        <div className="text-sm text-[#5B3A18]">お知らせはありません</div>
      )}

      <NoticeDialog
        open={modalData !== null}
        title={modalData?.title ?? ''}
        content={modalData?.content ?? ''}
        onClose={handleClose}
      />
    </section>
  );
}
