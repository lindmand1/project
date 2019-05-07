import * as React from 'react';
import { Tabs as AntdTabs } from 'antd';

import { FormWrapper, NavigationTabs, Tabs, NavigationTiles } from 'src/common/components';

import { AddOrganisationForm } from './AddOrganisationForm';
import { InviteOrganisationForm } from './InviteOrganisationForm';
import { InvitePaths, InviteNavigationTabs } from '../models/inviteModel';
import { InviteOrganisationProps } from '../containers/InviteOrganisationContainer';

export const InviteOrganisation: React.SFC<InviteOrganisationProps> = props => (
    <FormWrapper>
        <NavigationTiles
            defaultActiveKey={InvitePaths.Organisation}
            onTileClick={props.redirectToUrl}
            tabs={InviteNavigationTabs}
        />
        <NavigationTabs
            defaultActiveKey={InvitePaths.Organisation}
            onTabClick={props.redirectToUrl}
            tabs={InviteNavigationTabs}
        />
        <Tabs>
            <AntdTabs.TabPane key="add-organisation" tab="Add Organisation">
                <AddOrganisationForm {...props} />
            </AntdTabs.TabPane>
            <AntdTabs.TabPane key="invite-organisation" tab="Invite Organisation">
                <InviteOrganisationForm {...props} />
            </AntdTabs.TabPane>
        </Tabs>
    </FormWrapper>
);
