package ro.utcn.sd.icsaszar.project.persistence

import org.springframework.data.repository.CrudRepository
import ro.utcn.sd.icsaszar.project.model.user.Student

interface StudentRepository : CrudRepository<Student, Long>{
    fun findByGroup_Name(groupName: String): List<Student>
}