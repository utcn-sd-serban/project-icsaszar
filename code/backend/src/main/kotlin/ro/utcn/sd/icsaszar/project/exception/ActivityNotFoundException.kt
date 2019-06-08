package ro.utcn.sd.icsaszar.project.exception

import java.lang.RuntimeException

class ActivityNotFoundException private constructor(msg: String) : RuntimeException(msg){
    companion object {
        fun ofId(id: Long): ActivityNotFoundException{
            return ActivityNotFoundException("Activity with id $id not found")
        }
    }
}