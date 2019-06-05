package ro.utcn.sd.icsaszar.project.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.model.activity.ActivityEvent
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentGroupRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentRepository

@Service
@Transactional
class StudentService(
        private val studentRepository: StudentRepository,
        private val groupRepository: StudentGroupRepository,
        private val participationRepository: ParticipationRepository
){

    fun addParticipation(
            activityEvent: ActivityEvent,
            student: Student,
            preparingTeacher: Teacher,
            result: ParticipationResult
    ): Participation{
        val participation = Participation(activityEvent, student, preparingTeacher, result)
        return participationRepository.save(participation)
    }

    fun findStudentsByGroupName(groupName: String): List<Student> =
        studentRepository.findByGroup_Name(groupName)

    fun findStudentByName(){

    }

    fun findAllStudentGroups(): List<StudentGroup>{
        return groupRepository.findAll().toList()
    }
}