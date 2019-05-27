package ro.utcn.sd.icsaszar.project.model.user

import javax.persistence.*

@Entity
data class StudentGroup(
        val name: String,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is StudentGroup) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}

