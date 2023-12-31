import { UserInfoSummary } from '../types/user';
import {
    StyledContainerDiv,
    StyledNavLink,
    StyledPaginationContainerDiv,
    StyledTableHeaderRowDiv,
    StyledTableRowDiv
} from './ui/Table';
import { StyledPaginationButton } from './ui/StyledElements/Buttons';
import { CustomSelect, CustomSelectItem } from './ui/CustomSelect';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../hooks/useStore';
import { StyledArrowContainer, StyledSelectContainer } from './ui/Containers';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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
            sortItems: (column: 'age' | 'name') => void,
        }) => {

    const theme = useAppSelector(state => state.ui.theme);
    const searchParams = useAppSelector(state => state.ui.searchParams);

    const handlePageSelect = (event: SelectChangeEvent<number>): void => {
        loadPage(+event.target.value)
    }

    const rows = currentPageData.map((user) =>
        <StyledTableRowDiv key={user.id}>
            <div>
                <StyledNavLink to={`/user-details/${user.id}`}>
                    {user.firstName}
                </StyledNavLink>
            </div>
            <div>{user.email}</div>
            <div>{user.age}</div>
            {/* TODO: Replace Place holder with appropriate Actions */}
            <div>Actions</div>
        </StyledTableRowDiv>
    );
    const pagesController =
        <div>
            <StyledPaginationButton type='button' title='Previous Page' onClick={loadPrevPage}>{'<'}</StyledPaginationButton>
            <StyledPaginationButton type='button' title='Next Page' onClick={loadNextPage}>{'>'}</StyledPaginationButton>
            <StyledSelectContainer>
                <CustomSelect theme={theme} onChange={handlePageSelect} value={currenPage}>
                    {
                        Array.from(Array(totalPage)).map((_, index) => {
                            return <CustomSelectItem theme={theme} key={index + 1} value={index + 1}>{index + 1}</CustomSelectItem>
                        })
                    }
                </CustomSelect>
            </StyledSelectContainer>
        </div>;
    return (
        <StyledContainerDiv>
            <StyledTableHeaderRowDiv>
                <div onClick={() => sortItems('name')}>
                        First Name
                    <StyledArrowContainer>
                        {searchParams.order === 'asc' && searchParams.sortBy === 'name' && <KeyboardArrowDownIcon />}
                        {searchParams.order === 'desc' && searchParams.sortBy === 'name' && <KeyboardArrowUpIcon />}
                    </StyledArrowContainer>
                </div>
                <div>Email</div>
                <div onClick={() => sortItems('age')}>
                    Age
                    <StyledArrowContainer>
                        {searchParams.order === 'asc' && searchParams.sortBy === 'age' && <KeyboardArrowDownIcon />}
                        {searchParams.order === 'desc' && searchParams.sortBy === 'age' && <KeyboardArrowUpIcon />}
                    </StyledArrowContainer>
                </div>
                <div>Actions</div>
            </StyledTableHeaderRowDiv>
            {rows}
            <StyledPaginationContainerDiv>{pagesController}</StyledPaginationContainerDiv>
        </StyledContainerDiv>
    );
};

export default UsersTable;
