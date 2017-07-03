package net.folderit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableOAuth2Client
@EnableAuthorizationServer
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final DataSource dataSource;
    private final OAuth2ClientContext oAuth2ClientContext;

    @Autowired
    public WebSecurityConfig(@Qualifier("dataSource") DataSource dataSource, @Qualifier("oauth2ClientContext") OAuth2ClientContext oAuth2ClientContext) {
        this.dataSource = dataSource;
        this.oAuth2ClientContext = oAuth2ClientContext;

    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.GET, "/metadata/**").permitAll()
                .antMatchers(HttpMethod.GET, "/users/external").permitAll()
                .antMatchers(HttpMethod.POST, "/users/registration").permitAll()
                .antMatchers(HttpMethod.GET, "/auth/regitrationConfirm").permitAll()
                .antMatchers(HttpMethod.GET, "/pais").permitAll()
                .antMatchers(HttpMethod.GET, "/persona/afip").permitAll()
                .antMatchers(HttpMethod.GET, "/obraSocial").permitAll()
                .antMatchers(HttpMethod.GET, "/users/validEmail").permitAll()
                .antMatchers(HttpMethod.POST, "/users/changePassword").permitAll()
                .antMatchers(HttpMethod.GET, "/test/sync").permitAll()
                .anyRequest().authenticated()
                .and()
                // We filter the api/login requests
                .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class);


    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Create a default account
        // Create a default account
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder())
                .usersByUsernameQuery("select email as principal, password as credentials, true from users where email = ?")
                .authoritiesByUsernameQuery(
                        "select U.email as principal, A.authority as role " +
                                "from authorities A, users U, users_roles UR " +
                                "where U.id = UR.users_id " +
                                "and A.id = UR.roles_id " +
                                "and true = U.enabled " +
                                "and U.email = ?")
                .rolePrefix("ROLE_");
        auth.inMemoryAuthentication().withUser("HigeaDirect").password("alagrandelepusecuca2017").roles("ADMIN");
    }


}