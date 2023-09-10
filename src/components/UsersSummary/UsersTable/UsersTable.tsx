import { useTheme } from 'styled-components';
import { UserInfoSummary } from '../../../types/user';
import { StyledContainerDiv, StyledPaginationContainerDiv, StyledTableHeaderRowDiv, StyledTableRowDiv } from '../../ui/Containers/Table';
import { StyledPaginationButton } from '../../ui/Controls/Buttons';



const UsersTable = (
    {
        currentPageData,
        currenPage,
        totalPage,
        loadPage,
        loadNextPage,
        loadPrevPage,
        sortItems,
    }:
        {
            currentPageData: UserInfoSummary[],
            currenPage: number,
            totalPage: number,
            loadPage: (pageNumber: number) => void,
            loadNextPage: () => void,
            loadPrevPage: () => void
            sortItems: (column: 'age' | 'name') => void
        }) => {

    const rows = currentPageData.map((user) =>
        <StyledTableRowDiv key={user.id}>
            <div>{user.firstName}</div>
            <div>{user.email}</div>
            <div>{user.age}</div>
            {/* TODO: Replace Place holder with appropriate Actions */}
            <div>Actions</div>
        </StyledTableRowDiv>
    );
    const pagesController = <div>
        <StyledPaginationButton type='button' title='Previous Page' onClick={loadPrevPage}>{'<'}</StyledPaginationButton>
        <StyledPaginationButton type='button' title='Next Page' onClick={loadNextPage}>{'>'}</StyledPaginationButton>
    </div>
    return (
        <StyledContainerDiv>
            <StyledTableHeaderRowDiv>
                <div onClick={() => sortItems('name')}>First Name</div>
                <div>Email</div>
                <div onClick={() => sortItems('age')}>Age</div>
                <div>Actions</div>
            </StyledTableHeaderRowDiv>
            {rows}
            <StyledPaginationContainerDiv>{pagesController}</StyledPaginationContainerDiv>
        </StyledContainerDiv>


    );
};

export default UsersTable;