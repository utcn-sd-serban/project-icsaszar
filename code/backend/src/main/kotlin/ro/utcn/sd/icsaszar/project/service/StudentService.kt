package ro.utcn.sd.icsaszar.project.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.persistence.StudentGroupRepository
import ro.utcn.sd.icsaszar.project.persistence.StudentRepository

@Service
@Transactional
class StudentService(
        private val studentRepository: StudentRepository,
        private val groupRepository: StudentGroupRepository
){

    fun findStudentsByGroupName(groupName: String): List<Student> =
        studentRepository.findByGroup_Name(groupName)

    fun findStudentByName(){

    }

    fun createStudent(username: String,  password: String, firstName: String, lastName: String, groupName: String): Student{
        val group = groupRepository.findStudentGroupByName(groupName) ?: throw Exception()
        val newStudent = Student(username, firstName, lastName, password, group)
        return studentRepository.save(newStudent)
    }
}