import { useEffect, useState } from "react";

export const useDocumentIsReady = () => {
    const [documentIsReady, setDocumentIsReady ] = useState(false);

    useEffect(() => {
        setDocumentIsReady(true);
    }, []);

    return documentIsReady;
}