package ro.utcn.sd.icsaszar.project.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.persistence.ActivityRepository
import ro.utcn.sd.icsaszar.project.persistence.StudentRepository
import ro.utcn.sd.icsaszar.project.persistence.TeacherRepository

@Transactional
@Service
class AdminService(
    private val studentRepository: StudentRepository,
    private val teacherRepository: TeacherRepository,
    private val activityRepository: ActivityRepository
) {

    fun getStudentsByGroup(groupName: String): List<Student>{
        return studentRepository.findByGroup_Name(groupName)
    }
}