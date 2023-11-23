package com.demeter.gestaoagro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Document(collection = "users")
public class MyUserDocument implements UserDetails {

    @Id
    private String id;
    private String username;
    private String password;
    // outros campos e métodos necessários

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // lógica para retornar as autoridades do usuário
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // Métodos adicionais UserDetails

    @Override
    public boolean isEnabled() {
        return true; // ou lógica para verificar se a conta está ativada
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // ou lógica para verificar se as credenciais não expiraram
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // ou lógica para verificar se a conta não expirou
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // ou lógica para verificar se a conta não está bloqueada
    }

    // getters e setters
}
