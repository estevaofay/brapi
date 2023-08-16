'use client';

interface ITable {
  data: JSX.Element[];
  headers: string[];
  isLoading?: boolean;
  emptyText?: string;
}

export const Table = ({
  data,
  headers,
  emptyText = 'Sem dados',
  isLoading = false,
}: ITable) => {
  console.log({ isLoading });

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-compact w-full text-center bg-slate-800">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from(Array(10).keys()).map((i) => (
                <tr key={i}>
                  <td colSpan={headers.length}>
                    <progress className="progress" />
                  </td>
                </tr>
              ))
            : null}

          {data.map((row) => (
            <tr>{row}</tr>
          ))}

          {!isLoading && data.length === 0 ? (
            <tr>
              <td colSpan={headers.length}>{emptyText}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
