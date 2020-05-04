import { TestBed } from '@angular/core/testing';

import { CsvParserService } from './csv-parser.service';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {Ng2ImgMaxModule} from "ng2-img-max";
import {Router} from "@angular/router";

describe('CsvParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [FormsModule, HttpClientModule, Ng2ImgMaxModule],
  providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
  }));

  it('should be created', () => {
    const service: CsvParserService = TestBed.get(CsvParserService);
    expect(service).toBeTruthy();
  });
});