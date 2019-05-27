package ro.utcn.sd.icsaszar.project.persistence

import org.springframework.data.repository.CrudRepository
import ro.utcn.sd.icsaszar.project.model.user.User

interface UserRepository : CrudRepository<User, Long> {
    fun findByUsername(username: String): User?
}