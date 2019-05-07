import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { Organisation } from "src/features/organisation/models/organisationModels";
import { getPotentialExecutives } from "src/features/organisation/selectors/organisationSelectors";
import { redirectToUrl } from "src/common/actions/navigationAction";
import {
    paginationRequest,
    saveFilters,
    clearFilters
} from "src/features/pagination/actions/paginationActions";

import {
    invitePotentialExecutivesRequest,
    inviteNewPotentialExecutiveRequest
} from "../actions/inviteActions";
import { InviteOrganisation as InviteOrganisationComponent } from "../components/InviteOrganisation";

export interface InviteOrganisationStateProps {
    potentialExecutives: Organisation[];
}

interface InviteOrganisationDispatchProps {
    inviteNewPotentialExecutiveRequest: typeof inviteNewPotentialExecutiveRequest;
    invitePotentialExecutivesRequest: typeof invitePotentialExecutivesRequest;
    redirectToUrl: typeof redirectToUrl;
    paginationRequest: typeof paginationRequest;
    saveFilters: typeof saveFilters;
    clearFilters: typeof clearFilters;
}

export type InviteOrganisationProps = InviteOrganisationDispatchProps &
    InviteOrganisationStateProps;

export class InviteOrganisation extends React.Component<
    InviteOrganisationProps
> {
    public render(): JSX.Element {
        return <InviteOrganisationComponent {...this.props} />;
    }
}

const mapStateToProps = createSelector(
    getPotentialExecutives,
    (potentialExecutives): InviteOrganisationStateProps => ({
        potentialExecutives
    })
);

export const InviteOrganisationContainer = connect(
    mapStateToProps,
    {
        inviteNewPotentialExecutiveRequest,
        invitePotentialExecutivesRequest,
        redirectToUrl,
        paginationRequest,
        saveFilters,
        clearFilters
    }
)(InviteOrganisation);
