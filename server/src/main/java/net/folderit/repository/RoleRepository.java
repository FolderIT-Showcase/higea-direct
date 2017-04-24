package net.folderit.repository;

import net.folderit.domain.Roles;
import org.springframework.context.annotation.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Roles, Long> {

    Roles findByAuthority(String role);
}
