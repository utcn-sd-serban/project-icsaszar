package ro.utcn.sd.icsaszar.project.exception

class StudentGroupNotFoundException private constructor(msg: String): EntityNotFoundException(msg) {

    companion object {
        fun ofName(name: String): StudentGroupNotFoundException {
            return StudentGroupNotFoundException("Group with name $name not found")
        }
    }
}