package com.moodboard.controller;

import com.moodboard.dao.UserDao;
import com.moodboard.exception.DaoException;
import com.moodboard.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class UserController {

    private final UserDao userDao;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * Admin-only: Get a list of all users.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        try {
            return userDao.getUsers();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch users.", e);
        }
    }

    /**
     * Authenticated user: Get profile by ID (admin or self).
     */
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable int userId, Principal principal) {
        try {
            User requester = userDao.getUserByUsername(principal.getName());
            User targetUser = userDao.getUserById(userId);

            if (requester == null || targetUser == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
            }

            // Optional: only allow self or admin
            if (!requester.getUsername().equals(targetUser.getUsername())
                    && requester.getAuthorities().stream().noneMatch(a -> a.getName().equals("ROLE_ADMIN"))) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied.");
            }

            return targetUser;
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching user.", e);
        }
    }
}
