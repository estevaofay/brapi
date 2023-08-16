'use client';

import axios from 'axios';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import hotToast from 'react-hot-toast';
import { CreateNewToken } from '~/app/dashboard/components/CreateNewToken';
import { Table } from '~/components/Table';

const headers = ['Ativado', 'Token', 'Data de criação'];

export const TokenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await axios.get('/api/token');

      setTokens(data.shortenedAPITokens);
      setIsLoading(false);
    };
    getTokens();
  }, []);

  const handleToggle = async (token) => {
    await axios.put('/api/token', {
      id: token.id,
      active: !token.active,
    });

    const newTokens = tokens.map((t) => {
      if (t.id === token.id) {
        return {
          ...t,
          active: !t.active,
        };
      }

      return t;
    });

    setTokens(newTokens);
  };

  const parsedData = useMemo(() => {
    return tokens.map((token, index) => {
      return (
        <Fragment key={index}>
          <td>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              title={
                token.active ? 'Clique para desativar' : 'Clique para ativar'
              }
              checked={token.active}
              onChange={() => handleToggle(token)}
            />
          </td>
          <td>
            <input
              type="password"
              className="input input-bordered input-sm cursor-pointer"
              value={token.shortenedAPIToken}
              title="Clique para copiar"
              onMouseEnter={(e) => {
                // @ts-ignore
                e.target.type = 'text';
              }}
              onMouseLeave={(e) => {
                // @ts-ignore
                e.target.type = 'password';
              }}
              onClick={(e) => {
                // @ts-ignore
                e.target.select();
                document.execCommand('copy');

                hotToast.success('Token copiado com sucesso', {
                  duration: 5000,
                  style: {
                    background: 'rgb(31 41 55)',
                    color: 'white',
                  },
                });
              }}
              readOnly
            />
          </td>
          <td>{new Date(token.createdAt).toLocaleString('pt-BR')}</td>
        </Fragment>
      );
    });
  }, [tokens]);

  return (
    <div>
      <div className="flex flex-col gap-4 mx-auto items-end">
        <CreateNewToken
          onNewToken={(token) => {
            setTokens([token, ...tokens]);
          }}
        />
        <Table
          headers={headers}
          data={parsedData}
          isLoading={isLoading}
          emptyText="Nenhum token encontrado, crie um novo token para começar a usar a API."
        />
      </div>
    </div>
  );
};
