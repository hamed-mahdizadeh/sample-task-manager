import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { UserInfoSummary, UsersSummaryResponseData } from '../../types/user';
import UsersTable from './UsersTable/UsersTable';
import { useTheme } from 'styled-components';

export const loader = async (page: string): Promise<UsersSummaryResponseData | undefined> => {
    const response = await fetch(`/users/page/${page}`);
    if (response.ok) {
        return await response.json();
    }
    //TODO handle response not OK or Exceptions
}

export const UsersSummary = () => {
    const [users, setUsers] = useState<UserInfoSummary[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();

    let currentPage = searchParams.get('page') ?? '1';

    const theme = useTheme();

    console.log(theme);

    const loadPreviousPage = () => {
        let page = 0;
        if (currentPage) {
            page = +currentPage;
        }
        if (page > 0) {
            page -= 1;
        }
        setSearchParams({ page: `${page}` });
    }

    const loadNextPage = () => {
        let page = 0;
        if (currentPage) {
            page = +currentPage;
        }
        if (page < totalPages) {
            page += 1;
        }
        setSearchParams({ page: `${page}` });
    }


    useEffect(() => {
        const loadPage = async () => {
            if (currentPage) {
                const data = await loader(currentPage);
                console.log(data);
                if (data) {
                    setUsers(data.users);
                    setTotalPages(data.totalPages);
                }
            }
        }

        loadPage();

    }, [currentPage]);


    return (
        <UsersTable
            currentPageData={users}
            currenPage={currentPage ? +currentPage : 1}
            totalPage={totalPages}
            sortItems={(cl) => { }}
            loadPage={(page) => setSearchParams({ page: `${page}` })}
            loadPrevPage={loadPreviousPage}
            loadNextPage={loadNextPage}
        />
    );
};
