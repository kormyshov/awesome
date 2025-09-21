import { RRule, Weekday } from 'rrule';
import { Dayjs } from 'dayjs';


export class RepeatedRule {

    private freq: number;
    private dtstart: Dayjs;
    private interval: number;
    private byweekday: Weekday[];
    private bymonthday: number[];
    private bymonth: number[];

    constructor(freq: number, dtstart: Dayjs, interval: number, byweekday: Weekday[] = [], bymonthday: number[] = [], bymonth: number[] = []) {
        this.freq = freq;
        this.dtstart = dtstart;
        this.interval = interval;
        this.byweekday = byweekday;
        this.bymonthday = bymonthday;
        this.bymonth = bymonth;
    }

    public getTabValue(): number {
        return 3 - this.freq;
    }

    public getFreq(): number {
        return this.freq;
    }

    public getDtstart(): Dayjs {
        return this.dtstart;
    }

    public getInterval(): number {
        return this.interval;
    }

    public getByweekday(): Weekday[] {
        return this.byweekday;
    }

    public hasByweekday(num: number): boolean {
        return this.byweekday.map(weekday => weekday.weekday).includes(num);
    }

    public getBymonthday(): number[] {
        return this.bymonthday;
    }

    public getBymonth(): number[] {
        return this.bymonth;
    }

    public setFreq(freq: number) {
        this.freq = freq;
        if (freq > 0) {
            this.bymonth = [];
        }
    }

    public setDtstart(dtstart: Dayjs) {
        this.dtstart = dtstart;
    }

    public setInterval(interval: number) {
        this.interval = interval;
    }

    public setByweekday(byweekday: Weekday[]) {
        this.byweekday = byweekday;
        this.bymonthday = [];
    }

    public setBymonthday(bymonthday: number[]) {
        this.bymonthday = bymonthday;
        this.byweekday = [];
    }

    public setBymonth(bymonth: number[]) {
        this.bymonth = bymonth;
    }

    public nomalize() {
        if (this.freq < 2 && this.bymonthday.length === 0 && this.byweekday.length === 0){
            this.bymonthday = [1];
        }
        if (this.freq === 0 && this.bymonth.length === 0){
            this.bymonth = [1];
        }
    }

    public exportRrule(): RRule {
        console.log("this", this);
        if (this.freq === 3){
            return new RRule({
                freq: this.freq,
                dtstart: this.dtstart.toDate(),
                interval: this.interval,
            });
        }
        if (this.freq === 2){
            return new RRule({
                freq: this.freq,
                dtstart: this.dtstart.toDate(),
                interval: this.interval,
                byweekday: this.byweekday,
            });
        }
        if (this.freq === 1){
            return new RRule({
                freq: this.freq,
                dtstart: this.dtstart.toDate(),
                interval: this.interval,
                byweekday: this.byweekday,
                bymonthday: this.bymonthday,
            });
        }
        return new RRule({
            freq: this.freq,
            dtstart: this.dtstart.toDate(),
            interval: this.interval,
            byweekday: this.byweekday,
            bymonthday: this.bymonthday,
            bymonth: this.bymonth,
        });
    }
}
