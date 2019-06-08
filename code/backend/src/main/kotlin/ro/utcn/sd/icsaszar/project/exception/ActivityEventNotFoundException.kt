package ro.utcn.sd.icsaszar.project.exception

import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import java.lang.RuntimeException

class ActivityEventNotFoundException private constructor(msg: String): RuntimeException(msg) {
    companion object {
        fun ofId(id: Long): ActivityEventNotFoundException {
            return ActivityEventNotFoundException("ActivityEvent with id $id not found")
        }
    }
}