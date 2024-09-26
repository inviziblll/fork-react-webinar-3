import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({onPageChange, activePage, pages}) {

  const cn = bem('Pagination'); 

  const [currentPage, setCurrentPage] = useState(activePage);

  const handleChangePage = (page) => {
        setCurrentPage(page);
        onPageChange(page);
  }
  
  const list = () => {
    
      const pageList = [];
     
      if (pages > 5)  { // если число страниц больше 5
      
          if (activePage === 1) {
              // первая страница
              pageList.push(1, 2, 3, '...', pages);
          } 
          else {
              
              if (activePage > 2) {
                pageList.push(1);
              }

              if (activePage > 3) {
                pageList.push('...');
              }

              const startPage = Math.max(2, activePage - 1);
              const endPage = Math.min(pages - 1, activePage + 1);
              for (let i = startPage; i <= endPage; i++) {
                pageList.push(i);
              }

              if (activePage < pages - 2) {
                pageList.push('...');
              }

              if (activePage < pages - 1) {
                pageList.push(pages);
              }
            }
      }
      else {  
        
        // когда число страниц меньше или равно 5, отображаем все 
        for (let i = 1; i <= pages; i++) {
          pageList.push(i);
        }

      } 

      if (!pageList.includes(pages)) {
        pageList.push(pages);
      }

      if (!pageList.includes(1)) {
        pageList.unshift(1);
      }   

      return pageList;
   
  }

  const pageStyle = (page) => {
      let style = 'Next';
      if(page === activePage){
        style =  'Active'
      }
      else{
        if(page === '...'){
            style = 'Separator';
        }
      }
      return style;
  }

  useEffect(()=>{
    setCurrentPage(activePage)
  },[activePage]);

  const pageList = list();

  return (
      <div className={cn()}>
        {pageList.map((item, index) => (
          <button key={index} onClick={() => { handleChangePage(item) }} className={`${cn('Page')} ${pageStyle(item)}`}>{item}</button>
        ))}
      </div>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
};

export default memo(Pagination);
