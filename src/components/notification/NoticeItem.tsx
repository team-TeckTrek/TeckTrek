'use client';

import React from 'react';
import { Notice, DEFAULT_TITLE_MAX } from './types';

interface Props {
  notice: Notice;
  onOpen: (notice: Notice) => void;
}

export default function NoticeItem({ notice, onOpen }: Props) {
  const title = notice.title || '';
  const shortTitle =
    title.length > DEFAULT_TITLE_MAX
      ? title.slice(0, DEFAULT_TITLE_MAX) + '…'
      : title;

  const handleClick = () => {
    onOpen(notice);
  };

  return (
    <li className="flex items-baseline gap-6 border-b border-[#5B3A18] py-2 text-base last:border-b-0">
      <span className="w-32 shrink-0 text-[#5B3A18]">{notice.date}</span>
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 text-left text-[#5B3A18] focus:outline-none focus-visible:underline"
      >
        {shortTitle}
      </button>
    </li>
  );
}
