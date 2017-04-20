package net.folderit.repository;

import net.folderit.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findByLastName(String lastName);

    User findFirstByUsername(String username);

    User findByExternalIdAndType(String externalId,String type);
}
