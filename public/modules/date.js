export default class ParsedDate {
    constructor(dateString = null) {
        this.dt;
        if (dateString) {
            this.dt = new Date(dateString);
        } else {
            this.dt = new Date();
        }

        this.day = this.dt.getDate().toString().padStart(2, '0');
        this.month = (this.dt.getMonth() + 1).toString().padStart(2, '0');
        this.year = this.dt.getFullYear();
        this.yearShort = this.dt.getFullYear().toString().slice(2).padStart(2, '0');
        this.hour = this.dt.getHours().toString().padStart(2, '0');
        this.minute = this.dt.getMinutes().toString().padStart(2, '0');
        this.second =this.dt.getSeconds().toString().padStart(2, '0');
    }

    getDateString() {
        return `${this.day}.${this.month}.${this.yearShort} ${this.hour}:${this.minute}:${this.second}`;
    }

    getShortDateString() {
        return `${this.day}.${this.month}.${this.yearShort} ${this.hour}:${this.minute}`;
    }
}
