package net.folderit.repository;

import net.folderit.domain.core.Roles;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Roles, Long> {

    Roles findByAuthority(String role);
}
