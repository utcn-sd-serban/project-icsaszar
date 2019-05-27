package ro.utcn.sd.icsaszar.project.seed

import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Profile
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import ro.utcn.sd.icsaszar.project.model.user.*
import ro.utcn.sd.icsaszar.project.persistence.*

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@Profile("dev", "test", "prod")
class AppSeed(
        private val passwordEncoder: PasswordEncoder,
        private val studentRepository: StudentRepository,
        private val teacherRepository: TeacherRepository,
        private val adminRepository: AdminRepository,
        private val studentGroupRepository: StudentGroupRepository
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        clear()
        println("Seeding app")

        val groups: Map<String, StudentGroup> = mapOf(
                "g1" to StudentGroup("g1"),
                "g2" to StudentGroup("g2"),
                "g3" to StudentGroup("g3"),
                "g4" to StudentGroup("g4")
        )

        val users: Map<String, User> = mapOf(
                "t1" to Teacher("t1", "ft1", "lt1", passwordEncoder.encode("pass1")),
                "t2" to Teacher("t2", "ft2", "lt2", passwordEncoder.encode("pass2")),
                "t3" to Teacher("t3", "ft3", "lt3", passwordEncoder.encode("pass3")),
                "s1" to Student("s1", "fs1", "ls1", passwordEncoder.encode("pass4"), groups["g1"]!!),
                "s2" to Student("s2", "fs2", "ls2", passwordEncoder.encode("pass5"), groups["g2"]!!),
                "s3" to Student("s3", "fs3", "ls3", passwordEncoder.encode("pass6"), groups["g3"]!!),
                "a1" to Admin("a1", "fa1", "la1", passwordEncoder.encode("pass7"))
        )


        groups.values.forEach {
            studentGroupRepository.save(it)
        }


        users.values.forEach{
            when(it){
                is Student -> studentRepository.save(it)
                is Teacher -> teacherRepository.save(it)
                is Admin -> adminRepository.save(it)
            }
        }
    }

    private fun clear(){
        studentRepository.deleteAll()
        teacherRepository.deleteAll()
        adminRepository.deleteAll()
        studentGroupRepository.deleteAll()
    }
}