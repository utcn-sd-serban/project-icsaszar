package ro.utcn.sd.icsaszar.project.service

import org.springframework.stereotype.Service
import ro.utcn.sd.icsaszar.project.dto.activity.ActivityDataDTO
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.persistence.activity.ActivityRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.CategoryRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.OrganizerRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.RoundRepository

@Service
class ReadOnlyDataService(
        // Read only interface for common data access
        // be used here
        private val activityRepository: ActivityRepository,
        private val roundRepository: RoundRepository,
        private val categoryRepository: CategoryRepository,
        private val organizerRepository: OrganizerRepository,
        private val studentService: StudentService,
        private val adminService: AdminService
) {
    fun getActivityData(): ActivityDataDTO {
        val activities = activityRepository.findAll().map {
            it.toDTO()
        }.toList()
        val organizers = organizerRepository.findAll().toList()
        val categories = categoryRepository.findAll().toList()
        val rounds = roundRepository.findAll().toList()
        return ActivityDataDTO(organizers, categories, activities, rounds)
    }

    fun getStudentGroups(): List<StudentGroup> {
        return studentService.findAllStudentGroups()
    }

    fun getTeachers(): List<Teacher> {
        return adminService.findAllTeachers()
    }
}