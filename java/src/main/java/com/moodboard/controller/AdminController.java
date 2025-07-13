package com.moodboard.controller;

import com.moodboard.dao.UserDao;
import com.moodboard.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin
public class AdminController {

    private final UserDao userDao;

    public AdminController(UserDao userDao) {
        this.userDao = userDao;
    }

    // Fetch all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userDao.getUsers();
    }

    // Promote/Demote a user between ROLE_USER and ROLE_ADMIN
    @PutMapping("/users/{userId}/toggle-role")
    public void toggleUserRole(@PathVariable int userId) {
        User user = userDao.getUserById(userId);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        String currentRole = user.getAuthorities().stream().findFirst().get().getName();
        String newRole = currentRole.equals("ROLE_ADMIN") ? "ROLE_USER" : "ROLE_ADMIN";

        userDao.updateUserRole(userId, newRole);
    }

    // Delete a user by ID
    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable int userId) {
        User user = userDao.getUserById(userId);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        userDao.deleteUser(userId);
    }
}
