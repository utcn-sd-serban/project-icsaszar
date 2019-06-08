package ro.utcn.sd.icsaszar.project.controller

import org.springframework.web.bind.annotation.*
import ro.utcn.sd.icsaszar.project.dto.participation.NewParticipationDTO
import ro.utcn.sd.icsaszar.project.dto.participation.ParticipationDTO
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup
import ro.utcn.sd.icsaszar.project.service.StudentService

@RestController
@RequestMapping("/student")
class StudentController (
        private val studentService: StudentService
){

    @GetMapping("/groups")
    fun getStudentGroups(): List<StudentGroup>{
        return studentService.findAllStudentGroups()
    }

    @PostMapping("/participations")
    fun addParticipation(@RequestBody newParticipationDTO: NewParticipationDTO): ParticipationDTO{
        val (event, preparingTeacher, result) = newParticipationDTO
        return studentService.addParticipation(event.id, preparingTeacher.id, result).toDTO()
    }
}