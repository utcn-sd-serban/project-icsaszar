package ro.utcn.sd.icsaszar.project.dto

import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup

data class StudentDTO(
        val username: String,
        val firstName: String,
        val lastName: String,
        val group: StudentGroup
) {
    companion object {
        fun fromStudent(student: Student) =
                StudentDTO(
                        student.username,
                        student.firstName,
                        student.lastName,
                        student.group
                )
    }
}