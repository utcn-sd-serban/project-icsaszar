package ro.utcn.sd.icsaszar.project

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ProjectApplication

fun main(args: Array<String>) {
    runApplication<ProjectApplication>(*args)
}
