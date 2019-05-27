package ro.utcn.sd.icsaszar.project.persistence

import org.springframework.data.repository.CrudRepository
import ro.utcn.sd.icsaszar.project.model.user.Teacher

interface TeacherRepository : CrudRepository<Teacher, Long>