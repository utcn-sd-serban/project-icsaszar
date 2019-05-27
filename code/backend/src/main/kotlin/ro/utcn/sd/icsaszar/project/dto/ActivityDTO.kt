package ro.utcn.sd.icsaszar.project.dto

import ro.utcn.sd.icsaszar.project.model.Category
import ro.utcn.sd.icsaszar.project.model.Organizer

data class ActivityDTO(
    val id: Long,
    val name: String,
    val organizer: Organizer,
    val category: Category
)
