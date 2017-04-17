package net.folderit.service

import net.folderit.domain.User
import net.folderit.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class UserService @Autowired constructor(var userRepository: UserRepository, var roleService: RoleService) {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    fun findAll(): MutableIterable<User>? {
        return userRepository.findAll()
    }

    @Transactional
    fun save(user: User): Long? {
        user.password = passwordEncoder().encode(user.password)

/*        val role = roleService.findByAuthority("ROLE_USER")
        val roles = ArrayList<Roles>()
        roles.add(role)
        user.roles = roles
*/

        val mUser = userRepository.save(user)
        return mUser.id
    }

}