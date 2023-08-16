import axios from 'axios';

interface ICreateNewToken {
  onNewToken: (token: string) => void;
}

export const CreateNewToken = ({ onNewToken }: ICreateNewToken) => {
  const handleCreateNewToken = async () => {
    try {
      const { data } = await axios.post('/api/token');

      console.log(data);
      onNewToken(data.shortenedAPIToken);
    } catch (error) {}
  };

  return (
    <div>
      <button className="btn btn-primary btn-md" onClick={handleCreateNewToken}>
        Criar novo token
      </button>
    </div>
  );
};
