package net.folderit.domain.core;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class User implements Serializable {

    private static final long serialVersionUID = 7379151108294137127L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty(access = WRITE_ONLY)
    private String password;

    private String firstName;

    private String lastName;

    @JsonProperty(access = WRITE_ONLY)
    private String externalId;

    @JsonProperty(access = WRITE_ONLY)
    private String type;

    private String email;

    @Column(name = "enabled")
    private boolean enabled = Boolean.FALSE;

    //@OneToMany(orphanRemoval=true, cascade={CascadeType.ALL})
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable
            (
                    name = "users_roles",
                    joinColumns = {@JoinColumn(name = "users_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "roles_id", referencedColumnName = "id", unique = false)}
            )
    private List<Roles> roles;

}
