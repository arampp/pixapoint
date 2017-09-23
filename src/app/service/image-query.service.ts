import { SearchResultCollection } from './search-result-collection';
import { Base64coder } from './base64coder';
import { Config } from './../config';
import { Observable, Subject } from 'rxjs/Rx';
import { SearchResult } from './search-result';
import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Injectable()
export class ImageQueryService {

  private baseURL = 'https://pixabay.com/api/?key=' + this.config.pixabayApiKey;

  constructor(private config: Config, private http: HttpClient, private base64: Base64coder) { }

  search(queryString: string): Observable<SearchResult[]> {
    const page = 1;
    const resultsPerPage = 20;
    return this.http.get(this.baseURL + '&q="' + queryString + '"&response_group=high_resolution', {responseType: 'json'})
      .map(result => this.createSearchResults(result, page, resultsPerPage).results);
  }

  getAsBase64(toDownload: SearchResult): Observable<string> {
    const url = toDownload.imageURL;

     return this.http.get(url, {responseType: 'arraybuffer'})
    .map(result => {
      return this.base64.encode(result);
    });
  }

  private createSearchResults(apiResponse: any, page: number, resultsPerPage: number): SearchResultCollection {
    const searchResults = apiResponse.hits.map(r => new SearchResult(r.previewURL, r.webformatURL, r.webformatWidth, r.webformatHeight));
    const totalResults = apiResponse.total;
    return new SearchResultCollection(searchResults, totalResults, page, resultsPerPage);
  }
}
