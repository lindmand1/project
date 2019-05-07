import { inject, injectable } from 'inversify';

import { HttpService } from 'src/common/services/HttpService';
import { SERVICE } from 'src/config/identifiers';
import { config } from 'src/config/appConfig';

import { InviteByEmail } from '../models/inviteModel';

@injectable()
export class InviteService {
    constructor(@inject(SERVICE.Http) private readonly http: HttpService) {}

    public inviteEmployee(employeeData: InviteByEmail): Promise<void> {
        return this.http.POST(config.routeConfig.invite, employeeData);
    }

    public inviteNewPotentialExecutive(executive: InviteByEmail): Promise<void> {
        return this.http.POST(`${config.routeConfig.potentialExecutives}invite-new/`, executive);
    }

    public invitePotentialExecutives(ids: number[]): Promise<void> {
        return this.http.POST(`${config.routeConfig.potentialExecutives}invite/`, { ids });
    }
}
