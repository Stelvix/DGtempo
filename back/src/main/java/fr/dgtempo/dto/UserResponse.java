package fr.dgtempo.dto;

import fr.dgtempo.entity.Users;

public record UserResponse(Long id, String username, String email, String role) {
    public static UserResponse from(Users user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
}