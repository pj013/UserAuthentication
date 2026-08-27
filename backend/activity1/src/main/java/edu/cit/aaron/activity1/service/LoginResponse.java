package edu.cit.aaron.activity1.service;

public record LoginResponse(
        String token,
        String username,
        String email
) {
}