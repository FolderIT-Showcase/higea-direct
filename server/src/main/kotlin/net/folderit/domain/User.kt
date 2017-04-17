package net.folderit.domain

import javax.persistence.*

@Entity
@Table(name = "users")
class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null
    var username: String? = null
    var password: String? = null
    var firstName: String? = null
    var lastName: String? = null
    @ManyToMany
    @JoinTable(name = "users_roles", joinColumns = arrayOf(JoinColumn(name = "users_id", referencedColumnName = "id")), inverseJoinColumns = arrayOf(JoinColumn(name = "roles_id", referencedColumnName = "id", unique = false)))
    var roles: List<Roles>? = null

}