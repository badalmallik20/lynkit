import {Injectable} from '@angular/core';
import {AdminService} from '../services/admin.service';


@Injectable({
    providedIn: 'root'
})
export class UserRegistrationComponentService {
    constructor(public api: AdminService) {
    }

    submitForm(data, url) {
        return this.api.postData(url, data);
    }

}
