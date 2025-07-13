package com.moodboard.dao;

import com.moodboard.model.MoodEntry;

import java.util.List;

public interface MoodEntryDao {
    MoodEntry create(MoodEntry entry);

    List<MoodEntry> getAllForUser(int userId);

    MoodEntry getByDate(int userId, String date);

    void update(MoodEntry entry);

    void delete(int entryId);
}
