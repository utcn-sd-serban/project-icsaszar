package ro.utcn.sd.icsaszar.project.persistence

import org.springframework.data.repository.CrudRepository
import ro.utcn.sd.icsaszar.project.model.user.StudentGroup

interface StudentGroupRepository : CrudRepository<StudentGroup, Long> {
    fun findStudentGroupByName(name: String): StudentGroup?
}