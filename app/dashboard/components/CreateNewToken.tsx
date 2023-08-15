'use client';

import axios from 'axios';

export const CreateNewToken = () => {
  const handleCreateNewToken = async () => {
    try {
      const { data } = await axios.post('/api/token');

      console.log(data);
    } catch (error) {}
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleCreateNewToken}>
        Create New Token
      </button>
    </div>
  );
};
