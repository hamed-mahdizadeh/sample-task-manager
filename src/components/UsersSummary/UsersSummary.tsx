import React, { useEffect, useState } from 'react';

import classes from './UsersSummary.module.css';
import { useSearchParams } from 'react-router-dom';
import { UserInfoSummary, UsersSummaryResponseData } from '../../types/user';

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
        <div className={classes.UsersSummary}>
            <h3>User Summary Place Holder</h3>
        </div>
    );
};
