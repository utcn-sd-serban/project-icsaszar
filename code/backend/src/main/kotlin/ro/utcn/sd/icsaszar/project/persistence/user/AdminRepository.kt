package ro.utcn.sd.icsaszar.project.persistence.user

import org.springframework.data.repository.CrudRepository
import ro.utcn.sd.icsaszar.project.model.user.Admin

interface AdminRepository : CrudRepository<Admin, Long>