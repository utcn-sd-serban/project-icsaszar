package ro.utcn.sd.icsaszar.project.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.config.http.UserDetailsServiceFactoryBean
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.security.web.savedrequest.RequestCache
import java.io.IOException
import javax.servlet.ServletException
import org.springframework.security.web.savedrequest.HttpSessionRequestCache
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import org.springframework.util.StringUtils


@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    private val userDetailsService: UserDetailsService,
    private val restAuthenticationEntryPoint: RestAuthenticationEntryPoint,
    private val successHandler: SavedRequestAwareAuthenticationSuccessHandler
) :
        WebSecurityConfigurerAdapter() {

    private val failureHandler = SimpleUrlAuthenticationFailureHandler()

    override fun configure(http: HttpSecurity?) {
        http
            ?.csrf()?.disable()
            ?.exceptionHandling()
                ?.authenticationEntryPoint(restAuthenticationEntryPoint)?.and()
            ?.authorizeRequests()
                ?.antMatchers("/admin/**")?.hasRole("ADMIN")
                ?.antMatchers("/teacher/**")?.hasRole("TEACHER")
                ?.antMatchers("/student/**")?.hasRole("STUDENT")
                ?.antMatchers("/details/**")?.hasAnyRole("ADMIN", "TEACHER", "STUDENT")
                ?.anyRequest()?.authenticated()?.and()
            ?.formLogin()
                ?.successHandler(successHandler)
                ?.failureHandler(failureHandler)
                ?.permitAll()?.and()
            ?.logout()?.and()
            ?.cors()?.and()
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.userDetailsService(userDetailsService)
                ?.passwordEncoder(passwordEncoder())
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}

@Component
class SavedRequestAwareAuthenticationSuccessHandler : SimpleUrlAuthenticationSuccessHandler() {

    private var requestCache: RequestCache = HttpSessionRequestCache()

    @Throws(ServletException::class, IOException::class)
    override fun onAuthenticationSuccess(
            request: HttpServletRequest,
            response: HttpServletResponse,
            authentication: Authentication) {

        val savedRequest = requestCache.getRequest(request, response)

        if (savedRequest == null) {
            clearAuthenticationAttributes(request)
            return
        }
        val targetUrlParam = targetUrlParameter
        if (isAlwaysUseDefaultTargetUrl || targetUrlParam != null && StringUtils.hasText(request.getParameter(targetUrlParam))) {
            requestCache.removeRequest(request, response)
            clearAuthenticationAttributes(request)
            return
        }

        clearAuthenticationAttributes(request)
    }

    fun setRequestCache(requestCache: RequestCache) {
        this.requestCache = requestCache
    }
}

@Component
class RestAuthenticationEntryPoint : AuthenticationEntryPoint{
    override fun commence(
            request: HttpServletRequest?,
            response: HttpServletResponse?,
            authException: AuthenticationException?) {
        response?.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")
    }
}