package net.folderit.web

import net.folderit.domain.User
import net.folderit.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.Principal
import java.util.*


@RestController
@ComponentScan
@RequestMapping
@CrossOrigin(origins = arrayOf("*"), maxAge = 3600)
class UserController @Autowired constructor(var userService: UserService) {

    @GetMapping("/users")
    fun getAll(): ResponseEntity<MutableIterable<User>?> {
        return ResponseEntity(userService.findAll(), HttpStatus.OK)
    }

    @PostMapping("/users")
    fun createUser(@RequestBody user: User): ResponseEntity<*> {
        val userID = userService.save(user)
        return ResponseEntity.ok(userID)
    }

    @RequestMapping("/user", "/me")
    fun user(principal: Principal): Map<String, String> {
        val map = LinkedHashMap<String, String>()
        map.put("name", principal.getName())
        return map
    }

}