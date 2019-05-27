package ro.utcn.sd.icsaszar.project.controller

import org.springframework.web.bind.annotation.*
import ro.utcn.sd.icsaszar.project.dto.ActivityDTO
import ro.utcn.sd.icsaszar.project.dto.StudentDTO
import ro.utcn.sd.icsaszar.project.dto.UserDetailsDTO
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.service.AdminService

@RestController
@RequestMapping("/admin")
class AdminController(
        private val adminService: AdminService
) {

    @GetMapping("/students/{group}")
    fun getStudentsByGroupName(@PathVariable group: String): List<StudentDTO>{
        return adminService.getStudentsByGroup(group).map  {it.toDTO()}
    }

    @PostMapping("/groups")
    fun createNewGroup(@RequestBody studentGroup: StudentGroup): StudentGroup{
        TODO()
    }

    @PostMapping("/students")
    fun registerStudent(@RequestBody userDetailsDTO: UserDetailsDTO): StudentDTO{
        TODO()
    }

    @PostMapping("/activities")
    fun createActivity(@RequestBody activityDTO: ActivityDTO): ActivityDTO{
        TODO()
    }
}