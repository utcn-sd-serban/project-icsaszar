package ro.utcn.sd.icsaszar.project.controller.data

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ro.utcn.sd.icsaszar.project.dto.activity.ActivityDataDTO
import ro.utcn.sd.icsaszar.project.dto.user.TeacherDTO
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.service.data.ReadOnlyDataService


@RestController
@RequestMapping("/data")
class DataController(
       private val readOnlyDataService: ReadOnlyDataService
) {

    @GetMapping("/activity-data")
    fun getActivityData(): ActivityDataDTO{
        return readOnlyDataService.getActivityData()
    }

    @GetMapping("/groups")
    fun getStudentGroups(): List<StudentGroup> {
        return readOnlyDataService.getStudentGroups()
    }

    @GetMapping("/teachers")
    fun getTeachers(): List<TeacherDTO> {
        return readOnlyDataService.getTeachers().map { it.toDTO() }
    }
}