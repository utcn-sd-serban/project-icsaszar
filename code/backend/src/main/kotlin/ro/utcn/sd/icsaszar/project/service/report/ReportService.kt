package ro.utcn.sd.icsaszar.project.service.report

import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ro.utcn.sd.icsaszar.project.model.report.ReportRow
import ro.utcn.sd.icsaszar.project.model.report.ReportSubRow
import ro.utcn.sd.icsaszar.project.model.report.TeacherReport
import ro.utcn.sd.icsaszar.project.model.user.Teacher
import ro.utcn.sd.icsaszar.project.persistence.activity.CategoryRepository
import ro.utcn.sd.icsaszar.project.persistence.activity.RoundRepository
import ro.utcn.sd.icsaszar.project.persistence.participation.ParticipationRepository
import ro.utcn.sd.icsaszar.project.service.user.AppUserDetailsService

@Service
@Transactional
class ReportService(
        private val participationRepository: ParticipationRepository,
        private val userDetailsService: AppUserDetailsService,
        private val roundRepository: RoundRepository,
        private val  categoryRepository: CategoryRepository
) {

    fun generateReport(): TeacherReport{
        val currentUser = userDetailsService.loadCurrentUser() as Teacher
        val rounds = roundRepository.findAll().toList()
        val categories = categoryRepository.findAll().toList()

        val reportRows = mutableListOf<ReportRow>()

        for (category in categories){
            val subRows = mutableListOf<ReportSubRow>()
            for (round in rounds){
                val count = participationRepository
                        .countAllByActivityEvent_Activity_Category_IdAndActivityEvent_Round_Id(category.id, round.id)
                subRows.add(ReportSubRow(round, count))
            }
            reportRows.add(ReportRow(category, subRows))
        }

        return TeacherReport(currentUser.firstName + " " + currentUser.lastName, reportRows)
    }
}