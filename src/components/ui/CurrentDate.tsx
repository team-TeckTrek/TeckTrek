import React from 'react';

const CurrentDate: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  return (
    <div>
      今日の日付: {formattedDate}
    </div>
  );
};

export default CurrentDate;
