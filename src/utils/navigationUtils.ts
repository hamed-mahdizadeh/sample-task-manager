import { SearchParam } from "../store/ui-slice";

export const getUserSummaryUrl = (
   params: SearchParam
): string => {
    const {page, order, searchTerm, sortBy } = params;
    let url = ``;
    let searchParams = [];
    if (page && page.trim() !== '') {
        searchParams.push(`${new URLSearchParams({
            page
        })}`);
    }
    if (searchTerm && searchTerm.trim() !== '') {
        searchParams.push(`${new URLSearchParams({
            searchTerm
        })}`);
    }
    if (order && order.trim() !== '') {
        searchParams.push(`${new URLSearchParams({
            order
        })}`);
    }
    if (sortBy && sortBy.trim() !== '') {
        searchParams.push(`${new URLSearchParams({
            sortBy
        })}`);
    }
    if (searchParams.length) {
        url += `?${searchParams.join('&')}`;
    }
    return url;
}