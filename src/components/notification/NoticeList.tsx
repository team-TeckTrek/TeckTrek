"use client";

import React, { useState } from 'react';
import NoticeDialog from './NoticeDialog';


type Notice = {
  id: string;
  date: string;
  body: string;
};

interface NoticeListProps {
  notices: Notice[];
}

const MAX_LENGTH = 30;
function truncateBody(body: string, maxLength = MAX_LENGTH) {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength) + '…';
}

const NoticeList: React.FC<NoticeListProps> = ({ notices }) => {
  const [modalBody, setModalBody] = useState<string | null>(null);
  return (
    <section className="bg-white rounded-lg shadow p-6 w-full max-w-2xl mx-auto mt-120">
      <h2 className="text-lg font-bold mb-2">お知らせ</h2>
      <ul>
        {notices.map((notice) => {
          const isLong = notice.body.length > MAX_LENGTH;
          return (
            <li
              key={notice.id}
              className="flex items-start py-2 border-b last:border-b-0"
            >
              <span className="w-24 text-gray-500 shrink-0">{notice.date}</span>
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
      <NoticeDialog
        open={modalBody !== null}
        body={modalBody}
        onClose={() => setModalBody(null)}
      />
    </section>
  );
};

export default NoticeList;
