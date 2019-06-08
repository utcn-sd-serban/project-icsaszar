package ro.utcn.sd.icsaszar.project.persistence.participation

import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.Repository
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus

interface ParticipationRepository : CrudRepository<Participation, ParticipationId> {
    fun findAllByReviewStatus(status: ParticipationReviewStatus): List<Participation>
    fun countAllByActivityEvent_Activity_Category_IdAndActivityEvent_Round_Id(categoryId: Long, roundId: Long): Long
    fun findAllByPreparingTeacher_Id(teacherId: Long): List<Participation>
    fun findAllByPreparingTeacher_IdAndReviewStatus(teacherId: Long, status: ParticipationReviewStatus): List<Participation>
    fun findAllByStudent_Id(studentId: Long): List<Participation>
    fun findAllByStudent_IdAndReviewStatus(studentId: Long, status: ParticipationReviewStatus): List<Participation>
}