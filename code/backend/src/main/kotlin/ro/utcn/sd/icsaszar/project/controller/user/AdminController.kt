package ro.utcn.sd.icsaszar.project.controller.user

import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import ro.utcn.sd.icsaszar.project.dto.activity.ActivityEventDTO
import ro.utcn.sd.icsaszar.project.dto.user.StudentDTO
import ro.utcn.sd.icsaszar.project.model.activity.Activity
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.service.user.AdminService

@RestController
@RequestMapping("/admin")
class AdminController(
        private val adminService: AdminService
) {

    private val logger = LoggerFactory.getLogger(AdminController::class.java)

    @GetMapping("/students")
    fun getStudentsByGroupName(
            @RequestParam(name = "group", required = false) group: String?
    ): List<StudentDTO> {

        val students =
                if (group != null)
                    adminService.findStudentsByGroup(group)
                else
                    adminService.findAllStudents()
        return students.map { it.toDTO() }
    }

    @PostMapping("/groups")
    fun createNewStudentGroup(@RequestBody studentGroup: StudentGroup): StudentGroup {
        TODO()
    }

    @PostMapping("/students")
    fun addStudent(@RequestBody student: Student): StudentDTO {
        return adminService.registerStudent(student).toDTO()
    }

    @PostMapping("/teachers")
    fun addTeacher(@RequestBody teacher: Teacher): Teacher {
        logger.info("Added teacher $teacher")
        return adminService.registerTeacher(teacher)
    }



    @PostMapping("/activities")
    fun createActivity(@RequestBody activity: Activity): Activity {
        logger.info("Added activity $activity")
        return adminService.createNewActivity(activity)
    }

    @PostMapping("/activities/{id}/events")
    fun createActivityEvent(@PathVariable id: Long, @RequestBody activityEvent: ActivityEventDTO): ActivityEventDTO {
        logger.info("Added activityEvent $activityEvent")
        return adminService.createNewActivityEvent(id, activityEvent).toDTO()
    }
}