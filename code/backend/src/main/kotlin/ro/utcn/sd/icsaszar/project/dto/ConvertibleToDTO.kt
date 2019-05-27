package ro.utcn.sd.icsaszar.project.dto

interface ConvertibleToDTO<T> {
    fun toDTO(): T
}