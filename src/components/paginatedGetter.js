import { request } from '../modules/requests';

export class paginatedGetter {
    URL;
    elementsByRequest;
    sortBy;
    sinceParamName;

    currentLastElement;

    constructor(baseURL, sinceParamName, startFrom, elementsByRequest, sortBy) {
        this.URL = new URL(baseURL);
        this.currentLastElement = startFrom;
        this.elementsByRequest = elementsByRequest;
        this.sinceParamName = sinceParamName;
        this.URL.searchParams.set(sinceParamName, startFrom);
    }

    queryToURL(query) {
        query.forEach((param) => {
            this.URL.searchParams.set(param[0], param[1]);
        });
        const nowPath = this.URL.toString();
        query.forEach((param) => {
            this.URL.searchParams.delete(param[0]);
        });
        return nowPath;
    }

    async getNextPage(...query) {
        const gotten = await request('GET', this.queryToURL(query), {});
        gotten.forEach((item) => {
            this.currentLastElement = Math.max(this.currentLastElement, item[this.sortBy]);
        });
        this.URL.searchParams.set(this.sinceParamName, this.currentLastElement);
        return gotten;
    }

    async get(...query) {
        return await request('GET', this.queryToURL(query), {});
    }
}
