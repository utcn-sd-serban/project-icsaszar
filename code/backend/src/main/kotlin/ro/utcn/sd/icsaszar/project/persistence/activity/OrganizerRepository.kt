package ro.utcn.sd.icsaszar.project.persistence.activity

import org.springframework.data.repository.CrudRepository
import ro.utcn.sd.icsaszar.project.model.activity.Organizer

interface OrganizerRepository : CrudRepository<Organizer, Long> {
}