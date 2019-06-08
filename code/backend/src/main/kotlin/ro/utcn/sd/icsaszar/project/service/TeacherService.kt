package ro.utcn.sd.icsaszar.project.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.exception.ActivityEventNotFoundException
import ro.utcn.sd.icsaszar.project.exception.ParticipationNotFoundException
import ro.utcn.sd.icsaszar.project.exception.UserNotFoundException
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.persistence.activity.ActivityEventRepository
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentRepository
import ro.utcn.sd.icsaszar.project.persistence.user.TeacherRepository

@Service
@Transactional
class TeacherService
(
        private val teacherRepository: TeacherRepository,
        private val participationRepository: ParticipationRepository,
        private val activityEventRepository: ActivityEventRepository,
        private val studentRepository: StudentRepository,
        private val userDetailsService: AppUserDetailsService
) {

    fun reviewParticipation(
            eventId: Long,
            studentId: Long,
            assignedStatus: ParticipationReviewStatus
    ): Participation {
        val event = activityEventRepository.findByIdOrNull(eventId) ?: throw ActivityEventNotFoundException.ofId(eventId)
        val student = studentRepository.findByIdOrNull(studentId) ?: throw UserNotFoundException.ofId(studentId)
        val participationId = ParticipationId(event, student)

        val participation = participationRepository.findByIdOrNull(participationId) ?: throw ParticipationNotFoundException.ofId(participationId)

        participation.reviewStatus = assignedStatus
        return participationRepository.save(participation)
    }

    fun findAllParticipations():List<Participation>{
        val currentUser = userDetailsService.loadCurrentUser() as Teacher
        return participationRepository.findAllByPreparingTeacher_Id(currentUser.id)
    }

    fun findParticipationsByStatus(status: ParticipationReviewStatus): List<Participation>{
        val currentUser = userDetailsService.loadCurrentUser() as Teacher
        return participationRepository.findAllByPreparingTeacher_IdAndReviewStatus(currentUser.id, status)
    }
}