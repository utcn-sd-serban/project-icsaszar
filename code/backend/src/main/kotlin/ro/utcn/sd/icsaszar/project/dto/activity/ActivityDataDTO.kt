package ro.utcn.sd.icsaszar.project.dto.activity

import ro.utcn.sd.icsaszar.project.model.activity.*

data class ActivityDataDTO (
        val organizers: List<Organizer>,
        val categories: List<Category>,
        val activities: List<ActivityDTO>,
        val rounds: List<Round>,
        val results: List<ParticipationResult>
)