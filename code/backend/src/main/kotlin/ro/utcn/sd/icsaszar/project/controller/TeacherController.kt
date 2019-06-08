package ro.utcn.sd.icsaszar.project.controller

import org.springframework.web.bind.annotation.*
import ro.utcn.sd.icsaszar.project.dto.participation.ParticipationDTO
import ro.utcn.sd.icsaszar.project.dto.participation.ParticipationStatusDTO
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationReviewStatus
import ro.utcn.sd.icsaszar.project.service.TeacherService

@RestController
@RequestMapping("/teacher")
class TeacherController(
        private val teacherService: TeacherService
) {

    @GetMapping("/participations")
    fun getParticipations(@RequestParam(name = "status", required = false) status: ParticipationReviewStatus?): List<ParticipationDTO>{
        val result = if(status == null)
            teacherService.findAllParticipations()
        else
            teacherService.findParticipationsByStatus(status)
        return result.map { it.toDTO() }
    }

    // This could also a PUT action (with the whole modified object as a body),
    // and maybe it would be a better fit for this action,
    // since all it is really doing is editing a field,
    // but i feel like this solution has 2 advantages:
    //    - less data is send (only the new status)
    //    - it constrains to edit only to the relevant field
    // Also, since teachers can only edit the status of participations,
    // it won't cause confusion with adding new participations with a POST
    // without parameters
    @PostMapping("/participations")
    fun setParticipationReviewStatus(
            @RequestParam(name = "eventId", required = true) eventId: Long,
            @RequestParam(name = "studentId", required = true) studentId: Long,
            @RequestBody statusDTO: ParticipationStatusDTO
    ): ParticipationDTO{
        return teacherService.reviewParticipation(eventId, studentId, statusDTO.status).toDTO()
    }
}