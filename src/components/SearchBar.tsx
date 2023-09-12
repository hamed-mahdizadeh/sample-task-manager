import { Autocomplete, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { UserInfoSummary } from "../types/user";
import { SearchResultItem } from "./SearchResultItem";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

export type SearchBarType = ({ onChange, onItemSelect, debounce = 500 }:
    {
        onChange: (searchTerm: string) => Promise<UserInfoSummary[]>,
        onItemSelect: (item: UserInfoSummary) => any,
        onSearchText: (searchTerm: string) => void,
        debounce: number
    }) => React.JSX.Element;

const StyledSearchBarContainerDiv = styled.div`
   width: 70%;
    background-color: #fff;
    margin-right: .5rem;
    border-radius: .5rem;
    min-width: 8rem;
`;

const StyledSearchIcon = styled(SearchIcon)`
cursor: pointer;
color: #555;
padding: .5rem;
`;

export const SearchBar: SearchBarType = ({ onChange, onItemSelect, onSearchText, debounce = 500 }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<UserInfoSummary[]>([])

    useEffect(() => {
        const timeoutIdentifier = setTimeout(async () => {
            if (searchTerm) {
                const data = await onChange(searchTerm);
                setResults(data);
            }
        }, debounce);
        return () => clearTimeout(timeoutIdentifier);
    }, [searchTerm])

    const handleInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearchText(searchTerm);
        }
    }

    const handleSearchClick = () => {
        onSearchText(searchTerm);
    }

    return (
        <StyledSearchBarContainerDiv>
            <Autocomplete
                options={results}
                getOptionLabel={(option) => option.firstName}
                filterOptions={(options, state) => options}
                size="small"
                disablePortal={true}
                clearOnBlur={false}
                renderInput={
                    (params) =>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                onChange={handleInputSearchChange}
                                onKeyDown={handleKeyDown}
                                {...params}
                                placeholder="Search"
                            />

                            <StyledSearchIcon onClick={handleSearchClick} />
                        </div>
                }
                renderOption={
                    (props, option) =>
                        <SearchResultItem user={option} onItemSelect={onItemSelect} key={option.id}
                        />}
            ></Autocomplete>
        </StyledSearchBarContainerDiv>
    );
}