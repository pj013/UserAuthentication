package edu.cit.aaron.activity1.controller;

import edu.cit.aaron.activity1.model.User;
import edu.cit.aaron.activity1.service.AuthService;
import org.springframework.web.bind.annotation.*;
import edu.cit.aaron.activity1.repository.UserRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> request) {

        return authService.register(
                request.get("username"),
                request.get("email"),
                request.get("password")
        );
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> request) {

        return authService.login(
                request.get("email"),
                request.get("password")
        );
    }

    @PostMapping("/user")
    public List<User> user() {
        return userRepository.findAll();
    }
}