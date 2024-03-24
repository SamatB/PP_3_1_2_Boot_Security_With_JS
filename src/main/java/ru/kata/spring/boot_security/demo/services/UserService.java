package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    void addUser(User user);

    List<User> getUsers();

    User getUserByEmail(String name);

    void deleteUser(Long id);

    void updateUser(Long id, User user);

    User getUserById(Long id);
}
