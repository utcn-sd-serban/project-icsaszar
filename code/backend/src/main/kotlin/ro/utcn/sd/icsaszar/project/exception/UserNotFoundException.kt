package ro.utcn.sd.icsaszar.project.exception

class UserNotFoundException private constructor(msg: String) : RuntimeException(msg) {
    companion object  {
        fun ofName(name: String) = UserNotFoundException("User with username $name not found!")
        fun ofId(id: Long) = UserNotFoundException("User with id $id not found!")
        fun ofMsg(msg: String) = UserNotFoundException(msg)
    }
}