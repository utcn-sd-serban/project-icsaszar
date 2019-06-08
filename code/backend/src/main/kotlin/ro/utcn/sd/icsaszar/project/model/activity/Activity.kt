package ro.utcn.sd.icsaszar.project.model.activity

import ro.utcn.sd.icsaszar.project.dto.ConvertibleToDTO
import ro.utcn.sd.icsaszar.project.dto.activity.ActivityDTO
import javax.persistence.*

@Entity
data class Organizer(
        val name: String,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Organizer) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}

@Entity
data class Category(
        val name: String,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Category) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}

@Entity
class Activity(
        val name: String,

        @ManyToOne
        @JoinColumn(name = "organizer_id", nullable = false)
        val organizer: Organizer,

        @ManyToOne
        @JoinColumn(name = "category_id", nullable = false)
        val category: Category,

        @OneToMany(
                mappedBy = "activity",
                orphanRemoval = true,
                cascade = [CascadeType.MERGE, CascadeType.REMOVE]
        )
        val events: MutableSet<ActivityEvent>,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) : ConvertibleToDTO<ActivityDTO> {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Activity) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }

    override fun toDTO(): ActivityDTO {
        return ActivityDTO.fromActivity(this)
    }
}