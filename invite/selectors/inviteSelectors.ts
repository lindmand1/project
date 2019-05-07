import { AppState } from 'src/common/appState';

export const getInviteFetchingStatus = (state: AppState) => state.invite.isFetching;
