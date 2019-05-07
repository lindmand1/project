import { Form } from 'antd';
import * as React from 'react';

import { FormWrapper } from 'src/common/components';
import { notificationText, showNotification } from 'src/common/helpers/notifications';
import { AntdFormProps } from 'src/common/models/antdModel';
import { FormHeader } from 'src/features/create/styled';
import { SupplierInviteUsersContainerProps } from '../containers/SupplierInviteUsersContainer';

import { SupplierInviteForm } from 'src/features/edit/components/SupplierInviteForm';

type SupplierEditUsersProps = AntdFormProps & SupplierInviteUsersContainerProps;

class SupplierInviteUsersForm extends React.Component<SupplierEditUsersProps> {
    private handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();

        this.props.form.validateFields((error, values) => {
            if (error) {
                return showNotification({ text: notificationText.Error });
            }

            return this.props.inviteEmployeeRequest(values);
        });
    };

    public render(): JSX.Element {
        return (
            <FormWrapper>
                <Form onSubmit={this.handleSubmit}>
                    <FormHeader>Invite Employees</FormHeader>
                    <SupplierInviteForm showInviteButton {...this.props} />
                </Form>
            </FormWrapper>
        );
    }
}

export const SupplierInviteUsers = Form.create({})(SupplierInviteUsersForm);
