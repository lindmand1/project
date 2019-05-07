import * as React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps, FormProps } from 'antd/lib/form';
import { Link } from 'react-router-dom';

import { generateColumns } from 'src/common/helpers/utils';
import { PaginatedTable } from 'src/features/pagination/components/PaginatedTable';
import { FormHeader } from 'src/features/create/styled';
import { SubmitButton } from 'src/common/components';
import { Organisation } from 'src/features/organisation/models/organisationModels';

import { InviteOrganisationProps } from '../containers/InviteOrganisationContainer';
import { PaginationView } from 'src/features/pagination/models/paginationModel';
import { getPotentialExecutivesSuccess } from 'src/features/organisation/actions/organisationActions';

interface InviteOrganisationState {
    selectedOrganisationIds: number[];
}

type AddOrganisationProps = InviteOrganisationProps & FormComponentProps & FormProps;

const addOrganisationColumns = [
    {
        title: 'Organisation',
        key: 'name',
        render: (name: string, { id }: Organisation) => (
            <Link to={`edit-organisations/${id}`}>{name}</Link>
        ),
    },
];

class AddOrganisation extends React.Component<AddOrganisationProps, InviteOrganisationState> {
    public state: InviteOrganisationState = {
        selectedOrganisationIds: [],
    };

    private handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.props.invitePotentialExecutivesRequest(this.state.selectedOrganisationIds);
    };

    private searchOrganisations = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.saveFilters({
            paginatedView: PaginationView.AddOrganisation,
            values: {
                name: event.currentTarget.value,
            },
        });

        this.props.paginationRequest({
            view: PaginationView.AddOrganisation,
            pagination: {
                current: 1,
            },
            paginationSuccessCallback: getPotentialExecutivesSuccess,
        });
    };

    private onSelectChange = (selectedOrganisationIds: number[]) =>
        this.setState({ selectedOrganisationIds });

    public componentWillUnmount = () => this.props.clearFilters(PaginationView.AddOrganisation);

    public render(): JSX.Element {
        const {
            selectedOrganisationIds: { length },
        } = this.state;

        const buttonText = `Add ${length > 1 ? `organisations (${length})` : 'organistation'}`;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormHeader>Add Organisation</FormHeader>
                <Input.Search
                    placeholder="Search organisations"
                    onChange={this.searchOrganisations}
                />
                <PaginatedTable
                    view={PaginationView.AddOrganisation}
                    paginationSuccessCallback={getPotentialExecutivesSuccess}
                    data={this.props.potentialExecutives}
                    columns={generateColumns(addOrganisationColumns)}
                    emptyText="No organisations found"
                    rowSelection={{
                        selectedRowKeys: this.state.selectedOrganisationIds,
                        onChange: this.onSelectChange,
                    }}
                />
                <SubmitButton
                    disabled={this.state.selectedOrganisationIds.length === 0}
                    value={buttonText}
                />
            </Form>
        );
    }
}

export const AddOrganisationForm = Form.create({})(AddOrganisation);
