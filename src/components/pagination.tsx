type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number | undefined) => void;
}
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

export const Pagination =  function ({totalPages, currentPage, onPageChange}: PaginationProps) {

    const currentWindow = Array.from({ length: 5 }, 
        (_, i) =>{
            if(currentPage === totalPages){
                return currentPage - 4 + i;
            }
            else {
                return currentPage -3 + i;
            }
        })
        .filter(page => page && page <= totalPages && page > 0);

   return (
   <div className="flex">
        {
            currentPage > 1 &&
            <button onClick={()=>onPageChange(1)} className="border cursor-pointer border-gray-300 h-12 w-12 px-4 py-2 mr-2">
                <FaRegArrowAltCircleLeft size={20}/>
            </button>
       
        }
        {
         currentWindow.map((page,i)=>{
        return (
            <button
            key={i}
            disabled={page === currentPage}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "bg-gray-700 h-12 cursor-disabled w-12 text-white px-4 py-2" : "border  h-12 w-12 border-gray-300 cursor-pointer px-4 py-2"}
          >
            {page}
          </button>
        )
    })
    }
    
    {
        currentPage < totalPages &&
          <button onClick={()=>onPageChange(totalPages)} className="border cursor-pointer border-gray-300 h-12 w-12 px-4 py-2 ml-2">
                <FaRegArrowAltCircleRight size={20}/>
            </button>
    }
       
   </div>
   )
}