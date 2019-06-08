package ro.utcn.sd.icsaszar.project.persistence.participation

import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.Repository
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus

interface ParticipationRepository : CrudRepository<Participation, ParticipationId> {
    fun findAllByReviewStatus(status: ParticipationReviewStatus): List<Participation>
    fun findAllByPreparingTeacher_Id(teacherId: Long): List<Participation>
    fun findAllByPreparingTeacher_IdAndReviewStatus(teacherId: Long, status: ParticipationReviewStatus): List<Participation>
}