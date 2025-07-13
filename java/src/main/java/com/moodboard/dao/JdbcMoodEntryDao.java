package com.moodboard.dao;

import com.moodboard.exception.DaoException;
import com.moodboard.model.MoodEntry;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcMoodEntryDao implements MoodEntryDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcMoodEntryDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public MoodEntry create(MoodEntry entry) {
        String sql = """
                INSERT INTO mood_entry (user_id, mood, note, entry_date)
                VALUES (?, ?, ?, ?)
                RETURNING entry_id, created_at;
                """;

        try {
            SqlRowSet rs = jdbcTemplate.queryForRowSet(sql,
                    entry.getUserId(),
                    entry.getMood(),
                    entry.getNote(),
                    entry.getEntryDate()
            );

            if (rs.next()) {
                entry.setEntryId(rs.getInt("entry_id"));
                entry.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                return entry;
            } else {
                throw new DaoException("Failed to insert mood entry.");
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to database.", e);
        } catch (DataAccessException e) {
            throw new DaoException("Error creating mood entry.", e);
        }
    }

    @Override
    public List<MoodEntry> getAllForUser(int userId) {
        List<MoodEntry> entries = new ArrayList<>();

        String sql = """
                SELECT entry_id, user_id, mood, note, entry_date, created_at
                FROM mood_entry
                WHERE user_id = ?
                ORDER BY entry_date DESC;
                """;

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                entries.add(mapRowToMoodEntry(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Database connection failed.", e);
        }

        return entries;
    }

    @Override
    public MoodEntry getByDate(int userId, String date) {
        String sql = """
                SELECT entry_id, user_id, mood, note, entry_date, created_at
                FROM mood_entry
                WHERE user_id = ? AND entry_date = ?;
                """;

        try {
            SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, userId, LocalDate.parse(date));
            if (rs.next()) {
                return mapRowToMoodEntry(rs);
            } else {
                return null;
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Database unavailable.", e);
        }
    }

    @Override
    public void update(MoodEntry entry) {
        String sql = """
                UPDATE mood_entry
                SET mood = ?, note = ?
                WHERE entry_id = ? AND user_id = ?;
                """;

        try {
            jdbcTemplate.update(sql,
                    entry.getMood(),
                    entry.getNote(),
                    entry.getEntryId(),
                    entry.getUserId()
            );
        } catch (DataAccessException e) {
            throw new DaoException("Failed to update entry.", e);
        }
    }

    @Override
    public void delete(int entryId) {
        String sql = "DELETE FROM mood_entry WHERE entry_id = ?;";
        try {
            jdbcTemplate.update(sql, entryId);
        } catch (DataAccessException e) {
            throw new DaoException("Failed to delete entry.", e);
        }
    }

    private MoodEntry mapRowToMoodEntry(SqlRowSet rs) {
        MoodEntry entry = new MoodEntry();
        entry.setEntryId(rs.getInt("entry_id"));
        entry.setUserId(rs.getInt("user_id"));
        entry.setMood(rs.getString("mood"));
        entry.setNote(rs.getString("note"));
        entry.setEntryDate(rs.getDate("entry_date").toLocalDate());

        Timestamp timestamp = rs.getTimestamp("created_at");
        if (timestamp != null) {
            entry.setCreatedAt(timestamp.toLocalDateTime());
        }

        return entry;
    }
}
