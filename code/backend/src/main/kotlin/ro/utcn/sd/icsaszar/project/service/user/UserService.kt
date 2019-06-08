package ro.utcn.sd.icsaszar.project.service.user

import org.springframework.stereotype.Service
import ro.utcn.sd.icsaszar.project.exception.UserNotFoundException
import ro.utcn.sd.icsaszar.project.model.user.User
import ro.utcn.sd.icsaszar.project.persistence.user.UserRepository

@Service
class UserService(
        private val userRepository: UserRepository
){
    fun getUserByUsername(username: String): User {
        return userRepository.findByUsername(username) ?: throw UserNotFoundException.ofName(username)
    }
}