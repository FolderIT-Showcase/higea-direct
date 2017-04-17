package net.folderit.repository

import net.folderit.domain.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Long>