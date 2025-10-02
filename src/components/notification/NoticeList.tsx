'use client';

import React, { useMemo, useState } from 'react';
import NoticeItem from './NoticeItem';
import NoticeDialog from './NoticeDialog';
import { Notice } from './types';

interface NoticeListProps {
  notices?: Notice[];
}

const MAX_DISPLAY_COUNT = 3;

export default function NoticeList({ notices }: NoticeListProps) {
  const [modalData, setModalData] = useState<Notice | null>(null);

  const list = useMemo(() => {
    const arr = Array.isArray(notices) ? notices : [];
    return arr.slice(0, MAX_DISPLAY_COUNT);
  }, [notices]);

  return (
    <section className="mx-auto mt-6 w-full max-w-[560px] text-[#5B3A18]">
      <h2 className="mb-4 text-lg font-bold">お知らせ</h2>

      {list.length === 0 ? (
        <div className="text-sm text-[#5B3A18]">お知らせはありません</div>
      ) : (
        <ul>
          {list.map((notice) => (
            <NoticeItem
              key={notice.id}
              notice={notice}
              onOpen={(n) => setModalData(n)}
            />
          ))}
        </ul>
      )}

      <NoticeDialog
        open={modalData !== null}
        title={modalData?.title ?? ''}
        content={modalData?.content ?? ''}
        onClose={() => setModalData(null)}
      />
    </section>
  );
}
