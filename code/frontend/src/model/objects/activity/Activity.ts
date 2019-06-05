import {ActivityEvent} from "./ActivityEvent";

export class Organizer {

    constructor(
        readonly name: string,
        readonly id: number = 0
    ) {
    }
}

export class Category {

    constructor(
        readonly name: string,
        readonly id: number = 0
    ) {
    }

}


export class Activity {

    constructor(
        readonly name: string,
        readonly organizer: Organizer,
        readonly category: Category,
        readonly events: ActivityEvent[] = [],
        readonly id: number = 0
    ) {
    }
}

