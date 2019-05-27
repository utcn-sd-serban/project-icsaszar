package ro.utcn.sd.icsaszar.project.model.user

import org.hibernate.annotations.TypeDef
import ro.utcn.sd.icsaszar.project.dto.ConvertibleToDTO
import ro.utcn.sd.icsaszar.project.dto.StudentDTO
import ro.utcn.sd.icsaszar.project.dto.UserDetailsDTO
import javax.persistence.*

enum class UserRole(val role: String) {
    STUDENT("ROLE_STUDENT"),
    TEACHER("ROLE_TEACHER"),
    ADMIN("ROLE_ADMIN")
}


@Entity
@Table(name = "users")
@TypeDef(
        name = "pgsql_role_enum",
        typeClass = PostgreSQLRoleEnumType::class)
@Inheritance(strategy = InheritanceType.JOINED)
// Using a sealed class of exhaustiveness checks when checking subclasses of User
// Sadly the subclasses must be in the same file
sealed class User(
        val username: String,
        val firstName: String,
        val lastName: String,
        val password: String,

        @Enumerated(EnumType.STRING)
        @org.hibernate.annotations.Type(type = "pgsql_role_enum")
        @Column(columnDefinition = "user_role")
        val role: UserRole,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}

@Entity
class Teacher(
        username: String,
        firstName: String,
        lastName: String,
        password: String,
        id: Long = 0
) : User(username, firstName, lastName, password, UserRole.TEACHER, id) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Teacher) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}

@Entity
class Student(
        username: String,
        firstName: String,
        lastName: String,
        password: String,

        @ManyToOne
        @JoinColumn(name = "group_id", nullable = false)
        val group: StudentGroup,
        id: Long = 0
) : User(username, firstName, lastName, password, UserRole.STUDENT, id), ConvertibleToDTO<StudentDTO> {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Student) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }

    override fun toDTO(): StudentDTO {
        return StudentDTO.fromStudent(this)
    }
}

@Entity
class Admin(
        username: String,
        firstName: String,
        lastName: String,
        password: String,
        id: Long = 0
): User(username, firstName, lastName, password, UserRole.ADMIN, id){
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Admin) return false

        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }
}