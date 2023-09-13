import React, { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Order, SortType, UserInfoSummary, UsersSummaryResponseData } from '../types/user';
import UsersTable from '../components/UsersTable';
import { SearchBarPortal } from '../components/SearchBarPortal';
import { useAppDispatch } from '../hooks/useStore';
import { uiActions } from '../store/ui-slice';

export const loader = async (
    page: string,
    searchTerm: string,
    order: Order,
    sortBy: SortType
): Promise<UsersSummaryResponseData | undefined> => {
    let url = `/users/page/${page}`;
    let searchParams = [];
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
    const dispatch = useAppDispatch();

    let currentPage = searchParams.get('page') ?? '1';
    let searchTerm = searchParams.get('searchTerm') ?? '';
    let currentOrder = (searchParams.get('order') ?? '') as Order;
    let currentSortBy = (searchParams.get('sortBy') ?? '') as SortType;

    const loadPreviousPage = () => {
        let page = 0;
        if (currentPage) {
            page = +currentPage;
        }
        if (page > 1) {
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
                const data = await loader(
                    currentPage,
                    searchTerm,
                    currentOrder,
                    currentSortBy
                );
                if (data) {
                    setUsers(data.users);
                    setTotalPages(data.totalPages);
                }
            }
        }

        dispatch(uiActions.updateSearchParams({
            order: currentOrder,
            searchTerm: searchTerm,
            sortBy: currentSortBy,
            page: currentPage
        }));

        loadPage();

    }, [currentPage, searchTerm, currentOrder, currentSortBy]);

    const handleSearchBarChange = async (searchTerm: string) => {
        const usersResponseData = await loader('1', searchTerm, currentOrder, currentSortBy);
        if (usersResponseData) {
            return usersResponseData.users;
        }
        return [];
    }

    const handleSearchItemSelect = (user: UserInfoSummary) => {
        navigate(`/user-details/${user.id}`);
    }

    const handleSearchText = (searchTerm: string) => {
        setSearchParams({
            searchTerm
        });
    }

    const goToPage = (page: number) => {
        setSearchParams(searchParams => {
            searchParams.set('page', `${page}`);
            return searchParams;
        });
    }

    const handleSortItems = (fieldName: SortType) => {
        let order: 'asc' | 'desc' = 'asc';
        if (fieldName === currentSortBy) {
            if (currentOrder === 'desc' || currentOrder === '') {
                order = 'asc';
            } else {
                order = 'desc';
            }
        } else {
            order = 'asc';
        }
        setSearchParams(searchParams => {
            searchParams.set("page", `${1}`);
            searchParams.set("sortBy", fieldName);
            searchParams.set("order", order);
            return searchParams;
        });
    }


    return (
        <>
            <SearchBarPortal
                debounce={500}
                onChange={handleSearchBarChange}
                users={users}
                onSearchText={handleSearchText}
                onItemSelect={handleSearchItemSelect} />,
            <UsersTable
                currentPageData={users}
                currenPage={currentPage ? +currentPage : 1}
                totalPage={totalPages}
                sortItems={handleSortItems}
                loadPage={goToPage}
                loadPrevPage={loadPreviousPage}
                loadNextPage={loadNextPage}
            />
        </>
    );
};
