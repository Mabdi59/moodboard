package com.moodboard.dao;

import com.moodboard.model.RegisterUserDto;
import com.moodboard.model.User;

import java.util.List;

public interface UserDao {

    List<User> getUsers();

    User getUserById(int id);

    User getUserByUsername(String username);

    User createUser(RegisterUserDto user);
}
