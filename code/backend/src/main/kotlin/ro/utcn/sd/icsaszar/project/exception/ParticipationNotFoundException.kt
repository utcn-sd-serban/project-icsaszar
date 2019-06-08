package ro.utcn.sd.icsaszar.project.exception

import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import java.lang.RuntimeException

class ParticipationNotFoundException private constructor(msg: String): RuntimeException(msg) {
    companion object {
        fun ofId(participationId: ParticipationId): ParticipationNotFoundException{
            return ParticipationNotFoundException("Participation with id $participationId not found")
        }
    }
}