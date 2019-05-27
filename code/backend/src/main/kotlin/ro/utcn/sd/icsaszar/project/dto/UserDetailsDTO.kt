package ro.utcn.sd.icsaszar.project.dto

import ro.utcn.sd.icsaszar.project.model.user.*


data class UserDetailsDTO(
        val firstName: String,
        val lastName: String,
        val username: String,
        val role: UserRole
) {
    companion object {
        fun fromUser(user: User): UserDetailsDTO =
            UserDetailsDTO(user.firstName, user.lastName, user.username, user.role)
    }
}