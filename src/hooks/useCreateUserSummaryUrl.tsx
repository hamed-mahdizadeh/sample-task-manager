import { getUserSummaryUrl } from "../utils/navigationUtils";
import { useAppSelector } from "./useStore";

export const useCreateUserSummaryUrl = () => {
    const searchParams = useAppSelector(state => state.ui.searchParams);

    return getUserSummaryUrl(searchParams)
}