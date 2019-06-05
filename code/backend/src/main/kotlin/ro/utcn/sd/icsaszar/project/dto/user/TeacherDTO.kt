package ro.utcn.sd.icsaszar.project.dto.user

import ro.utcn.sd.icsaszar.project.model.user.Teacher

class TeacherDTO(
        val username: String,
        val firstName: String,
        val lastName: String,
        val id: Long = 0
) {
    companion object{
        fun fromTeacher(teacher: Teacher): TeacherDTO {
            return TeacherDTO(
                    teacher.username,
                    teacher.firstName,
                    teacher.lastName,
                    teacher.id
            )
        }
    }
}