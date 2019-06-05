package ro.utcn.sd.icsaszar.project.dto.user

import ro.utcn.sd.icsaszar.project.model.user.*


data class UserDetailsDTO(
        val id: Long,
        val firstName: String,
        val lastName: String,
        val username: String,
        val role: UserRole
) {
    companion object {
        fun fromUser(user: User): UserDetailsDTO =
                UserDetailsDTO(
                        user.id,
                        user.firstName,
                        user.lastName,
                        user.username,
                        user.role)
    }
}


data class UserDetailsWithPasswordDTO(
        val firstName: String,
        val lastName: String,
        val username: String,
        val password: String
) {
    companion object {
        fun fromUser(user: User): UserDetailsWithPasswordDTO =
                UserDetailsWithPasswordDTO(
                        user.firstName,
                        user.lastName,
                        user.username,
                        user.password)
    }
}


data class StudentDetailsWithPasswordDTO(
        val firstName: String,
        val lastName: String,
        val username: String,
        val password: String,
        val groupName: String
) {
    companion object {
        fun fromUser(user: User): UserDetailsWithPasswordDTO =
                UserDetailsWithPasswordDTO(
                        user.firstName,
                        user.lastName,
                        user.username,
                        user.password)
    }
}