package com.demeter.gestaoagro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "users")
public class MyUserDocument implements UserDetails {

    @Id
    private String id;
    private String username;
    private String password;
    private List<String> roles;

    // getters e setters

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

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
}
