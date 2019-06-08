package ro.utcn.sd.icsaszar.project.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.dto.activity.ActivityEventDTO
import ro.utcn.sd.icsaszar.project.exception.ActivityNotFoundException
import ro.utcn.sd.icsaszar.project.model.activity.Activity
import ro.utcn.sd.icsaszar.project.model.activity.ActivityEvent
import ro.utcn.sd.icsaszar.project.model.user.Admin
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.persistence.activity.ActivityEventRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.ActivityRepository
import ro.utcn.sd.icsaszar.project.persistence.user.AdminRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentGroupRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentRepository
import ro.utcn.sd.icsaszar.project.persistence.user.TeacherRepository

@Transactional
@Service
class AdminService(
        private val studentRepository: StudentRepository,
        private val teacherRepository: TeacherRepository,
        private val activityRepository: ActivityRepository,
        private val studentGroupRepository: StudentGroupRepository,
        private val adminRepository: AdminRepository,
        private val activityEventRepository: ActivityEventRepository

) {

    fun registerStudent(student: Student): Student{
        return studentRepository.save(student)
    }

    fun registerTeacher(teacher: Teacher): Teacher{
        return teacherRepository.save(teacher)
    }

    fun addNewAdmin(admin: Admin): Admin{
        return adminRepository.save(admin)
    }

    fun findStudentsByGroup(groupName: String): List<Student> {
        return studentRepository.findByGroup_Name(groupName)
    }

    fun findAllStudents(): List<Student> {
        return studentRepository.findAll().toList()
    }

    fun findAllTeachers(): List<Teacher> {
        return teacherRepository.findAll().toList()
    }


    fun addNewStudentGroup(name: String): StudentGroup {
        val group = StudentGroup(name)
        return studentGroupRepository.save(group)
    }

    fun createNewActivity(activity: Activity): Activity {
        return activityRepository.save(activity)
    }

    fun createNewActivityEvent(activityId: Long, activityEvent: ActivityEventDTO): ActivityEvent{
        val activity = activityRepository.findByIdOrNull(activityId) ?: throw ActivityNotFoundException.ofId(activityId)
        val newActivityEvent = ActivityEvent(
                activityEvent.round,
                activityEvent.date,
                activityEvent.location,
                activity
        )
        activity.events.add(newActivityEvent)
        return activityEventRepository.save(newActivityEvent)
    }

}