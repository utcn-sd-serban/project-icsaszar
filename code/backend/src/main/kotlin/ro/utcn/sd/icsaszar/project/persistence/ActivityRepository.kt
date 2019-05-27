package ro.utcn.sd.icsaszar.project.persistence

import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.Repository
import ro.utcn.sd.icsaszar.project.model.Activity

interface ActivityRepository : CrudRepository<Activity, Long>