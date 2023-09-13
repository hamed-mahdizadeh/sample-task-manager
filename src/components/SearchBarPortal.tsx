import { createPortal } from "react-dom"
import { SearchBar, SearchBarType } from "./SearchBar"
import { useDocumentIsReady } from "../hooks/useDocumentIsReady";

export const SearchBarPortal: SearchBarType = (props) => {

    const documentIsReady = useDocumentIsReady();
    
    const SearchBarPlaceHolder = document.getElementById('headerPlaceHolder')!;

    
    
    return documentIsReady ? createPortal(<SearchBar {...props} />, SearchBarPlaceHolder) : <></>;
}