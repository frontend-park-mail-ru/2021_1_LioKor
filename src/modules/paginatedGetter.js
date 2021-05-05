import { request } from './requests';

export default class paginatedGetter {

    constructor(baseURL, sinceParamName, startFrom, amountParamName, elementsByRequest, sortBy) {
        this.URL = new URL(baseURL);
        this.currentLastElement = startFrom;
        this.elementsByRequest = elementsByRequest;
        this.sinceParamName = sinceParamName;
        this.amountParamName = amountParamName;
        this.sortBy = sortBy;
        this.URL.searchParams.set(sinceParamName, startFrom);
        this.URL.searchParams.set(amountParamName, elementsByRequest);

        this.onErrorHandler = null;
    }

    queryToURL(query) {
        if (!query) {
            return this.URL.toString();
        }

        query.forEach((param) => {
            if (param.length === 2) {
                this.URL.searchParams.set(param[0], param[1]);
            }
        });
        const nowPath = this.URL.toString();
        query.forEach((param) => {
            this.URL.searchParams.delete(param[0]);
        });
        return nowPath;
    }

    async getNextPage(...query) {
        const gotten = await this.get(query);
        gotten.forEach((item) => {
            this.currentLastElement = Math.max(this.currentLastElement, item[this.sortBy]);
        });
        this.URL.searchParams.set(this.sinceParamName, this.currentLastElement);
        return gotten;
    }

    async get(...query) {
        const res = await request('GET', this.queryToURL(query), {});
        if (!res.ok) {
            if (this.onErrorHandler) {
                this.onErrorHandler(res);
            }
            return [];
        }

        return await res.json();
    }
}
