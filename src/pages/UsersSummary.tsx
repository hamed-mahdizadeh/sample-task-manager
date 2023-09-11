import React, { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserInfoSummary, UsersSummaryResponseData } from '../types/user';
import UsersTable from '../components/UsersTable';
import { SearchBarPortal } from '../components/SearchBarPortal';

export const loader = async (page: string, searchTerm?: string): Promise<UsersSummaryResponseData | undefined> => {
    let url = `/users/page/${page}`;
    if (searchTerm && searchTerm.trim() !== '') {
        url += `?${new URLSearchParams({
            searchTerm
        })}`;
    }

    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
    //TODO handle response not OK or Exceptions
}

export const UsersSummary = () => {
    const [users, setUsers] = useState<UserInfoSummary[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    let currentPage = searchParams.get('page') ?? '1';
    let searchTerm = searchParams.get('searchTerm') ?? '';

    const loadPreviousPage = () => {
        let page = 0;
        if (currentPage) {
            page = +currentPage;
        }
        if (page > 0) {
            page -= 1;
        }
        setSearchParams(searchParams => {
            searchParams.set("page", `${page}`);
            return searchParams;
        });
    }

    const loadNextPage = () => {
        let page = 0;
        if (currentPage) {
            page = +currentPage;
        }
        if (page < totalPages) {
            page += 1;
        }
        setSearchParams(searchParams => {
            searchParams.set("page", `${page}`);
            return searchParams;
        });
    }


    useEffect(() => {
        const loadPage = async () => {
            if (currentPage) {
                const data = await loader(currentPage, searchTerm);
                if (data) {
                    setUsers(data.users);
                    setTotalPages(data.totalPages);
                }
            }
        }

        loadPage();

    }, [currentPage, searchTerm]);

    const searchBarChangeHandler = async (searchTerm: string) => {
        const usersResponseData = await loader('1', searchTerm);
        if (usersResponseData) {
            return usersResponseData.users;
        }
        return [];
    }

    const searchItemSelectHandler = (user: UserInfoSummary) => {
        navigate(`/user-details/${user.id}`);
    }

    const handleSearchText = (searchTerm: string) => {
        setSearchParams({
            searchTerm
        });
    } 


    return (
        <>
            <SearchBarPortal
                debounce={500}
                onChange={searchBarChangeHandler}
                onSearchText={handleSearchText}
                onItemSelect={searchItemSelectHandler} />,
            <UsersTable
                currentPageData={users}
                currenPage={currentPage ? +currentPage : 1}
                totalPage={totalPages}
                sortItems={(cl) => { }}
                loadPage={(page) => setSearchParams({ page: `${page}` })}
                loadPrevPage={loadPreviousPage}
                loadNextPage={loadNextPage}
            />
        </>
    );
};
