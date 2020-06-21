
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuHttpService {

    constructor(private readonly http: HttpClient) { }

    /**
     * Get user menu item list
     */
    getUserMenuItemList() {
        return this.http.get('/menu/self');
    }
}
