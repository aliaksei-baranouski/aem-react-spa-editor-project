package com.adobe.aem.guides.wknd.spa.react.core.services;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "SalesForce config", description = "Setting up SalesForce credentials")
public @interface SalesForceConfig {

    @AttributeDefinition(
            name = "Username",
            description = "SalesForce Username property",
            type = AttributeType.STRING
    )
    String salesforce_username() default StringUtils.EMPTY;

    @AttributeDefinition(
            name = "Password",
            description = "SalesForce Password property",
            type = AttributeType.STRING
    )
    String salesforce_password() default StringUtils.EMPTY;

    @AttributeDefinition(
            name = "Client ID",
            description = "SalesForce Client ID property",
            type = AttributeType.STRING
    )
    String salesforce_client_id() default StringUtils.EMPTY;

    @AttributeDefinition(
            name = "Client Secret",
            description = "SalesForce Client Secret property",
            type = AttributeType.STRING
    )
    String salesforce_client_secret() default StringUtils.EMPTY;
}
