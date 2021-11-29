package com.sun.tingle.member.config;
import com.sun.tingle.member.api.service.MemberService;
import com.sun.tingle.member.auth.JwtAuthenticationFilter;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.member.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
//Spring Security를 활성화
@EnableWebSecurity
//Controller에서 특정 페이지에 특정 권한이 있는 유저만 접근을 허용할 경우 @PreAuthorize 어노테이션을 사용하는데
//해당 어노테이션에 대한 설정을 활성화시키는 어노테이션.
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtUtil jwtUtil;
    // Password 인코딩 방식에 BCrypt 암호화 방식 사용
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtUtil)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                .authorizeRequests() //시큐리티 처리에 HttpServletRequest를 이용한다는 것을 의미
                .antMatchers("/auth/**").permitAll()
                //antMatchers()는 특정한 경로를 지정합니다.
                .antMatchers("/members/**").hasAnyRole("TEACHER","STUDENT")
                .antMatchers("/calendar/**").hasAnyRole("TEACHER","STUDENT")
                .antMatchers("/mission/**").hasAnyRole("TEACHER","STUDENT")
                .antMatchers("/file/**").hasAnyRole("TEACHER","STUDENT")
//                .antMatchers("/notification/**").hasAnyRole("TEACHER","STUDENT")
                .antMatchers("**/messages/**").hasAnyRole("TEACHER","STUDENT")
                .antMatchers("**/message/**").hasAnyRole("TEACHER","STUDENT")
                .antMatchers("**/chat/**").hasAnyRole("TEACHER","STUDENT")
//                .antMatchers("/").authenticated()
                .anyRequest().permitAll()
                .and().cors();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers("/**/chat/**");
    }
}
