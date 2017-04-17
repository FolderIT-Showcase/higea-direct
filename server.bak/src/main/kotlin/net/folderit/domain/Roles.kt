package net.folderit.domain

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "authorities")
class Roles {

    @Id
    var id: Long? = null
    var authority: String? = null

}