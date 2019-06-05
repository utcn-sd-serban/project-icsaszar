package ro.utcn.sd.icsaszar.project.persistence.participation

import org.springframework.data.repository.CrudRepository
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult

interface ParticipationResultRepository : CrudRepository<ParticipationResult, Long> {
}