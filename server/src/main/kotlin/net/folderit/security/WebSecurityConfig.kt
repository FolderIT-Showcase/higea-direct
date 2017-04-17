package net.folderit.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.client.OAuth2ClientContext
import org.springframework.security.oauth2.client.OAuth2RestTemplate
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.filter.CompositeFilter
import javax.servlet.Filter
import javax.sql.DataSource

@Configuration
@EnableWebSecurity
@EnableOAuth2Sso
class WebSecurityConfig
@Autowired
constructor(var dataSource: DataSource, var oAuth2ClientContext: OAuth2ClientContext) : WebSecurityConfigurerAdapter() {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    override fun setAuthenticationConfiguration(authenticationConfiguration: AuthenticationConfiguration?) {
        super.setAuthenticationConfiguration(authenticationConfiguration)
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.csrf().disable().authorizeRequests()

                // configuracion para JWT

                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .anyRequest().authenticated()
                .and()
                // We filter the api/login requests
                .addFilterBefore(JWTLoginFilter("/login", authenticationManager()),
                        UsernamePasswordAuthenticationFilter::class.java)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter::class.java)

                // facebook

                .antMatcher("/**")
                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter::class.java)
    }

    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder?) {

        // usuario admin en memoria
        // TODO: cambiar por uno mejor o deshabilitar en produccion
        auth!!.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN")

        // Create a default account
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder())
                .usersByUsernameQuery("select username as principal, password as credentials, true from users where username = ?")
                .authoritiesByUsernameQuery(
                        "select U.username as principal, A.authority as role " +
                                "from authorities A, users U, users_roles UR " +
                                "where U.id = UR.users_id " +
                                "and A.id = UR.roles_id " +
                                "and U.username = ?")
                .rolePrefix("ROLE_")

    }

    private fun ssoFilter(): Filter {
        val filter: CompositeFilter = CompositeFilter()
        val filters: ArrayList<Filter> = ArrayList()
        filters.add(ssoFilter(facebook(), "/login/facebook"))
        filters.add(ssoFilter(google(), "/login/google"))
        filter.setFilters(filters);
        return filter
    }

    private fun ssoFilter(client: ClientResources, path: String): Filter {
        val filter = OAuth2ClientAuthenticationProcessingFilter(path)
        val template = OAuth2RestTemplate(client.getClient(), oAuth2ClientContext)
        filter.setRestTemplate(template)
        val tokenServices = UserInfoTokenServices(
                client.getResource().getUserInfoUri(), client.getClient().getClientId())
        tokenServices.setRestTemplate(template)
        filter.setTokenServices(tokenServices)
        return filter
    }


    @Bean
    @ConfigurationProperties("facebook.client")
    fun facebook(): ClientResources {
        return ClientResources()
    }

    @Bean
    @ConfigurationProperties("facebook.resource")
    fun facebookResource(): ResourceServerProperties {
        return ResourceServerProperties()
    }

    @Bean
    @ConfigurationProperties("google.client")
    fun google(): ClientResources {
        return ClientResources()
    }

    @Bean
    @ConfigurationProperties("google.resource")
    fun googleResource(): ResourceServerProperties {
        return ResourceServerProperties()
    }

    @Bean
    fun oauth2ClientFilterRegistration(filter: OAuth2ClientContextFilter): FilterRegistrationBean {
        val registration = FilterRegistrationBean()
        registration.filter = filter
        registration.order = -100
        return registration
    }

}