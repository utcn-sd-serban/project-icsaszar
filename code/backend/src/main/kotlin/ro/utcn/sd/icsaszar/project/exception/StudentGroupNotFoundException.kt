package ro.utcn.sd.icsaszar.project.exception

class StudentGroupNotFoundException : RuntimeException{
    constructor(name: String) : super("Group with name $name not found")
}