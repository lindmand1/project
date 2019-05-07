import { Action } from 'src/common/actions/appAction';

import { InviteByEmail } from '../models/inviteModel';

export const INVITE_EMPLOYEE_REQUESTED = 'INVITE_EMPLOYEE_REQUESTED';
export type InviteEmployeeRequestAction = Action<typeof INVITE_EMPLOYEE_REQUESTED, InviteByEmail>;
export const inviteEmployeeRequest = (employee: InviteByEmail): InviteEmployeeRequestAction => ({
    type: INVITE_EMPLOYEE_REQUESTED,
    payload: { ...employee },
});

export const INVITE_EMPLOYEE_SUCCEED = 'INVITE_EMPLOYEE_SUCCEED';
export type InviteEmployeeSuccessAction = Action<typeof INVITE_EMPLOYEE_SUCCEED, null, string>;
export const inviteEmployeeSuccess = (): InviteEmployeeSuccessAction => ({
    type: INVITE_EMPLOYEE_SUCCEED,
    meta: 'Invitation email has been sent',
});

export const INVITE_EMPLOYEE_FAILED = 'INVITE_EMPLOYEE_FAILED';
export type InviteEmployeeFailureAction = Action<typeof INVITE_EMPLOYEE_FAILED, string>;
export const inviteEmployeeFailure = (payload: string): InviteEmployeeFailureAction => ({
    type: INVITE_EMPLOYEE_FAILED,
    payload,
});

export const INVITE_NEW_POTENTIAL_EXECUTIVE_REQUESTED = 'INVITE_NEW_POTENTIAL_EXECUTIVE_REQUESTED';
export type InviteNewPotentialExecutiveRequestAction = Action<
    typeof INVITE_NEW_POTENTIAL_EXECUTIVE_REQUESTED,
    InviteByEmail
>;
export const inviteNewPotentialExecutiveRequest = (
    executive: InviteByEmail,
): InviteNewPotentialExecutiveRequestAction => ({
    type: INVITE_NEW_POTENTIAL_EXECUTIVE_REQUESTED,
    payload: executive,
});

export const INVITE_NEW_POTENTIAL_EXECUTIVE_SUCCEED = 'INVITE_NEW_POTENTIAL_EXECUTIVE_SUCCEED';
export type InviteNewPotentialExecutiveSuccessAction = Action<
    typeof INVITE_NEW_POTENTIAL_EXECUTIVE_SUCCEED,
    null,
    string
>;
export const inviteNewPotentialExecutiveSuccess = (): InviteNewPotentialExecutiveSuccessAction => ({
    type: INVITE_NEW_POTENTIAL_EXECUTIVE_SUCCEED,
    meta: 'Organisation invited',
});

export const INVITE_NEW_POTENTIAL_EXECUTIVE_FAILED = 'INVITE_NEW_POTENTIAL_EXECUTIVE_FAILED';
export type InviteNewPotentialExecutiveFailureAction = Action<
    typeof INVITE_NEW_POTENTIAL_EXECUTIVE_FAILED,
    string
>;
export const inviteNewPotentialExecutiveFailure = (
    payload: string,
): InviteNewPotentialExecutiveFailureAction => ({
    type: INVITE_NEW_POTENTIAL_EXECUTIVE_FAILED,
    payload,
});

export const INVITE_POTENTIAL_EXECUTIVES_REQUESTED = 'INVITE_POTENTIAL_EXECUTIVES_REQUESTED';
export type InvitePotentialExecutivesRequestAction = Action<
    typeof INVITE_POTENTIAL_EXECUTIVES_REQUESTED,
    number[]
>;
export const invitePotentialExecutivesRequest = (
    executives: number[],
): InvitePotentialExecutivesRequestAction => ({
    type: INVITE_POTENTIAL_EXECUTIVES_REQUESTED,
    payload: executives,
});

export const INVITE_POTENTIAL_EXECUTIVES_SUCCEED = 'INVITE_POTENTIAL_EXECUTIVES_SUCCEED';
export type InvitePotentialExecutivesSuccessAction = Action<
    typeof INVITE_POTENTIAL_EXECUTIVES_SUCCEED,
    null,
    string
>;
export const invitePotentialExecutivesSuccess = (): InvitePotentialExecutivesSuccessAction => ({
    type: INVITE_POTENTIAL_EXECUTIVES_SUCCEED,
    meta: 'Organisation(s) invited',
});

export const INVITE_POTENTIAL_EXECUTIVES_FAILED = 'INVITE_POTENTIAL_EXECUTIVES_FAILED';
export type InvitePotentialExecutivesFailureAction = Action<
    typeof INVITE_POTENTIAL_EXECUTIVES_FAILED,
    string
>;
export const invitePotentialExecutivesFailure = (
    payload: string,
): InvitePotentialExecutivesFailureAction => ({
    type: INVITE_POTENTIAL_EXECUTIVES_FAILED,
    payload,
});

export type InviteActions =
    | InviteEmployeeRequestAction
    | InviteEmployeeSuccessAction
    | InviteEmployeeFailureAction
    | InviteNewPotentialExecutiveSuccessAction
    | InviteNewPotentialExecutiveRequestAction
    | InviteNewPotentialExecutiveFailureAction
    | InvitePotentialExecutivesRequestAction
    | InvitePotentialExecutivesSuccessAction
    | InvitePotentialExecutivesFailureAction;
