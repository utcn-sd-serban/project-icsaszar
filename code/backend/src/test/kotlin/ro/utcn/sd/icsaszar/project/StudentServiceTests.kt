package ro.utcn.sd.icsaszar.project

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.Executable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import ro.utcn.sd.icsaszar.project.service.user.StudentService

@SpringBootTest
class StudentServiceTests {

    @Autowired
    private lateinit var studentService: StudentService

    @Test
    fun `Student 1 is in group 1`() {
        val students = studentService.findStudentsByGroupName("g1")
        Assertions.assertAll(
                Executable { Assertions.assertEquals(students.size, 1) },
                Executable { Assertions.assertEquals(students[0].username, "s1") },
                Executable { Assertions.assertEquals(students[0].group.name, "g1") }
        )
    }
}