import * as actions from '../actions/inviteActions';

export interface InviteState {
    isFetching: boolean;
}

const defaultInviteState = {
    isFetching: false,
};

export const inviteReducer = (
    state: InviteState = defaultInviteState,
    action: actions.InviteActions,
) => {
    switch (action.type) {
        case actions.INVITE_EMPLOYEE_REQUESTED:
            return {
                isFetching: true,
            };
        case actions.INVITE_EMPLOYEE_SUCCEED:
        case actions.INVITE_EMPLOYEE_FAILED:
            return {
                isFetching: false,
            };
        default:
            return state;
    }
};
