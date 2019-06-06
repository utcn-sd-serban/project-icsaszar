package ro.utcn.sd.icsaszar.project.service

import org.springframework.stereotype.Service
import ro.utcn.sd.icsaszar.project.dto.activity.ActivityDataDTO
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.persistence.activity.ActivityRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.CategoryRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.OrganizerRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.RoundRepository
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationResultRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentGroupRepository
import ro.utcn.sd.icsaszar.project.persistence.user.TeacherRepository

@Service
class ReadOnlyDataService(
        // Read only interface for common data access
        // be used here
        private val activityRepository: ActivityRepository,
        private val roundRepository: RoundRepository,
        private val categoryRepository: CategoryRepository,
        private val organizerRepository: OrganizerRepository,
        private val teacherRepository: TeacherRepository,
        private val participationResultRepository: ParticipationResultRepository,
        private val studentGroupRepository: StudentGroupRepository
) {
    fun getActivityData(): ActivityDataDTO {
        val activities = activityRepository.findAll().map {
            it.toDTO()
        }.toList()
        val organizers = organizerRepository.findAll().toList()
        val categories = categoryRepository.findAll().toList()
        val rounds = roundRepository.findAll().toList()
        val results = participationResultRepository.findAll().toList()
        return ActivityDataDTO(organizers, categories, activities, rounds, results)
    }

    fun getStudentGroups(): List<StudentGroup> {
        return studentGroupRepository.findAll().toList()
    }

    fun getTeachers(): List<Teacher> {
        return teacherRepository.findAll().toList()
    }
}