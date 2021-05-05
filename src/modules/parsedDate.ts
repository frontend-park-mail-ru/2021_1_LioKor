export default class ParsedDate {
    dt: Date;

    day: string;
    month: string;
    year: string;
    yearShort: string;
    hour: string;
    minute: string;
    second: string;

    constructor(dateString: string | null = null) {
        this.dt = (dateString) ? new Date(dateString) : new Date();

        this.day = this.dt.getDate().toString().padStart(2, '0');
        this.month = (this.dt.getMonth() + 1).toString().padStart(2, '0');
        this.year = this.dt.getFullYear().toString();
        this.yearShort = this.dt.getFullYear().toString().slice(2).padStart(2, '0');
        this.hour = this.dt.getHours().toString().padStart(2, '0');
        this.minute = this.dt.getMinutes().toString().padStart(2, '0');
        this.second = this.dt.getSeconds().toString().padStart(2, '0');
    }

    getYesterdayFormatString(): string {
        const now = new Date();
        if (this.dt.getDate() === now.getDate()) { // today
            return `${this.hour}:${this.minute}`;
        } else if (this.dt.getDate() === now.getDate() - 1) { // yesterday
            return `Вчера ${this.hour}:${this.minute}`;
        }
        // long time ago
        return `${this.day}.${this.month} ${this.hour}:${this.minute}`;
    }

    getDateString(): string {
        return `${this.day}.${this.month}.${this.yearShort} ${this.hour}:${this.minute}:${this.second}`;
    }

    getShortDateString(): string {
        return `${this.day}.${this.month}.${this.yearShort} ${this.hour}:${this.minute}`;
    }
}
