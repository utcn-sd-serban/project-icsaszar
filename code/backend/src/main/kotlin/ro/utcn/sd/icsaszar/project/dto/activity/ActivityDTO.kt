package ro.utcn.sd.icsaszar.project.dto.activity

import ro.utcn.sd.icsaszar.project.model.activity.Activity
import ro.utcn.sd.icsaszar.project.model.activity.Category
import ro.utcn.sd.icsaszar.project.model.activity.Organizer

data class ActivityDTO(
        val name: String,
        val organizer: Organizer,
        val category: Category,
        val events: List<ActivityEventDTO>,
        val id: Long
) {
    companion object {
        fun fromActivity(activity: Activity): ActivityDTO {
            return ActivityDTO(
                    activity.name,
                    activity.organizer,
                    activity.category,
                    activity.events.map { it.toDTO() },
                    activity.id)

        }
    }
}
