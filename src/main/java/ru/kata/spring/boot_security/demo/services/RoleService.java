package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;

import java.util.List;

@Service
@Transactional
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void createRole(String roleName) {
        Role role = new Role();
        role.setRoleName(roleName);
        roleRepository.save(role);
    }

    public Role findByName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
