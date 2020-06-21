
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReferenceHttpService {

  constructor(private readonly http: HttpClient) {
  }

  getAllReferenceData() {
    return this.http.get('/reference/data');
  }

  getReferenceModelById(id: number) {
    return this.http.get(`/reference/id?id=${id}`);
  }
  persistReferenceModel(pdata: any) {
    return this.http.post('/reference', pdata);
  }
  getReferenceByCategoryAndKey(pdata: any) {
    return this.http.post('/reference/data', pdata);
  }
}
