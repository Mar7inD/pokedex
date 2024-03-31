// Function for getting current pages
export function getCurrentPage( urlParams) {
    
    const offset = parseInt(urlParams.get('offset'), 10);

    return offset/20;
}

// Function for getting all pages and showing some for Pagination
export function getVisiblePages(currentPage, totalNum, urlParams) {

        const limit = parseInt(urlParams.get('limit'), 10);

        const totalPages = Math.ceil(totalNum / limit)

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        if (startPage === 1) {
            return Array.from({ length: 5 }, (_, i) => i + 1);
        } 
        else if (endPage === totalPages) {
            return Array.from({ length: 5 }, (_, i) => totalPages - i - 3);
        } 
        else {
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        }
        }