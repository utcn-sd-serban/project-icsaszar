package ro.utcn.sd.icsaszar.project.model.participation

import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import ro.utcn.sd.icsaszar.project.model.activity.ActivityEvent
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import java.io.Serializable
import javax.persistence.*

enum class ParticipationReviewStatus {
    PENDING,
    APPROVED,
    REJECTED
}

@Entity
@IdClass(ParticipationId::class)
@TypeDef(
        name = "pgsql_participation_review_status_enum",
        typeClass = PostgreSQLParticipationReviewStatusEnumType::class
)
class Participation(
        @Id
        @ManyToOne
        @JoinColumn(name = "activity_event_id")
        val activityEvent: ActivityEvent,

        @Id
        @ManyToOne
        @JoinColumn(name = "student_id")
        val student: Student,

        @ManyToOne
        @JoinColumn(name = "preparing_teacher_id")
        val preparingTeacher: Teacher,

        @ManyToOne
        @JoinColumn(name = "result_id")
        val result: ParticipationResult,

        @Enumerated(EnumType.STRING)
        @Type(type = "pgsql_participation_review_status_enum")
        @Column(columnDefinition = "review_status", name = "status")
        var reviewStatus: ParticipationReviewStatus  = ParticipationReviewStatus.PENDING
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Participation) return false

        return (activityEvent.id == other.activityEvent.id)
                && (student.id == other.student.id)
    }

    override fun hashCode(): Int {
        return 31
    }
}

open class ParticipationId(open val activityEvent: ActivityEvent?, open val student: Student?) : Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is ParticipationId) return false

        return (activityEvent == other.activityEvent)
                && (student == other.student)
    }

    override fun hashCode(): Int {
        return 31
    }
}