package ro.utcn.sd.icsaszar.project.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
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
}