package ro.utcn.sd.icsaszar.project.controller.advice

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import ro.utcn.sd.icsaszar.project.dto.error.ErrorDTO
import ro.utcn.sd.icsaszar.project.exception.EntityNotFoundException
import ro.utcn.sd.icsaszar.project.exception.ParticipationAlreadyExistsException

@RestControllerAdvice
class ErrorController {
    @ExceptionHandler(EntityNotFoundException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleNotFoundException(exception: EntityNotFoundException): ErrorDTO {
        return ErrorDTO(exception.message!!)
    }

    @ExceptionHandler(ParticipationAlreadyExistsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleAlreadyExistsException(exception: ParticipationAlreadyExistsException): ErrorDTO {
        return ErrorDTO(exception.message!!)
    }
}