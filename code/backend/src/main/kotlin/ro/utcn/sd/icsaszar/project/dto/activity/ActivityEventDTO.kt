package ro.utcn.sd.icsaszar.project.dto.activity

import ro.utcn.sd.icsaszar.project.model.activity.ActivityEvent
import ro.utcn.sd.icsaszar.project.model.activity.Round
import java.time.LocalDateTime

data class ActivityEventDTO(
        val round: Round,
        val date: LocalDateTime,
        val location: String,
        val id: Long = 0){
    companion object {
        fun fromActivityEvent(activityEvent: ActivityEvent): ActivityEventDTO{
            return ActivityEventDTO(
                    activityEvent.round,
                    activityEvent.date,
                    activityEvent.location,
                    activityEvent.id
            )
        }
    }
}