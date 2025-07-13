package com.moodboard.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MoodEntry {
    private int entryId;
    private int userId;
    private String mood;
    private String note;
    private LocalDate entryDate;
    private LocalDateTime createdAt;

    // Constructors
    public MoodEntry() {}

    public MoodEntry(int entryId, int userId, String mood, String note, LocalDate entryDate, LocalDateTime createdAt) {
        this.entryId = entryId;
        this.userId = userId;
        this.mood = mood;
        this.note = note;
        this.entryDate = entryDate;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public int getEntryId() {
        return entryId;
    }

    public void setEntryId(int entryId) {
        this.entryId = entryId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "MoodEntry{" +
                "entryId=" + entryId +
                ", userId=" + userId +
                ", mood='" + mood + '\'' +
                ", note='" + note + '\'' +
                ", entryDate=" + entryDate +
                ", createdAt=" + createdAt +
                '}';
    }
}
