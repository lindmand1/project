import { switchMap, pluck } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import { AppEpic } from 'src/common/epics/appEpic';

import * as actions from '../actions/inviteActions';
import { InviteByEmail } from '../models/inviteModel';
import { InviteService } from '../services/inviteService';

export const inviteEpicFactory = (inviteService: InviteService): AppEpic => {
    const inviteEmployeeEpic: AppEpic = action$ =>
        action$.pipe(
            ofType(actions.INVITE_EMPLOYEE_REQUESTED),
            pluck('payload'),
            switchMap((employee: InviteByEmail) =>
                inviteService
                    .inviteEmployee(employee)
                    .then(actions.inviteEmployeeSuccess)
                    .catch(actions.inviteEmployeeFailure),
            ),
        );

    const inviteNewPotentialExecutiveEpic: AppEpic = action$ =>
        action$.pipe(
            ofType(actions.INVITE_NEW_POTENTIAL_EXECUTIVE_REQUESTED),
            pluck('payload'),
            switchMap((data: InviteByEmail) =>
                inviteService
                    .inviteNewPotentialExecutive(data)
                    .then(actions.inviteNewPotentialExecutiveSuccess)
                    .catch(actions.inviteNewPotentialExecutiveFailure),
            ),
        );

    const invitePotentialExecutivesEpic: AppEpic = action$ =>
        action$.pipe(
            ofType(actions.INVITE_POTENTIAL_EXECUTIVES_REQUESTED),
            pluck('payload'),
            switchMap((data: number[]) =>
                inviteService
                    .invitePotentialExecutives(data)
                    .then(actions.invitePotentialExecutivesSuccess)
                    .catch(actions.invitePotentialExecutivesFailure),
            ),
        );

    return combineEpics(
        inviteEmployeeEpic,
        inviteNewPotentialExecutiveEpic,
        invitePotentialExecutivesEpic,
    );
};
