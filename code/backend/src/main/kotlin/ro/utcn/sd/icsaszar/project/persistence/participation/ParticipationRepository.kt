package ro.utcn.sd.icsaszar.project.persistence.participation

import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.Repository
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId

interface ParticipationRepository : CrudRepository<Participation, ParticipationId> {

}