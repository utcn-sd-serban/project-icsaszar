package ro.utcn.sd.icsaszar.project.model.report

import ro.utcn.sd.icsaszar.project.model.activity.Category
import ro.utcn.sd.icsaszar.project.model.activity.Round

class TeacherReport(
        val header: String,
        val rows: List<ReportRow>
)

data class ReportRow(
        val category: Category,
        val subRows: List<ReportSubRow>
)

data class ReportSubRow(
        val round: Round,
        val count: Long
)