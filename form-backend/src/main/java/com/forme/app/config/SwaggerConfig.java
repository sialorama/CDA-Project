package com.forme.app.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * The type Swagger config.
 */
@Configuration
@OpenAPIDefinition
public class SwaggerConfig {
    /**
     * Custom open api open api.
     *
     * @return the open api
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info().title("Forme").description("Spring REST API " +
                "form").version("v1.0.0"));
    }

}
