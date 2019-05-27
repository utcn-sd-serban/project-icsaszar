package ro.utcn.sd.icsaszar.project

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.core.userdetails.UserDetailsService
import ro.utcn.sd.icsaszar.project.exception.UserNotFoundException

@SpringBootTest
class UserServiceTests{

    @Autowired
    private lateinit var appUserDetailsService: UserDetailsService

    @Test
    fun `Teacher 1 is found` (){
        val user = appUserDetailsService.loadUserByUsername("t1")
        Assertions.assertEquals(user.username, "t1")
    }

    @Test
    fun `Teacher 4 is not found` (){
        Assertions.assertThrows(UserNotFoundException::class.java){
            appUserDetailsService.loadUserByUsername("t4")
        }
    }

    @Test
    fun `Student 1 is found` (){
        val user = appUserDetailsService.loadUserByUsername("s1")
        Assertions.assertEquals(user.username, "s1")
    }

    @Test
    fun `Student 4 is not found` (){
        Assertions.assertThrows(UserNotFoundException::class.java){
            appUserDetailsService.loadUserByUsername("s4")
        }
    }
}