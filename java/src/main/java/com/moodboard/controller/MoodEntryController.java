package com.moodboard.controller;

import com.moodboard.dao.MoodEntryDao;
import com.moodboard.dao.UserDao;
import com.moodboard.exception.DaoException;
import com.moodboard.model.MoodEntry;
import com.moodboard.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/moods")
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class MoodEntryController {

    private final MoodEntryDao moodEntryDao;
    private final UserDao userDao;

    public MoodEntryController(MoodEntryDao moodEntryDao, UserDao userDao) {
        this.moodEntryDao = moodEntryDao;
        this.userDao = userDao;
    }

    // GET /api/moods - all entries for current user
    @GetMapping
    public List<MoodEntry> getAllEntries(Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            return moodEntryDao.getAllForUser(user.getId());
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // GET /api/moods/{date} - entry for specific date (YYYY-MM-DD)
    @GetMapping("/{date}")
    public MoodEntry getEntryByDate(@PathVariable String date, Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            MoodEntry entry = moodEntryDao.getByDate(user.getId(), date);
            if (entry == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found for date: " + date);
            }
            return entry;
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // POST /api/moods - create new mood entry
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public MoodEntry createEntry(@RequestBody MoodEntry entry, Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            entry.setUserId(user.getId());

            if (entry.getEntryDate() == null) {
                entry.setEntryDate(LocalDate.now());
            }

            return moodEntryDao.create(entry);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create mood entry.");
        }
    }

    // PUT /api/moods/{entryId} - update mood/note
    @PutMapping("/{entryId}")
    public void updateEntry(@PathVariable int entryId, @RequestBody MoodEntry entry, Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            entry.setEntryId(entryId);
            entry.setUserId(user.getId());
            moodEntryDao.update(entry);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update mood entry.");
        }
    }

    // DELETE /api/moods/{entryId}
    @DeleteMapping("/{entryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEntry(@PathVariable int entryId, Principal principal) {
        try {
            // Optional: check ownership first if you want stricter control
            moodEntryDao.delete(entryId);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete mood entry.");
        }
    }
}
