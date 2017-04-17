package net.folderit.service

import net.folderit.domain.Roles
import net.folderit.repository.RoleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class RoleService @Autowired constructor(var roleRepository: RoleRepository) {

    fun findByAuthority(authority: String): Roles {
        val role = roleRepository.findFirstByAuthority(authority)
        return role
    }

}