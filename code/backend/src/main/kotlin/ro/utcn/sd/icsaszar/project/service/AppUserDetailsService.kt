package ro.utcn.sd.icsaszar.project.service

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.exception.UserNotFoundException
import ro.utcn.sd.icsaszar.project.model.user.UserRole
import ro.utcn.sd.icsaszar.project.persistence.UserRepository



@Transactional
@Service
class AppUserDetailsService(
        private val userService: UserService
) : UserDetailsService{
    override fun loadUserByUsername(username: String?): UserDetails {
        if (username == null)
            throw UserNotFoundException.ofMsg("User not found")
        val user = userService.getUserByUsername(username)
        val authority = SimpleGrantedAuthority(user.role.role)
        return User(user.username, user.password, listOf(authority))
    }

    fun loadCurrentUser(): ro.utcn.sd.icsaszar.project.model.user.User {
        val name = SecurityContextHolder.getContext().authentication.name
        return userService.getUserByUsername(name)
    }
}