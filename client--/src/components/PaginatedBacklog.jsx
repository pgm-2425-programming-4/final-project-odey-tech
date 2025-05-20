import { useEffect, useState } from 'react';
import Pagination from './Pagination';

function PaginatedBacklog() {
  const [backlog, setBacklog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:1337/api/backlogs?pagination[page]=${page}&pagination[pageSize]=${limit}`);
        const data = await res.json();
        setBacklog(data.data);
        setPageCount(data.meta.pagination.pageCount);
        setError(null);
      } catch (err) {
        setError("Fout bij ophalen van de data.");
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Backlog-taken</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titel</th>
          </tr>
        </thead>
        <tbody>
          {backlog.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.Title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </div>
  );
}

export default PaginatedBacklog;
