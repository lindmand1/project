import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Filters } from 'src/features/contract/models/contractModels';
import { FullPageSpinner } from 'src/common/components';
import {
    getDepartments,
    getFetchingFiltersStatus,
} from 'src/features/contract/selectors/contractSelectors';
import { getDepartmentsRequest } from 'src/features/contract/actions/contractActions';
import { getUserOrganisationId } from 'src/features/user/selectors/userSelectors';
import { redirectToUrl } from 'src/common/actions/navigationAction';

import { InviteEmployee as InviteEmployeeComponent } from '../components/InviteEmployee';
import { inviteEmployeeRequest } from '../actions/inviteActions';
import { getInviteFetchingStatus } from '../selectors/inviteSelectors';

export interface InviteEmployeeStateProps {
    departments: Filters[];
    isFetchingFilters: boolean;
    isFetchingInvite: boolean;
    userOrganisation: number;
}

interface InviteEmployeeDispatchProps {
    getDepartmentsRequest: typeof getDepartmentsRequest;
    inviteEmployeeRequest: typeof inviteEmployeeRequest;
    redirectToUrl: typeof redirectToUrl;
}

export type InviteEmployeeProps = InviteEmployeeDispatchProps & InviteEmployeeStateProps;

export class InviteEmployee extends React.Component<InviteEmployeeProps> {
    public componentDidMount(): void {
        this.props.getDepartmentsRequest();
    }

    public render(): JSX.Element {
        return this.props.isFetchingFilters ? (
            <FullPageSpinner />
        ) : (
            <InviteEmployeeComponent
                {...this.props}
                isFetching={this.props.isFetchingInvite}
                redirect={this.props.redirectToUrl}
            />
        );
    }
}

const mapStateToProps = createSelector(
    getDepartments,
    getUserOrganisationId,
    getInviteFetchingStatus,
    getFetchingFiltersStatus,
    (
        departments,
        userOrganisation,
        isFetchingInvite,
        isFetchingFilters,
    ): InviteEmployeeStateProps => ({
        departments,
        userOrganisation,
        isFetchingInvite,
        isFetchingFilters,
    }),
);

export const InviteEmployeeContainer = connect(
    mapStateToProps,
    { getDepartmentsRequest, inviteEmployeeRequest, redirectToUrl },
)(InviteEmployee);
