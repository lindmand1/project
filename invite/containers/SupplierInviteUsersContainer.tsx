import * as React from "react";
import { connect } from "react-redux";

import { inviteEmployeeRequest } from "src/features/invite/actions/inviteActions";

import { SupplierInviteUsers as SupplierInviteUsersComponent } from "../components/SupplierInviteUsers";

interface SupplierInviteUsersContainerDispatchProps {
    inviteEmployeeRequest: typeof inviteEmployeeRequest;
}

export type SupplierInviteUsersContainerProps = SupplierInviteUsersContainerDispatchProps;

class SupplierInviteUsers extends React.Component<
    SupplierInviteUsersContainerProps
> {
    public render(): JSX.Element {
        return <SupplierInviteUsersComponent {...this.props} />;
    }
}

export const SupplierInviteUsersContainer = connect(
    null,
    {
        inviteEmployeeRequest
    }
)(SupplierInviteUsers);
