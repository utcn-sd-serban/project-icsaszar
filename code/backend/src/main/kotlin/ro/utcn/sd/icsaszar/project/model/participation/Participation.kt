package ro.utcn.sd.icsaszar.project.model.participation

import com.fasterxml.jackson.annotation.JsonCreator
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import ro.utcn.sd.icsaszar.project.dto.ConvertibleToDTO
import ro.utcn.sd.icsaszar.project.dto.participation.ParticipationDTO
import ro.utcn.sd.icsaszar.project.model.activity.ActivityEvent
import ro.utcn.sd.icsaszar.project.model.activity.ParticipationResult
import ro.utcn.sd.icsaszar.project.model.user.Student
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import java.io.Serializable
import javax.persistence.*

enum class ParticipationReviewStatus(val status: String) {
    PENDING("PENDING"),
    APPROVED("APPROVED"),
    REJECTED("REJECTED");

    override fun toString(): String{
        return this.status
    }

    companion object{
        @JsonCreator
        fun create(value: String?): ParticipationReviewStatus{
            if(value == null)
                throw IllegalArgumentException()

            for (v in values()){
                if(value == v.status)
                    return v
            }

            throw IllegalArgumentException()
        }

    }
}

@Entity
@TypeDef(
        name = "pgsql_participation_review_status_enum",
        typeClass = PostgreSQLParticipationReviewStatusEnumType::class
)
class Participation(
        @EmbeddedId
        val id: ParticipationId,

        @ManyToOne
        @MapsId("activity_event_id")
        @JoinColumn(name = "activity_event_id")
        val activityEvent: ActivityEvent,

        @ManyToOne
        @MapsId("student_id")
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
        var reviewStatus: ParticipationReviewStatus = ParticipationReviewStatus.PENDING
) : ConvertibleToDTO<ParticipationDTO> {

    constructor(
            activityEvent: ActivityEvent,
            student: Student,
            preparingTeacher: Teacher,
            result: ParticipationResult,
            reviewStatus: ParticipationReviewStatus = ParticipationReviewStatus.PENDING
    ) : this(
            ParticipationId(activityEvent, student),
            activityEvent,
            student,
            preparingTeacher,
            result,
            reviewStatus
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Participation) return false

        return (activityEvent.id == other.activityEvent.id)
                && (student.id == other.student.id)
    }

    override fun hashCode(): Int {
        return 31
    }

    override fun toDTO(): ParticipationDTO {
        return ParticipationDTO.fromParticipation(this)
    }
}

@Embeddable
data class ParticipationId(
        @Column(name = "activity_event_id")
        val activityEventId: Long,
        @Column(name = "student_id")
        val studentId: Long) : Serializable {


    constructor(
            activityEvent: ActivityEvent,
            student: Student
    ) : this(
            activityEvent.id,
            student.id
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is ParticipationId) return false

        return (activityEventId == other.activityEventId)
                && (studentId == other.studentId)
    }

    override fun hashCode(): Int {
        return 31
    }
}