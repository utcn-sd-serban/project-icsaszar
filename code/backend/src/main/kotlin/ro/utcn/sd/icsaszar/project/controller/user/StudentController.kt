package ro.utcn.sd.icsaszar.project.controller.user

import org.springframework.web.bind.annotation.*
import ro.utcn.sd.icsaszar.project.dto.participation.NewParticipationDTO
import ro.utcn.sd.icsaszar.project.dto.participation.ParticipationDTO
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.service.user.StudentService

@RestController
@RequestMapping("/student")
class StudentController (
        private val studentService: StudentService
){

    @GetMapping("/groups")
    fun getStudentGroups(): List<StudentGroup>{
        return studentService.findAllStudentGroups()
    }

    @GetMapping("/participations")
    fun getParticipations(@RequestParam(name = "status", required = false) status: ParticipationReviewStatus?): List<ParticipationDTO>{
        val result = if(status == null)
            studentService.findAllParticipations()
        else
            studentService.findParticipationsByStatus(status)
        return result.map { it.toDTO() }
    }

    @PostMapping("/participations")
    fun addParticipation(@RequestBody newParticipationDTO: NewParticipationDTO): ParticipationDTO{
        val (event, preparingTeacher, result) = newParticipationDTO
        return studentService.addParticipation(event.id, preparingTeacher.id, result).toDTO()
    }
}