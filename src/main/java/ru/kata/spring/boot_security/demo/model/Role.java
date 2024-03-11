package ru.kata.spring.boot_security.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Entity
@Table(name = "roles")
@Setter
@Getter
@NoArgsConstructor
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(generator = "role_gen", strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "role_gen", sequenceName = "role_seq", allocationSize = 1)
    private Long id;
    private String roleName;

    @ManyToMany(targetEntity = User.class, mappedBy = "roles",
            cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    private List<User> users;

    @Override
    public String getAuthority() {
        return null;
    }
}
