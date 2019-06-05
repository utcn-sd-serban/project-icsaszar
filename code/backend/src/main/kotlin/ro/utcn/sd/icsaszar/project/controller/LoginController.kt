package ro.utcn.sd.icsaszar.project.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import ro.utcn.sd.icsaszar.project.dto.user.UserDetailsDTO
import ro.utcn.sd.icsaszar.project.service.AppUserDetailsService

@RestController
class LoginController(
        private val appUserDetailsService: AppUserDetailsService
) {

    @GetMapping("/account")
    fun getDetails(): UserDetailsDTO {
        val user = appUserDetailsService.loadCurrentUser()
        return UserDetailsDTO(user.id, user.firstName, user.lastName, user.username, user.role)
    }
}