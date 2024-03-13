package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    void addUser(User user);

    List<User> getUsers();

    User getUserById(Long id);

    void deleteUser(Long id);

    void updateUser(User user, Long id);
}
