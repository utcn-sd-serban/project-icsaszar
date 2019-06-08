package ro.utcn.sd.icsaszar.project.dto.participation

import ro.utcn.sd.icsaszar.project.dto.activity.ActivityEventDTO
import ro.utcn.sd.icsaszar.project.dto.user.TeacherDTO
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus

data class NewParticipationDTO(
        val event: ActivityEventDTO,
        val preparingTeacher: TeacherDTO,
        val result: ParticipationResult
) {

}

data class ParticipationStatusDTO(
        val status: ParticipationReviewStatus
)