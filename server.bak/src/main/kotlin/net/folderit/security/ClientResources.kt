package net.folderit.security

import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties
import org.springframework.boot.context.properties.NestedConfigurationProperty
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails

class ClientResources {
    @NestedConfigurationProperty
    private val client = AuthorizationCodeResourceDetails()

    @NestedConfigurationProperty
    private val resource = ResourceServerProperties()

    fun getClient(): AuthorizationCodeResourceDetails {
        return client
    }

    fun getResource(): ResourceServerProperties {
        return resource
    }
}