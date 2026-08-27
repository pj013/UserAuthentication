package edu.cit.aaron.activity1.controller;

import edu.cit.aaron.activity1.model.ServiceRequest;
import edu.cit.aaron.activity1.service.ServiceRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    // POST /api/requests
    @PostMapping
    public ResponseEntity<ServiceRequest> createRequest(
            @RequestBody ServiceRequest request,
            Authentication authentication) {

        String username = authentication.getName();

        ServiceRequest createdRequest = serviceRequestService.createRequest(
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                username
        );

        return ResponseEntity.ok(createdRequest);
    }
    // GET /api/requests
    @GetMapping
    public ResponseEntity<List<ServiceRequest>> getUserRequests(
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                serviceRequestService.getUserRequests(username)
        );
    }

    // GET /api/requests/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getRequest(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                serviceRequestService.getRequest(id, username)
        );
    }

    // PUT /api/requests/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ServiceRequest> updateRequest(
            @PathVariable Long id,
            @RequestBody ServiceRequest request,
            Authentication authentication) {

        String username = authentication.getName();

        ServiceRequest updatedRequest = serviceRequestService.updateRequest(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                username
        );

        return ResponseEntity.ok(updatedRequest);
    }

    // DELETE /api/requests/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();

        serviceRequestService.deleteRequest(id, username);

        return ResponseEntity.noContent().build();
    }
}