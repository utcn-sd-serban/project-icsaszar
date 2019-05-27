package ro.utcn.sd.icsaszar.project.model

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

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is ActivityEvent) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}