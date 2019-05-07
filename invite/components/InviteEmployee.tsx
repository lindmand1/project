import * as React from 'react';
import { Form as AntdForm } from 'antd';
import { FormComponentProps, FormProps } from 'antd/lib/form';

import { Filters } from 'src/features/contract/models/contractModels';
import {
    Form,
    FormWrapper,
    Input,
    NavigationTabs,
    PhoneInput,
    Select,
    SubmitButton,
    ResetButton,
    NavigationTiles,
} from 'src/common/components';
import { FormHeader } from 'src/features/create/styled';

import { InviteByEmail, InvitePaths, InviteNavigationTabs } from '../models/inviteModel';
import { notificationText, showNotification } from 'src/common/helpers/notifications';
import { EmployeeRole } from 'src/features/edit/components/EmployeeRole';

export interface InviteEmployeeProps {
    departments: Filters[];
    isFetching: boolean;
    userOrganisation: number;
    inviteEmployeeRequest(employee: InviteByEmail): void;
    redirect(path: string): void;
}

type Props = InviteEmployeeProps & FormComponentProps & FormProps;

class InviteEmployeeForm extends React.Component<Props> {
    private handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.props.form.validateFields((error, { email, ...values }) =>
            error
                ? showNotification({ text: notificationText.Error })
                : this.props.inviteEmployeeRequest({ email: email.toLowerCase(), ...values }),
        );
    };

    public render(): JSX.Element {
        const { form, departments, isFetching, redirect } = this.props;

        return (
            <FormWrapper>
                <NavigationTiles
                    defaultActiveKey={InvitePaths.Employee}
                    onTileClick={redirect}
                    tabs={InviteNavigationTabs}
                />
                <NavigationTabs
                    defaultActiveKey={InvitePaths.Employee}
                    onTabClick={redirect}
                    tabs={InviteNavigationTabs}
                />
                <Form onSubmit={this.handleSubmit}>
                    <FormHeader>Invite Employee</FormHeader>
                    <ResetButton form={form} />
                    <Input form={form} id="firstName" placeholder="First Name" required />
                    <Input form={form} id="lastName" placeholder="Last Name" required />
                    <Input
                        form={form}
                        id="email"
                        type="email"
                        message="Please enter an email address"
                        placeholder="Email Address"
                        required
                    />
                    <PhoneInput form={form} id="telephone" placeholder="Telephone Number" />
                    <Select
                        form={form}
                        id="department"
                        placeholder="Department"
                        options={departments}
                        required
                    />
                    <EmployeeRole form={form} />
                    <SubmitButton isFetching={isFetching} value="Invite Employee" />
                </Form>
            </FormWrapper>
        );
    }
}

export const InviteEmployee = AntdForm.create({})(InviteEmployeeForm);
