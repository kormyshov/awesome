export class Weekdays {

    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;

    constructor(
        mon: boolean = false, 
        tue: boolean = false, 
        wed: boolean = false, 
        thu: boolean = false, 
        fri: boolean = false, 
        sat: boolean = false, 
        sun: boolean = false
    ) {
        this.mon = mon;
        this.tue = tue;
        this.wed = wed;
        this.thu = thu;
        this.fri = fri;
        this.sat = sat;
        this.sun = sun;
    }
}
