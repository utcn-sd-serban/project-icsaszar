package ro.utcn.sd.icsaszar.project.seed

import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Profile
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.model.activity.*
import ro.utcn.sd.icsaszar.project.model.participation.Participation
import ro.utcn.sd.icsaszar.project.model.participation.ParticipationId
import ro.utcn.sd.icsaszar.project.model.user.*
import ro.utcn.sd.icsaszar.project.persistence.activity.*
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationRepository
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationResultRepository
import ro.utcn.sd.icsaszar.project.persistence.user.AdminRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentGroupRepository
import ro.utcn.sd.icsaszar.project.persistence.user.StudentRepository
import ro.utcn.sd.icsaszar.project.persistence.user.TeacherRepository
import java.time.LocalDateTime

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@Profile("dev", "test", "prod")
class AppSeed(
        private val passwordEncoder: PasswordEncoder,

        private val studentRepository: StudentRepository,
        private val teacherRepository: TeacherRepository,
        private val adminRepository: AdminRepository,
        private val studentGroupRepository: StudentGroupRepository,

        private val activityRepository: ActivityRepository,
        private val activityEventRepository: ActivityEventRepository,
        private val roundRepository: RoundRepository,
        private val organizerRepository: OrganizerRepository,
        private val categoryRepository: CategoryRepository,
        private val participationResultRepository: ParticipationResultRepository,
        private val participationRepository: ParticipationRepository
) : CommandLineRunner {

    @Transactional
    override fun run(vararg args: String?) {
        clear()
        println("Seeding app")

        // I learned from the first assignment that using array indices to select an item
        // is a bad idea and groups["g1"] is a lot clearer than groups[1]
        val groups: Map<String, StudentGroup> = mapOf(
                "g1" to StudentGroup("g1"),
                "g2" to StudentGroup("g2"),
                "g3" to StudentGroup("g3"),
                "g4" to StudentGroup("g4")
        )

        val savedGroups = groups.map { (key, value) ->
            key to studentGroupRepository.save(value)
        }.toMap()

        val students = mutableListOf<Student>(
                Student("s1", "fs1", "ls1", passwordEncoder.encode("pass4"), savedGroups["g1"]!!),
                Student("s2", "fs2", "ls2", passwordEncoder.encode("pass5"), savedGroups["g2"]!!),
                Student("s3", "fs3", "ls3", passwordEncoder.encode("pass6"), savedGroups["g3"]!!)
        )

        val teachers = mutableListOf<Teacher>(
                Teacher("t1", "ft1", "lt1", passwordEncoder.encode("pass1")),
                Teacher("t2", "ft2", "lt2", passwordEncoder.encode("pass2")),
                Teacher("t3", "ft3", "lt3", passwordEncoder.encode("pass3"))
        )

        val admins = mutableListOf<Admin>(
                Admin("a1", "fa1", "la1", passwordEncoder.encode("pass7"))
        )

        studentRepository.saveAll(students)
        teacherRepository.saveAll(teachers)
        adminRepository.saveAll(admins)

        val organizers = mutableListOf<Organizer>(
                Organizer("Organizer 1"),
                Organizer("Organizer 2")
        )
        val categories = mutableListOf<Category>(
                Category("Olympiad"),
                Category("Officially accepted"),
                Category("Other")
        )
        val rounds = mutableListOf<Round>(
                Round("Qualification"),
                Round("Local"),
                Round("Regional"),
                Round("National"),
                Round("International")
        )

        organizerRepository.saveAll(organizers)
        categoryRepository.saveAll(categories)
        roundRepository.saveAll(rounds)

        val activities = mutableListOf<Activity>(
                Activity("a1", organizers[0], categories[0], mutableSetOf<ActivityEvent>()),
                Activity("a2", organizers[1], categories[0], mutableSetOf<ActivityEvent>())
        )

        val events = mutableListOf<ActivityEvent>(
                ActivityEvent(rounds[0], LocalDateTime.now(), "Location 1", activities[0]),
                ActivityEvent(rounds[1], LocalDateTime.now(), "Location 2", activities[0]),
                ActivityEvent(rounds[0], LocalDateTime.now(), "Location 3", activities[1])
        )


        activityRepository.saveAll(activities)

        events.forEach{
            it.activity.events.add(it)
        }

        activityEventRepository.saveAll(events)

        val results = listOf<ParticipationResult>(
                ParticipationResult("Participation"),
                ParticipationResult("1st place"),
                ParticipationResult("2nd place"),
                ParticipationResult("3rd place")
        )

        participationResultRepository.saveAll(results)

        val participations = listOf<Participation>(
                Participation(events[0], students[0], teachers[0], results[0]),
                Participation(events[0], students[1], teachers[0], results[1]),
                Participation(events[1], students[1], teachers[1], results[3]),
                Participation(events[2], students[2], teachers[1], results[2])
        )

        participationRepository.saveAll(participations)
    }

    private fun clear(){
        studentRepository.deleteAll()
        teacherRepository.deleteAll()
        adminRepository.deleteAll()
        studentGroupRepository.deleteAll()

        activityRepository.deleteAll()
        activityEventRepository.deleteAll()
        roundRepository.deleteAll()
        organizerRepository.deleteAll()
        categoryRepository.deleteAll()
    }
}