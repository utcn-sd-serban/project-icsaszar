package ro.utcn.sd.icsaszar.project.exception

import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import java.lang.RuntimeException

class ParticipationAlreadyExistsException private constructor(msg: String) : RuntimeException(msg){
    companion object{
        fun ofId(participationId: ParticipationId): ParticipationAlreadyExistsException{
            return ParticipationAlreadyExistsException("Participation with id $participationId already exists!")
        }
    }
}