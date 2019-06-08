package ro.utcn.sd.icsaszar.project.dto.participation

import ro.utcn.sd.icsaszar.project.dto.activity.ActivityEventDTO
import ro.utcn.sd.icsaszar.project.dto.user.StudentDTO
import ro.utcn.sd.icsaszar.project.dto.user.TeacherDTO
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.Teacher

data class ParticipationDTO(
        val activityEvent: ActivityEventDTO,
        val student: StudentDTO,
        val preparingTeacher: TeacherDTO,
        val result: ParticipationResult,
        val reviewStatus: ParticipationReviewStatus
) {
    companion object{
        fun fromParticipation(participation: Participation): ParticipationDTO{
            return ParticipationDTO(
                    participation.activityEvent.toDTO(),
                    participation.student.toDTO(),
                    participation.preparingTeacher.toDTO(),
                    participation.result,
                    participation.reviewStatus
            )
        }
    }
}