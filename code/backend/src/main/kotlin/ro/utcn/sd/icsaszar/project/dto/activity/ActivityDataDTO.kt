package ro.utcn.sd.icsaszar.project.dto.activity

import ro.utcn.sd.icsaszar.project.model.activity.Activity
import ro.utcn.sd.icsaszar.project.model.activity.Category
import ro.utcn.sd.icsaszar.project.model.activity.Organizer
import ro.utcn.sd.icsaszar.project.model.activity.Round

data class ActivityDataDTO (
        val organizers: List<Organizer>,
        val categories: List<Category>,
        val activities: List<ActivityDTO>,
        val rounds: List<Round>
)