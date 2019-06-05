package ro.utcn.sd.icsaszar.project.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationRepository
import ro.utcn.sd.icsaszar.project.persistence.user.TeacherRepository

@Service
@Transactional
class TeacherService
(
        private val teacherRepository: TeacherRepository,
        private val participationRepository: ParticipationRepository
) {

    fun reviewParticipation(
            participationId: ParticipationId,
            assignedStatus: ParticipationReviewStatus
    ): Participation {
        val participation = participationRepository.findByIdOrNull(participationId) ?: throw Exception()
        participation.reviewStatus = assignedStatus
        return participationRepository.save(participation)
    }
}