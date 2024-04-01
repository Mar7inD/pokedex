// Function for getting current pages
export function getCurrentPage( urlParams, totalPages, limit) {
    
    if(urlParams) {
        const offset = parseInt(urlParams.get('offset'), 10);

        return offset/limit;
    }

    return totalPages;
}

// Function for getting all pages and showing some for Pagination
export function getVisiblePages(currentPage, totalPages) {

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (startPage === 1) {
            return Array.from({ length: 5 }, (_, i) => i + 1);
        } 
        else if (endPage >= totalPages) {
            return Array.from([4, 3, 2, 1, 0], i => totalPages - i);
        } 
        else {
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        }
        }