package net.folderit.repository

import net.folderit.domain.Roles
import org.springframework.data.repository.CrudRepository

interface RoleRepository : CrudRepository<Roles, Long> {
    fun findFirstByAuthority(authority: String): Roles
}