export default function Pagination({currentPage, postPerPage, totalPosts, paginate}) {

  let pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="dogs__pagination">
      <ul className="pagination">
        { pageNumbers.map( number => 
            <li key="number" className="page-item">
              <a className={currentPage === number ? 'page-link active' : 'page-link'} onClick={(e) => { paginate(number); e.preventDefault(); }} href="">{number}</a>
            </li>
        ) }
      </ul>
    </div>
  );
}