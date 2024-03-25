package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.exceptions.UserNotFoundException;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void addUser(User user) {
        List<Role> usersRole = user.getRoles();
        List<Role> roles = new ArrayList<>();
        for (Role role : usersRole) {
            Role role1 = roleRepository.findById(role.getId()).orElseThrow(() -> new RuntimeException("Role not found"));
            roles.add(role1);
        }
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }


    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void updateUser(Long id, User user) {
        User userUpdate = userRepository.findById(id).get();
        userUpdate.setName(user.getName());
        userUpdate.setSurname(user.getSurname());
        userUpdate.setAge(user.getAge());
        userUpdate.setEmail(user.getEmail());
        if (!user.getPassword().isEmpty()) {
            userUpdate.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            userUpdate.setPassword(userUpdate.getPassword());
        }
        List<Role> usersRole = user.getRoles();
        List<Role> roles = new ArrayList<>();
        for (Role role : usersRole) {
            Role role1 = roleRepository.findById(role.getId()).orElseThrow(() -> new RuntimeException("Role not found"));
            roles.add(role1);
        }
        userUpdate.setRoles(roles);
        userRepository.save(userUpdate);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException(String.format("User with id: %s does not exist", id)));
    }

}
