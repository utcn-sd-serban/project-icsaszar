package ro.utcn.sd.icsaszar.project.exception

import java.lang.RuntimeException

abstract class EntityNotFoundException(msg: String) : RuntimeException(msg) {
}