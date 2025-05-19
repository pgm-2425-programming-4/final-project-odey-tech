function Pagination({ page, setPage, pageCount }) {
  const next = () => {
    if (page < pageCount) setPage(page + 1);
  };

  const prev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={prev} disabled={page === 1}>Vorige</button>
      <span style={{ margin: '0 1rem' }}>Pagina {page} van {pageCount}</span>
      <button onClick={next} disabled={page === pageCount}>Volgende</button>
    </div>
  );
}

export default Pagination;
