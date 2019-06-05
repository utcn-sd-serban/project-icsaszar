package ro.utcn.sd.icsaszar.project.model.activity

import ro.utcn.sd.icsaszar.project.dto.ConvertibleToDTO
import ro.utcn.sd.icsaszar.project.dto.activity.ActivityEventDTO
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import java.io.Serializable
import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Round(
        val name: String,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Round) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}

@Entity
class ActivityEvent(

        @ManyToOne
        @JoinColumn(name = "round_id")
        val round: Round,

        val date: LocalDateTime,
        val location: String,

        @ManyToOne
        @JoinColumn(name = "activity_id")
        val activity: Activity,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) : ConvertibleToDTO<ActivityEventDTO> {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is ActivityEvent) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }

    override fun toDTO(): ActivityEventDTO {
        return ActivityEventDTO.fromActivityEvent(this)
    }
}

@Entity
@Table(name = "result")
data class ParticipationResult(
        val name: String,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is ParticipationResult) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}

