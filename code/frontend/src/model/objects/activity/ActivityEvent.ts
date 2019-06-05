export class Round {

    constructor(
        readonly name: string,
        readonly id: number = 0
    ) {}

}

export class ActivityEvent {

    constructor (
        readonly round: Round,
        readonly date: Date,
        readonly location: string,
        readonly id: number = 0
    ) {}
}