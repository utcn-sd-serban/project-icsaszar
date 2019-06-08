package ro.utcn.sd.icsaszar.project.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.exception.ActivityEventNotFoundException
import ro.utcn.sd.icsaszar.project.exception.UserNotFoundException
import ro.utcn.sd.icsaszar.project.model.activity.ActivityEvent
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.persistence.activity.ActivityEventRepository
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationRepository
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationResultRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentGroupRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentRepository
import ro.utcn.sd.icsaszar.project.persistence.user.TeacherRepository

@Service
@Transactional
class StudentService(
        private val studentRepository: StudentRepository,
        private val groupRepository: StudentGroupRepository,
        private val participationRepository: ParticipationRepository,
        private val activityEventRepository: ActivityEventRepository,
        private val participationResultRepository: ParticipationResultRepository,
        private val teacherRepository: TeacherRepository,
        private val userDetailsService: AppUserDetailsService
){

    fun addParticipation(
            activityEventId: Long,
            preparingTeacherId: Long,
            result: ParticipationResult
    ): Participation{
        val currentUser = userDetailsService.loadCurrentUser() as Student

        val activityEvent = activityEventRepository.findByIdOrNull(activityEventId) ?: throw ActivityEventNotFoundException.ofId(activityEventId)
        val preparingTeacher = teacherRepository.findByIdOrNull(preparingTeacherId) ?: throw UserNotFoundException.ofId(preparingTeacherId)

        val participation = Participation(activityEvent, currentUser, preparingTeacher, result)
        return participationRepository.save(participation)
    }

    fun findStudentsByGroupName(groupName: String): List<Student> =
        studentRepository.findByGroup_Name(groupName)

    fun findAllStudentGroups(): List<StudentGroup>{
        return groupRepository.findAll().toList()
    }
}