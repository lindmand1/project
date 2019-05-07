import * as React from 'react';
import { Form as AntdForm } from 'antd';
import { FormComponentProps, FormProps } from 'antd/lib/form';

import { Form, Input, SubmitButton, PhoneInput, ResetButton } from 'src/common/components';
import { FormHeader } from 'src/features/create/styled';

import { InviteOrganisationProps as ContainerProps } from '../containers/InviteOrganisationContainer';
import { notificationText, showNotification } from 'src/common/helpers/notifications';

type InviteOrganisationProps = ContainerProps & FormComponentProps & FormProps;

class InviteOrganisation extends React.Component<InviteOrganisationProps> {
    private handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.props.form.validateFields((error, { email, ...values }) =>
            error
                ? showNotification({ text: notificationText.Error })
                : this.props.inviteNewPotentialExecutiveRequest({
                      email: email.toLowerCase(),
                      ...values,
                  }),
        );
    };

    public render(): JSX.Element {
        const { form } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormHeader>Invite Organisation</FormHeader>
                <ResetButton form={form} />
                <Input
                    form={form}
                    id="executiveName"
                    message="Please enter the organisation name"
                    placeholder="Organisation Name"
                />
                <Input
                    form={form}
                    id="firstName"
                    message="Please enter the admin's first name"
                    placeholder="Admin First Name"
                />
                <Input
                    form={form}
                    id="lastName"
                    message="Please enter the admin's last name"
                    placeholder="Admin Last Name"
                />
                <Input
                    form={form}
                    id="email"
                    type="email"
                    message="Please enter the admin's email address"
                    placeholder="Admin Email Address"
                />
                <PhoneInput form={form} id="telephone" placeholder="Telephone Number" />
                <SubmitButton value="Invite Organisation" />
            </Form>
        );
    }
}

export const InviteOrganisationForm = AntdForm.create({})(InviteOrganisation);
