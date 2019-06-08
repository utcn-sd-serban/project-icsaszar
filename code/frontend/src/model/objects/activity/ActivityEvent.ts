export class Round {

    constructor(
        readonly name: string,
        readonly id: number = 0
    ) {
    }

}

export class ActivityEvent {

    constructor(
        readonly round: Round,
        readonly date: Date,
        readonly location: string,
        readonly id: number = 0
    ) {
    }

    static fromObject(
        {
            id,
            round,
            location,
            date
        }: ActivityEvent
    ): ActivityEvent {
        return new ActivityEvent(
            round,
            date,
            location,
            id
        )
    }

    static fromJSON(
        {
            id,
            round,
            location,
            date
        }: ActivityEvent
    ): ActivityEvent {
        return new ActivityEvent(
            round,
            new Date(date),
            location,
            id
        )
    }
}