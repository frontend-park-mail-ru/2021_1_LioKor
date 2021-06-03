import { request } from './requests';

export default class PaginatedGetter {
    constructor(baseURL, sinceParamName, startFrom, amountParamName, elementsByRequest, sortBy, sortDesc = false) {
        this.URL = new URL(baseURL);
        this.startFrom = startFrom;
        this.currentLastElement = startFrom;
        this.elementsByRequest = elementsByRequest;
        this.sinceParamName = sinceParamName;
        this.amountParamName = amountParamName;
        this.sortBy = sortBy;
        this.sortDesc = sortDesc;
        if (startFrom) {
            this.URL.searchParams.set(sinceParamName, startFrom);
        }
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

        if (gotten?.length > 0) {
            this.currentLastElement = gotten[0][this.sortBy];
        } else {
            this.currentLastElement = 1;
        }
        gotten.forEach((item) => {
            if (this.sortDesc) {
                if (item[this.sortBy] < this.currentLastElement || !this.currentLastElement) {
                    this.currentLastElement = item[this.sortBy];
                }
            } else {
                if (item[this.sortBy] > this.currentLastElement || !this.currentLastElement) {
                    this.currentLastElement = item[this.sortBy];
                }
            }
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

    async getFirstPage(...query) {
        this.URL.searchParams.set('since', this.startFrom);
        const res = await request('GET', this.queryToURL(query), {});
        this.URL.searchParams.set('since', this.currentLastElement);
        if (!res.ok) {
            if (this.onErrorHandler) {
                this.onErrorHandler(res);
            }
            return [];
        }

        return await res.json();
    }
}
